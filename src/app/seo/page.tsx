
'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateSeoMetaTags } from '@/ai/flows/seo-flow';
import type { GenerateSeoMetaTagsInput, GenerateSeoMetaTagsOutput } from '@/ai/flows/seo-flow';

const formSchema = z.object({
  keywords: z.string().min(3, {
    message: 'Please enter at least one keyword.',
  }),
});

export default function SeoPage() {
  const { toast } = useToast();
  const [generatedMeta, setGeneratedMeta] = useState<GenerateSeoMetaTagsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keywords: '',
    },
  });

  const handleCopyToClipboard = (text: string) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            toast({
                title: 'Copied to Clipboard!',
                description: 'The meta tag has been copied successfully.',
            });
        });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedMeta(null);
    try {
      const input: GenerateSeoMetaTagsInput = { keywords: values.keywords };
      const result = await generateSeoMetaTags(input);
      setGeneratedMeta(result);
    } catch (error) {
      console.error('Error generating SEO meta tags:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'There was an error generating the SEO meta tags. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8 pb-16">
      <header className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold font-headline text-primary flex items-center justify-center gap-3">
          <Sparkles size={36} />
          <span>AI SEO Meta Tag Generator</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Enter a few keywords related to your page content, and let our AI craft the perfect SEO title and meta description to improve your search engine visibility.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Keywords</CardTitle>
            <CardDescription>
              Provide a comma-separated list of keywords that best describe your content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Keywords</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., data science, full stack developer, healthcare analytics, portfolio"
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Meta Tags'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="text-center text-muted-foreground flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span>Crafting the perfect tags for you...</span>
          </div>
        )}

        {generatedMeta && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Your Generated Meta Tags</CardTitle>
              <CardDescription>
                Copy these tags and paste them into the `<head>` section of your website's HTML.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="meta-title" className="text-base font-semibold">Meta Title</Label>
                <div className="relative">
                  <p
                    id="meta-title"
                    className="p-4 pr-12 rounded-md bg-muted text-muted-foreground border min-h-[4rem] flex items-center"
                  >
                    {generatedMeta.title}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8"
                    onClick={() => handleCopyToClipboard(generatedMeta.title)}
                    aria-label="Copy meta title"
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description" className="text-base font-semibold">Meta Description</Label>
                <div className="relative">
                   <p
                    id="meta-description"
                    className="p-4 pr-12 rounded-md bg-muted text-muted-foreground border min-h-[8rem] flex items-center"
                  >
                    {generatedMeta.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8"
                    onClick={() => handleCopyToClipboard(generatedMeta.description)}
                    aria-label="Copy meta description"
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

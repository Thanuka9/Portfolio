
'use client';

import React, { useState } from 'react';
import { Sparkles, Copy } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateSeoMetaTags, GenerateSeoMetaTagsInput, GenerateSeoMetaTagsOutput } from '@/ai/flows/seo-flow';

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

  const copyToClipboard = (text: string, type: 'title' | 'description') => {
    let fullTag = '';
    if (type === 'title') {
      fullTag = `<title>${text}</title>`;
    } else {
      fullTag = `<meta name="description" content="${text}">`;
    }
    navigator.clipboard.writeText(fullTag);
    toast({
      title: 'Copied to Clipboard!',
      description: 'The meta tag has been copied successfully.',
    });
  };

  return (
    <div className="space-y-12 pb-16">
      <header>
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <Sparkles size={36} /> SEO Meta Tag Generator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Generate optimized meta titles and descriptions for your web pages based on your target keywords.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Enter Keywords</CardTitle>
            <CardDescription>
              Provide a comma-separated list of keywords you want to target.
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
                      <FormLabel>Keywords</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., data science, full stack developer, portfolio"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isLoading}>
                  {isLoading ? 'Generating...' : 'Generate Meta Tags'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Generated Meta Tags</CardTitle>
            <CardDescription>
              Copy these tags into the `<head>` section of your HTML.
            </cardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-center">
            {isLoading && (
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="h-5 w-5 animate-spin text-primary" />
                <p className="text-muted-foreground">Generating...</p>
              </div>
            )}
            {!isLoading && !generatedMeta && (
              <p className="text-center text-muted-foreground">Your generated meta tags will appear here.</p>
            )}
            {generatedMeta && (
              <div className="space-y-4 font-mono text-sm">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">TITLE TAG</label>
                  <div className="relative">
                    <pre className="p-3 rounded-md bg-muted text-muted-foreground overflow-x-auto">
                      <code>{`<title>${generatedMeta.title}</title>`}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-7 w-7"
                      onClick={() => copyToClipboard(generatedMeta.title, 'title')}
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">META DESCRIPTION</label>
                   <div className="relative">
                    <pre className="p-3 rounded-md bg-muted text-muted-foreground overflow-x-auto">
                      <code>{`<meta name="description" content="${generatedMeta.description}">`}</code>
                    </pre>
                     <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-7 w-7"
                      onClick={() => copyToClipboard(generatedMeta.description, 'description')}
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

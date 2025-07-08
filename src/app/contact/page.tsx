'use client';

import { Mail, Phone, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from '@emailjs/browser';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(500, {
    message: "Message must not be longer than 500 characters."
  }),
});

export default function ContactPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const serviceId = 'service_l295hid';
    const templateId = 'template_oxg4tlo';
    const publicKey = 'mqtA7O0dh4Q6-V-Ur';

    try {
      await emailjs.send(serviceId, templateId, values, publicKey);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    } catch (error) {
      console.error('Failed to send email:', error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem sending your message. Please try again later.",
      });
    }
  }

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <Mail size={36} /> Get In Touch
        </h1>
        <p className="mt-2 text-muted-foreground">
          I'm always open to discussing new projects, creative ideas, or opportunities.
        </p>
      </header>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me how I can help"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
          <Card>
            <CardContent className="pt-6 space-y-4">
              <a href="mailto:thanuka.ellepola@gmail.com" className="flex items-center gap-4 text-lg hover:text-primary transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-muted-foreground">thanuka.ellepola@gmail.com</p>
                </div>
              </a>
              <a href="tel:+94776705832" className="flex items-center gap-4 text-lg hover:text-primary transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-muted-foreground">+94 77 670 5832</p>
                </div>
              </a>
              <div className="flex items-center gap-4 text-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-muted-foreground">Based in Sri Lanka</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <footer className="text-center text-sm text-muted-foreground pt-8">
            <p>&copy; {new Date().getFullYear()} Thanuka Ellepola. All rights reserved.</p>
      </footer>
    </div>
  );
}

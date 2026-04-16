'use client';

import { Mail, Phone, MapPin, Linkedin, Send, MessageSquare, Calendar, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from '@emailjs/browser';
import React from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters."
  }).max(500, {
    message: "Message must not be longer than 500 characters."
  }),
});

const SERVICE_ID = 'service_3q31q6h';
const TEMPLATE_ID = 'template_oxg4tlo';
const PUBLIC_KEY = 'mqtA7O0dh4Q6-V-Ur';

const contactDetails = [
    {
        icon: Mail,
        label: "Direct Email",
        value: "thanuka.ellepola@gmail.com",
        href: "mailto:thanuka.ellepola@gmail.com",
    },
    {
        icon: Linkedin,
        label: "LinkedIn Professional",
        value: "thanuka-ellepola",
        href: "https://www.linkedin.com/in/thanuka-ellepola-a559b01aa/",
    },
    {
        icon: MapPin,
        label: "Primary Location",
        value: "Colombo, Sri Lanka (Available for Remote Global Work)",
    }
];

export default function ContactPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, values, PUBLIC_KEY);
      toast({
        title: "Inquiry Received!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });
      form.reset();
    } catch (error: any) {
      const errorMessage = error?.text || "Communication failed.";
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `There was a problem sending your inquiry: ${errorMessage}`,
      });
    }
  }

  return (
    <div className="space-y-16 pb-16">
      <header className="text-center space-y-4 pt-8">
        <h1 className="text-4xl lg:text-5xl font-bold font-headline text-primary">
          Let's Build Something <span className="text-accent">Significant.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          I'm currently accepting new consulting projects and strategic collaborations. If you have a complex problem that needs a data-driven or AI-powered solution, I'd love to discuss it.
        </p>
      </header>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-12">
            <div className="space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Why Consult with Me?</h2>
                    <p className="text-muted-foreground">Get a clear technical roadmap and ROI-focused implementation for your AI or data projects.</p>
                </div>
                <div className="grid gap-4">
                    {[
                        { title: "Technical Feasibility", desc: "Understand if your AI idea is buildable and scalable." },
                        { title: "Data Strategy", desc: "Optimize how you collect and process business information." },
                        { title: "Architecture Design", desc: "Ensure your systems are secure and future-proof." }
                    ].map((item) => (
                        <Card key={item.title} className="border-none bg-primary/5 p-4 flex gap-4">
                             <Sparkles className="text-accent shrink-0" size={24} />
                             <div>
                                <h4 className="font-bold text-primary">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                             </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="font-bold text-lg">Direct Channels</h3>
                <div className="space-y-4">
                    {contactDetails.map((detail) => (
                    <a 
                        key={detail.label} 
                        href={detail.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`flex items-center gap-4 group transition-all ${detail.href ? 'hover:translate-x-1' : 'cursor-default'}`}
                    >
                        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                        <detail.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                        <p className="font-semibold text-sm">{detail.label}</p>
                        <p className="text-xs text-muted-foreground">{detail.value}</p>
                        </div>
                    </a>
                    ))}
                </div>
            </div>
        </div>

        <div>
           <Card className="border-none shadow-xl ring-1 ring-border/60">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="text-accent" />
                        Send an Inquiry
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Describe your project or challenge below.</p>
                </CardHeader>
                <CardContent className="p-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Your Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="E.g. Jane Smith" {...field} />
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
                                    <FormLabel>Professional Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="jane@company.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Project Interest</FormLabel>
                                    <FormControl>
                                        <Input placeholder="E.g. AI Integration / Data Auditing / Consulting" {...field} />
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
                                <FormLabel>Project Details</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="Briefly describe the challenge you're looking to solve..."
                                    className="resize-none min-h-[120px]"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? 'Transmitting...' : 'Request Consultation'}
                                <Send className="ml-2" size={18} />
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

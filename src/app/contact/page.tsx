
'use client';

import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";
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
        label: "Email (Thanuka Ellepola)",
        value: "thanuka.ellepola@gmail.com",
        href: "mailto:thanuka.ellepola@gmail.com",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+94 77 670 5832",
        href: "tel:+94776705832",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        value: "linkedin.com/in/thanuka-ellepola",
        href: "https://www.linkedin.com/in/thanuka-ellepola-a559b01aa/",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Colombo, Sri Lanka",
    }
];

const services = [
  "Data Science Consulting",
  "Healthcare Analytics Solutions",
  "Full Stack Web Development",
  "Predictive Modeling Projects",
  "Database Design & Optimization",
  "Team Training & Workshops"
];

const opportunities = [
  "Full-time Opportunities",
  "Consulting Projects",
  "Research Collaborations",
  "Speaking Engagements",
  "Technical Mentoring"
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
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    } catch (error: any) {
      const errorMessage = error?.text || "The email service failed to respond.";
      console.error('Failed to send email:', errorMessage, error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `There was a problem with the contact form: ${errorMessage} Please check your EmailJS account settings and try again.`,
      });
    }
  }

  return (
    <div className="space-y-12 pb-16">
      <header className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold font-headline text-primary">
          Let's Connect
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Ready to discuss your next project, explore collaboration opportunities, or learn more about my experience? I'd love to hear from you.
        </p>
      </header>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-2">Get In Touch</h2>
                <p className="text-muted-foreground">Multiple ways to reach me for different types of opportunities.</p>
            </div>
          <div className="space-y-6">
            {contactDetails.map((detail) => (
              <a 
                key={detail.label} 
                href={detail.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`flex items-center gap-4 text-lg transition-colors ${detail.href ? 'hover:text-primary' : 'cursor-default'}`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <detail.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{detail.label}</p>
                  <p className="text-sm text-muted-foreground">{detail.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div>
           <Card>
                <CardContent className="p-6 space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold">Quick Contact</h2>
                        <p className="text-muted-foreground pt-1">Send me a message and I'll get back to you within 24 hours.</p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Your Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
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
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john@example.com" {...field} />
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
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Project Discussion / Job Opportunity / Collaboration" {...field} />
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
                                    placeholder="Tell me about your project or opportunity..."
                                    className="resize-none min-h-[120px]"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={form.formState.isSubmitting}>
                                <Send size={18} />
                                {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
      </div>

      <section className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {services.map((service) => (
                            <li key={service} className="flex items-start">
                                <span className="text-accent mr-3 mt-1">&#8226;</span>
                                <span className="text-muted-foreground">{service}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Available For</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {opportunities.map((opp) => (
                            <li key={opp} className="flex items-center justify-between">
                                <span className="text-muted-foreground">{opp}</span>
                                <Badge variant="outline" className="border-green-500/50 text-green-600 bg-green-500/10">Open</Badge>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}

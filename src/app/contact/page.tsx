
'use client';

import { Mail, Phone, MapPin, Linkedin, Send, MessageSquare, Calendar, Sparkles, Activity, Database, ShieldCheck } from "lucide-react";
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
  website: z.string().optional(), // Honeypot field
  consent: z.boolean().refine(v => v === true, {
    message: "You must agree to the privacy policy.",
  }),
  human_ver: z.string().refine(v => v === "12", {
    message: "Incorrect answer.",
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


import { Checkbox } from "@/components/ui/checkbox";

export default function ContactPage() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
      consent: false,
      human_ver: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Honeypot check
    if (values.website) {
       console.log("Bot detected!");
       return;
    }

    try {
      const templateParams = {
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      };
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
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
    <div className="space-y-24 pb-24 animate-reveal">
      <header className="space-y-8">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel text-primary text-xs font-bold tracking-wider uppercase animate-slide-up">
          <Calendar size={16} /> 
          Strategic Collaboration
        </div>
        <h1 className="text-3xl lg:text-6xl font-black font-headline tracking-tighter leading-none">
          Build the <br />
          <span className="text-primary italic">Significant.</span>
        </h1>
        <p className="text-2xl text-muted-foreground/80 max-w-3xl font-medium leading-relaxed">
          I'm currently accepting new consulting projects and strategic collaborations. Let's discuss how we can solve your most complex architectural bottlenecks.
        </p>
      </header>
      
      <div className="grid lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5 space-y-16">
            <div className="space-y-10">
                <div className="space-y-4">
                    <h2 className="text-3xl font-black font-headline tracking-tight">The Value Proposition</h2>
                    <p className="text-lg text-muted-foreground font-medium leading-relaxed">Get a clear technical roadmap and ROI-focused implementation for your AI or data projects.</p>
                </div>
                <div className="space-y-6">
                    {[
                        { title: "Technical Feasibility", desc: "Understand if your AI idea is buildable and scalable.", icon: Activity },
                        { title: "Data Strategy", desc: "Optimize how you collect and process business information.", icon: Database },
                        { title: "Architecture Design", desc: "Ensure your systems are secure and future-proof.", icon: ShieldCheck }
                    ].map((item, index) => (
                        <div 
                          key={item.title} 
                          className="group flex gap-6 items-start animate-slide-up"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                             <div className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center shrink-0 border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-xl">
                                <item.icon size={24} />
                             </div>
                             <div className="space-y-1">
                                <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{item.title}</h4>
                                <p className="text-muted-foreground font-medium">{item.desc}</p>
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6 p-10 rounded-[3rem] bg-primary/5 border border-primary/20 animate-slide-up" style={{ animationDelay: '300ms' }}>
                <div className="space-y-2">
                    <h3 className="text-2xl font-black font-headline tracking-tight">Professional Dossier</h3>
                    <p className="text-muted-foreground font-medium">Download the comprehensive overview of technical capabilities and project history.</p>
                </div>
                <Button variant="outline" className="w-full h-16 rounded-2xl border-2 border-primary/20 hover:bg-primary hover:text-primary-foreground font-black group transition-all" asChild>
                    <a href="/Thanuka_Ellepola_CV.pdf" download>
                        Download Official CV <Activity className="ml-2 group-hover:animate-bounce" />
                    </a>
                </Button>
            </div>

            <div className="space-y-10">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Direct Access</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
                    {contactDetails.map((detail, index) => (
                    <a 
                        key={detail.label} 
                        href={detail.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`group p-6 rounded-3xl glass-panel border-primary/10 hover:border-primary/40 hover:bg-primary/5 transition-all animate-slide-up ${!detail.href && 'cursor-default pointer-events-none'}`}
                        style={{ animationDelay: `${(3 + index) * 100}ms` }}
                    >
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            <detail.icon className="w-6 h-6" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">{detail.label}</p>
                            <p className="font-bold text-foreground break-all">{detail.value}</p>
                          </div>
                        </div>
                    </a>
                    ))}
                </div>
            </div>
        </div>

        <div className="lg:col-span-7 relative p-1 lg:p-1.5 rounded-[4rem] bg-gradient-to-br from-primary/20 to-transparent shadow-2xl animate-reveal">
           <div className="bg-background/95 backdrop-blur-3xl rounded-[3.8rem] p-10 lg:p-16 space-y-12">
                <div className="space-y-4">
                    <h2 className="text-4xl font-black font-headline tracking-tighter flex items-center gap-4">
                        <div className="w-2 h-10 bg-primary rounded-full" />
                        Strategic Inquiry
                    </h2>
                    <p className="text-xl text-muted-foreground font-medium">Describe your project or challenge below.</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                        <div className="grid grid-cols-1 gap-10">
                            <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="space-y-4">
                                <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Your Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="E.g. Jane Smith" {...field} className="h-16 px-6 rounded-2xl bg-secondary/30 border-primary/10 focus:border-primary/40 focus:bg-background/50 transition-all font-medium text-lg" />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-4">
                                <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Professional Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="jane@company.com" {...field} className="h-16 px-6 rounded-2xl bg-secondary/30 border-primary/10 focus:border-primary/40 focus:bg-background/50 transition-all font-medium text-lg" />
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
                                <FormItem className="space-y-4">
                                <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Project Interest</FormLabel>
                                <FormControl>
                                    <Input placeholder="E.g. AI Integration / Data Auditing" {...field} className="h-16 px-6 rounded-2xl bg-secondary/30 border-primary/10 focus:border-primary/40 focus:bg-background/50 transition-all font-medium text-lg" />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem className="space-y-4">
                                <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Project Details</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="Briefly describe the challenge..."
                                    className="resize-none min-h-[160px] p-6 rounded-2xl bg-secondary/30 border-primary/10 focus:border-primary/40 focus:bg-background/50 transition-all font-medium text-lg leading-relaxed"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem className="hidden">
                                  <FormControl>
                                      <Input {...field} tabIndex={-1} autoComplete="off" />
                                  </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                          <FormField
                          control={form.control}
                          name="human_ver"
                          render={({ field }) => (
                              <FormItem className="space-y-4">
                              <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Human Verification: 8 + 4 = ?</FormLabel>
                              <FormControl>
                                  <Input placeholder="Enter result" {...field} className="h-16 px-6 rounded-2xl bg-secondary/30 border-primary/10 focus:border-primary/40 focus:bg-background/50 transition-all font-medium text-lg" />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                          />

                          <FormField
                            control={form.control}
                            name="consent"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-4 space-y-0 p-4 rounded-2xl border border-primary/10 bg-secondary/20">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="mt-1"
                                  />
                                </FormControl>
                                <div className="space-y-1 overflow-hidden">
                                  <FormLabel className="text-sm font-medium leading-tight">
                                    I agree to the <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and data processing terms.
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-20 rounded-3xl text-xl shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? 'Transmitting...' : 'Request Consultation'}
                            <Send className="ml-3" size={24} />
                        </Button>
                    </form>
                </Form>
           </div>
        </div>
      </div>
    </div>
  );
}

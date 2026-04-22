'use client';

import { Mail, Phone, MapPin, Linkedin, Send, MessageSquare, Calendar, Sparkles, Activity, Database, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from '@emailjs/browser';
import React from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { generateVCard } from "@/lib/vcard-generator";
import imageData from '@/lib/placeholder-images.json';



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
import { Checkbox } from "@/components/ui/checkbox";

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
  human_ver: z.string().superRefine((v, ctx) => {
    if (v !== "12") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Incorrect answer. Hint: 6 + 6",
      });
    }
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
        value: "Colombo, Sri Lanka",
    }
];

export default function ContactPage() {
  const [isExporting, setIsExporting] = React.useState(false);
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

  const exportCardAsPNG = async () => {
    const el = document.getElementById('vcard-element');
    if (!el || isExporting) return;

    setIsExporting(true);
    // Small delay so the button visually disappears before capture
    await new Promise(r => setTimeout(r, 80));

    const { toPng } = await import('html-to-image');

    try {
      const dataUrl = await toPng(el, {
        quality: 1.0,
        pixelRatio: 3, // Ultra-high quality (3× DPI)
        backgroundColor: '#0c051a',
        // Exclude any node that has data-export-ignore attribute (set on the button container)
        filter: (node) => {
          if (node instanceof HTMLElement) {
            if (node.dataset.exportIgnore === 'true') return false;
            // Also walk up and exclude if any ancestor is ignored
            let el = node.parentElement;
            while (el) {
              if (el.dataset.exportIgnore === 'true') return false;
              el = el.parentElement;
            }
          }
          return true;
        }
      });

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'Thanuka_Ellepola_ID_Card.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "✅ Export Successful",
        description: "Your Digital Identity Card has been exported in UHD (3× DPI).",
      });
    } catch (err) {
      console.error('Failed to export PNG', err);
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "High-fidelity generation failed. Please try again.",
      });
    } finally {
      setIsExporting(false);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.website) return;

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
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `There was a problem sending your inquiry.`,
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
        <h1 className="text-3xl lg:text-6xl font-black font-headline tracking-tighter leading-none text-foreground">
          Build the <br />
          <span className="text-primary italic">Significant.</span>
        </h1>
        <p className="text-lg text-muted-foreground/80 max-w-3xl font-medium leading-relaxed">
          I'm currently accepting new consulting projects and strategic collaborations. Let's discuss how we can solve your most complex architectural bottlenecks.
        </p>
      </header>
      
      <div className="grid lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-5 space-y-16">
            <div className="space-y-10">
                <div className="space-y-4">
                    <h2 className="text-3xl font-black font-headline tracking-tight text-foreground">The Value Proposition</h2>
                    <p className="text-base text-muted-foreground font-medium leading-relaxed">Get a clear technical roadmap and ROI-focused implementation for your AI or data projects.</p>
                </div>
                <div className="space-y-6">
                    {[
                        { title: "Technical Feasibility", desc: "Understand if your AI idea is buildable and scalable.", icon: Activity },
                        { title: "Data Strategy", desc: "Optimize how you collect and process business information.", icon: Database },
                        { title: "Architecture Design", desc: "Ensure your systems are secure and future-proof.", icon: ShieldCheck }
                    ].map((item, index) => (
                        <div key={item.title} className="group flex gap-6 items-start animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                             <div className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center shrink-0 border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-xl">
                                <item.icon size={24} />
                             </div>
                             <div className="space-y-1">
                                <h4 className="text-lg font-bold group-hover:text-primary transition-colors text-foreground">{item.title}</h4>
                                <p className="text-muted-foreground font-medium">{item.desc}</p>
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6 p-10 rounded-[3rem] bg-primary/5 border border-primary/20 animate-slide-up" style={{ animationDelay: '300ms' }}>
                <div className="space-y-2">
                    <h3 className="text-xl font-black font-headline tracking-tight text-foreground">Curriculum Vitae</h3>
                    <p className="text-muted-foreground font-medium">Get the comprehensive overview of technical capabilities, impact metrics, and project history.</p>
                </div>
                <Button variant="outline" className="w-full h-16 rounded-2xl border-2 border-primary/20 hover:bg-primary hover:text-primary-foreground font-black group transition-all" asChild>
                    <a href="https://drive.google.com/file/d/1H1b0lXTZ4gVZwm68Hl6S0nSAdiywi-jB/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                        Download CV / Resume <Activity className="ml-2 group-hover:animate-bounce" />
                    </a>
                </Button>
            </div>

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

        <div className="lg:col-span-7 relative p-1 lg:p-1.5 rounded-[4rem] bg-gradient-to-br from-primary/20 to-transparent shadow-2xl animate-reveal">
            <div className="bg-background/95 backdrop-blur-3xl rounded-[3.8rem] p-10 lg:p-16 space-y-12 h-full">
                <div className="space-y-4">
                    <h2 className="text-4xl font-black font-headline tracking-tighter flex items-center gap-4 text-foreground">
                        <div className="w-2 h-10 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                        Strategic Inquiry
                    </h2>
                    <p className="text-base text-muted-foreground font-medium">Describe your project or challenge below.</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="space-y-4">
                                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Your Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="E.g. Jane Smith" {...field} className="h-16 px-6 rounded-2xl bg-secondary/30 border-primary/10 focus:border-primary/40 focus:bg-background/50 transition-all font-medium text-base text-foreground" />
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
                                            <Input placeholder="jane@company.com" {...field} className="h-16 px-6 rounded-2xl bg-secondary/30 border-primary/10 focus:border-primary/40 focus:bg-background/50 transition-all font-medium text-base text-foreground" />
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
                                        <Input placeholder="E.g. AI Integration / Data Auditing" {...field} className="h-16 px-6 rounded-2xl bg-secondary/30 border-primary/10 focus:border-primary/40 focus:bg-background/50 transition-all font-medium text-base text-foreground" />
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
                                            className="resize-none min-h-[160px] p-6 rounded-2xl bg-secondary/30 border-primary/10 focus:border-primary/40 focus:bg-background/50 transition-all font-medium text-base leading-relaxed text-foreground"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <FormField
                                control={form.control}
                                name="human_ver"
                                render={({ field }) => (
                                    <FormItem className="space-y-4">
                                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Verification: 8 + 4 = ?</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter result" {...field} className="h-16 px-6 rounded-2xl bg-secondary/30 border-primary/10 focus:border-primary/40 focus:bg-background/50 transition-all font-medium text-base text-foreground" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="consent"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-4 space-y-0 p-5 rounded-2xl border border-primary/10 bg-secondary/20">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="mt-1"
                                            />
                                        </FormControl>
                                        <div className="space-y-1">
                                            <FormLabel className="text-sm font-medium leading-tight text-foreground/80">
                                                I agree to the <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and data processing terms.
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-20 rounded-3xl text-lg shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? 'Transmitting...' : 'Request Consultation'}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
      </div>

        {/* ── Official Digital Identity Card Section ── */}
        <div className="mt-20 md:mt-32 space-y-12 animate-reveal" style={{ animationDelay: '600ms' }}>
            <div className="flex items-center gap-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.6em] text-pink-500 text-center shrink-0">Official Digital Identity</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />
            </div>

            <div className="relative group w-full max-w-3xl mx-auto">
                <div className="absolute -inset-10 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-indigo-600/10 rounded-[3.5rem] blur-[120px] opacity-0 group-hover:opacity-100 transition duration-1000 pointer-events-none" />

                <div id="vcard-element" className="relative w-full rounded-[2.5rem] md:rounded-[3.5rem] bg-[#0c051a] border border-white/10 shadow-2xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/[0.03] rounded-full blur-[120px] -mr-60 -mt-60 pointer-events-none z-0" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none z-0" />

                    <div className="relative z-10 p-8 sm:p-10 lg:p-12">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-12">
                            {/* Profile Image Zone 1 */}
                            <div className="flex flex-col items-center gap-4 shrink-0">
                                <div className="relative">
                                    <div className="absolute -inset-4 bg-pink-500/20 blur-2xl rounded-full" />
                                    <div className="relative w-32 h-32 lg:w-36 lg:h-36 rounded-3xl border-2 border-white/10 overflow-hidden shadow-2xl rotate-1 group-hover:rotate-0 transition-transform duration-1000">
                                        <img src={imageData.profile.src} alt="Thanuka Ellepola" crossOrigin="anonymous" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 bg-pink-600 text-white p-2 rounded-xl shadow-xl z-20 border border-white/20">
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                </div>
                                <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    <span className="text-[8px] font-black text-white/50 uppercase tracking-widest">Architect Verified</span>
                                </div>
                            </div>

                            {/* ─ Main Info Wrapper Zone 2 ─ */}
                            <div className="flex-1 flex flex-col items-center lg:items-start gap-10 w-full min-w-0">
                                <div className="flex-1 min-w-0 space-y-5 text-center lg:text-left w-full">
                                    <div className="space-y-2">
                                        <h4 className="text-3xl sm:text-4xl lg:text-3xl xl:text-[2.75rem] font-black font-headline tracking-tighter text-white leading-[1.05] [text-wrap:balance]">
                                            Thanuka<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">Ellepola.</span>
                                        </h4>
                                        <p className="text-pink-400/90 font-black uppercase tracking-[0.2em] text-[10px]">Lead AI Architect & Data Scientist</p>
                                    </div>
                                    <div className="h-px w-16 bg-gradient-to-r from-pink-500/40 to-transparent mx-auto lg:mx-0" />
                                    <div className="grid gap-3">
                                        {[
                                            { icon: Phone,    label: '+94 77 670 5832' },
                                            { icon: Mail,     label: 'thanuka.ellepola@gmail.com' },
                                            { icon: Linkedin, label: 'Thanuka - Ellepola' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-center lg:justify-start gap-3 group/item truncate">
                                                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                    <item.icon className="w-3.5 h-3.5 text-pink-500" />
                                                </div>
                                                <span className="text-sm font-bold tracking-tight text-white/70 group-hover/item:text-white transition-colors truncate">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ─ Corner Action Button (Export) — EXCLUDED from PNG via data-export-ignore ─ */}
                        <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-30" data-export-ignore="true">
                            <Button 
                                variant="outline" 
                                onClick={exportCardAsPNG}
                                disabled={isExporting}
                                className="bg-white/5 hover:bg-white/10 text-white border-white/20 hover:border-pink-500/50 font-black rounded-xl h-10 px-4 transition-all text-[9px] uppercase tracking-widest flex items-center gap-2 backdrop-blur-xl group/btn disabled:opacity-50"
                            >
                                <Sparkles className={`w-3.5 h-3.5 text-pink-400 transition-transform ${isExporting ? 'animate-pulse' : 'group-hover/btn:scale-110'}`} /> 
                                <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Export PNG'}</span>
                            </Button>
                        </div>

                        {/* Bottom Location Tag */}
                        <div className="absolute bottom-6 right-8 lg:bottom-10 lg:right-12 opacity-20 hidden lg:flex items-center gap-2">
                             <MapPin className="w-3 h-3 text-pink-500" />
                             <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white">Colombo, LK</span>
                        </div>
                    </div>
                    <div className="h-2 w-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600" />
                </div>
            </div>
        </div>
    </div>
  );
}

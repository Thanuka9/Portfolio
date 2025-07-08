import Link from "next/link";
import {
  Briefcase,
  Code,
  GraduationCap,
  Mail,
  ArrowRight
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const navItems = [
  {
    href: '/experience',
    icon: Briefcase,
    title: 'Work Experience',
    description: 'Explore my professional journey and key roles.'
  },
  {
    href: '/projects',
    icon: Code,
    title: 'Projects',
    description: 'See a collection of my technical and academic work.'
  },
  {
    href: '/education',
    icon: GraduationCap,
    title: 'Education',
    description: 'View my academic background and qualifications.'
  },
  {
    href: '/contact',
    icon: Mail,
    title: 'Contact Me',
    description: 'Get in touch for collaborations or inquiries.'
  }
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section id="about">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center gap-2"><Briefcase /> About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Analytical and results-driven data scientist with a background in Computer Systems & Networking and a Master’s in Business Analytics. Over five years of leadership experience in healthcare revenue operations, predictive analytics, and technical project delivery. Proven expertise in building robust, data-driven solutions for real-world business and healthcare challenges.
            </p>
          </CardContent>
        </Card>
      </section>
      
      <section id="navigation-grid">
        <h2 className="text-2xl font-bold font-headline mb-6">Explore My Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {navItems.map((item) => (
            <Link href={item.href} key={item.title} className="group block">
              <Card className="h-full transition-all duration-300 group-hover:border-primary group-hover:shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <item.icon className="w-8 h-8 text-primary" />
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <footer className="text-center text-sm text-muted-foreground pt-8">
        <p>&copy; {new Date().getFullYear()} Thanuka Ellepola. All rights reserved.</p>
      </footer>
    </div>
  );
}

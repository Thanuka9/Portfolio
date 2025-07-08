import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Code,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  BookOpen,
  Cpu,
  Database,
  Layers,
  Lightbulb,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const skills = {
  programming: {
    title: "Programming",
    icon: Code,
    items: ["Python (Pandas, NumPy, Scikit-learn)", "SQL", "Flask", "HTML", "CSS", "Java", "JavaScript"],
  },
  database: {
    title: "Database Management",
    icon: Database,
    items: ["CosmosDB", "MongoDB", "PostgreSQL", "MySQL", "SQLAlchemy", "Snowflake", "Vector Databases"],
  },
  analytics: {
    title: "Data Analytics & Visualization",
    icon: Layers,
    items: ["Predictive Modeling", "Power BI", "Matplotlib", "Advanced Excel"],
  },
  tools: {
    title: "Other Tools & Systems",
    icon: Cpu,
    items: ["Git/GitHub", "ERP Systems", "Workflow Tools (WFP, Clarity)", "Audit Reporting"],
  },
   competencies: {
    title: "Core Competencies",
    icon: Lightbulb,
    items: ["Problem-solving", "Data modeling", "Technical troubleshooting", "Team leadership", "Communication"],
  },
};

const projects = [
    {
        title: "Predictive Analytics for Payment Prediction in RCM (MSc Thesis)",
        description: "This research compares Linear Regression, Decision Trees, Random Forests, and Neural Networks for predicting healthcare payment outcomes. Random Forests achieved the best results, offering practical guidance for healthcare administrators to optimize financial performance.",
        tags: ["Predictive Modeling", "Python", "Scikit-learn", "Pandas", "Healthcare"],
        link: {
            href: "https://drive.google.com/file/d/1DSEb6-RCTXeyADkLHzAGkccv7wqjSQDD/preview",
            text: "Read Thesis Online",
        },
        isPdf: true,
    },
    {
        title: "Collective RCM Website",
        description: "A full-stack healthcare revenue cycle management (RCM) web application built with a robust backend and advanced database integrations to streamline billing and payment processes.",
        tags: ["Flask", "Python", "CSS", "JavaScript", "HTML", "Full Stack"],
        link: {
            href: "https://lovable.dev/projects/3042a6fe-e8b3-4f12-8189-1e75bd1c5588",
            text: "View Demo Site",
        },
    },
    {
        title: "Portfolio Suite Source Code",
        description: "The complete source code for my portfolio projects, showcasing my coding practices and technical skills in a public repository.",
        tags: ["Next.js", "React", "TailwindCSS", "TypeScript", "GitHub"],
        link: {
            href: "https://github.com/Thanuka9/thanuka-ellepola-portfolio-suite",
            text: "GitHub Repository",
        },
    },
    {
        title: "Future Projects",
        description: "Stay tuned for more technical, consulting, and freelance projects. I'm always exploring new challenges and technologies to build innovative solutions.",
        tags: ["Coming Soon"],
    },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <div className="flex flex-col lg:flex-row">
        <aside className="lg:w-1/3 lg:h-screen lg:fixed lg:top-0 lg:left-0 lg:border-r lg:border-border/60 p-8 lg:p-12 flex flex-col justify-between bg-card lg:bg-background">
          <div>
            <div className="flex flex-col items-start mb-8">
              <Image
                src="https://placehold.co/128x128.png"
                alt="Thanuka Ellepola"
                width={128}
                height={128}
                className="rounded-full mb-4"
                data-ai-hint="professional man portrait"
              />
              <h1 className="text-4xl font-bold font-headline text-primary-foreground lg:text-foreground">Thanuka Ellepola</h1>
              <h2 className="text-xl text-primary font-medium">Data Scientist | Full Stack Developer</h2>
              <p className="mt-4 text-muted-foreground">
                Transforming healthcare and business through data and technology
              </p>
            </div>

            <nav className="hidden lg:block space-y-2">
              <a href="#about" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="#education" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">Education</a>
              <a href="#skills" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">Skills</a>
              <a href="#projects" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">Projects</a>
            </nav>
          </div>

          <div>
             <div className="space-y-2 text-sm mt-8">
                <a href="mailto:thanuka.ellepola@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary"><Mail size={16} /> thanuka.ellepola@gmail.com</a>
                <a href="tel:+94776705832" className="flex items-center gap-2 text-muted-foreground hover:text-primary"><Phone size={16} /> +94776705832</a>
                <p className="flex items-center gap-2 text-muted-foreground"><MapPin size={16} /> Sri Lanka</p>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/Thanuka9" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://www.linkedin.com/in/thanuka-ellepola-a559b01aa/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin />
                </a>
              </Button>
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground flex-1">
                 <a href="https://drive.google.com/file/d/1-qfFUhpeUF8G_uWDhASd9qj3DI0suTyT/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2" size={16} /> Download CV
                 </a>
              </Button>
            </div>
          </div>
        </aside>

        <main className="w-full lg:w-2/3 lg:ml-[33.3333%] p-8 lg:p-16 space-y-16">
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

          <section id="education">
            <h2 className="text-2xl font-bold font-headline mb-6 flex items-center gap-2"><GraduationCap /> Education</h2>
            <div className="space-y-4">
               <Card>
                  <CardContent className="pt-6">
                    <p className="font-semibold">Master of Business Analytics (2023–2025)</p>
                    <p className="text-sm text-muted-foreground">University of Colombo</p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardContent className="pt-6">
                    <p className="font-semibold">Bachelor of Computer Systems & Networking (2019–2021)</p>
                    <p className="text-sm text-muted-foreground">Greenwich University</p>
                  </CardContent>
                </Card>
                 <Card>
                  <CardContent className="pt-6">
                    <p className="font-semibold">Advanced Diploma in Telecommunication System & Digital Networking (2017–2018)</p>
                    <p className="text-sm text-muted-foreground">City & Guilds</p>
                  </CardContent>
                </Card>
            </div>
          </section>
          
          <section id="skills">
            <h2 className="text-2xl font-bold font-headline mb-6 flex items-center gap-2"><BookOpen /> Technical Skills & Competencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.values(skills).map((category) => (
                <Card key={category.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <category.icon size={20} className="text-primary" /> {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="projects">
            <h2 className="text-2xl font-bold font-headline mb-6 flex items-center gap-2"><Code /> Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
              {projects.map((project) => (
                <Card key={project.title} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {project.isPdf ? (
                      <div className="aspect-video w-full rounded-md overflow-hidden border">
                         <iframe src={project.link.href} className="w-full h-full" title={project.title}></iframe>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                      </div>
                    )}
                  </CardContent>
                  <div className="p-6 pt-0">
                     {project.link && (
                       <Button asChild variant="link" className="p-0 h-auto text-accent hover:text-accent/80">
                         <a href={project.link.href} target="_blank" rel="noopener noreferrer">
                           {project.link.text} <ExternalLink className="ml-2" size={16} />
                         </a>
                       </Button>
                     )}
                  </div>
                </Card>
              ))}
            </div>
          </section>
          
          <section id="testimonials">
            <h2 className="text-2xl font-bold font-headline mb-6 flex items-center gap-2"><MessageSquare /> Testimonials</h2>
            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="text-muted-foreground">References and testimonials available upon request.</p>
              </CardContent>
            </Card>
          </section>

          <footer className="text-center text-sm text-muted-foreground pt-8">
            <p>&copy; {new Date().getFullYear()} Thanuka Ellepola. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

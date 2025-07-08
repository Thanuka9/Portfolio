import { Code, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const projects = [
    {
        title: "Predictive Analytics for Payment Prediction in RCM (MSc Thesis)",
        description: "This research compares Linear Regression, Decision Trees, Random Forests, and Neural Networks for predicting healthcare payment outcomes. Random Forests achieved the best results, offering practical guidance for healthcare administrators to optimize financial performance.",
        tags: ["Predictive Modeling", "Python", "Scikit-learn", "Pandas", "Healthcare"],
        link: {
            href: "https://drive.google.com/file/d/1DSEb6-RCTXeyADkLHzAGkccv7wqjSQDD/preview",
            text: "Read Thesis Online",
        },
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
        title: "Data Science & Machine Learning Projects Repository",
        description: "A GitHub repository containing a collection of my data science and machine learning projects, demonstrating practical skills in various algorithms and techniques.",
        tags: ["Data Science", "Machine Learning", "Python", "GitHub"],
        link: {
            href: "https://github.com/Thanuka9/Data-Science-and-Machine-Learning-Projects",
            text: "GitHub Repository",
        },
    },
    {
        title: "Future Projects",
        description: "Stay tuned for more technical, consulting, and freelance projects. I'm always exploring new challenges and technologies to build innovative solutions.",
        tags: ["Coming Soon"],
        link: null,
    },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
       <header>
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <Code size={36} /> Projects
        </h1>
        <p className="mt-2 text-muted-foreground">A selection of projects that showcase my skills and passion.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        {projects.map((project) => (
          <Card key={project.title} className="flex flex-col">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
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
      <footer className="text-center text-sm text-muted-foreground pt-8">
            <p>&copy; {new Date().getFullYear()} Thanuka Ellepola. All rights reserved.</p>
      </footer>
    </div>
  );
}

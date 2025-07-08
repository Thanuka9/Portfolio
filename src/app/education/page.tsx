import { GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const education = [
  {
    degree: "Master of Business Analytics",
    period: "2023–2025",
    institution: "University of Colombo",
  },
  {
    degree: "Bachelor of Computer Systems & Networking",
    period: "2019–2021",
    institution: "Greenwich University",
  },
  {
    degree: "Advanced Diploma in Telecommunication System & Digital Networking",
    period: "2017–2018",
    institution: "City & Guilds",
  },
];

export default function EducationPage() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <GraduationCap size={36} /> Education
        </h1>
        <p className="mt-2 text-muted-foreground">My academic background and qualifications.</p>
      </header>

      <div className="space-y-6">
        {education.map((edu) => (
          <Card key={edu.degree}>
            <CardHeader>
              <CardTitle>{edu.degree}</CardTitle>
              <p className="text-sm text-muted-foreground">{edu.institution} &middot; {edu.period}</p>
            </CardHeader>
          </Card>
        ))}
      </div>
      <footer className="text-center text-sm text-muted-foreground pt-8">
            <p>&copy; {new Date().getFullYear()} Thanuka Ellepola. All rights reserved.</p>
      </footer>
    </div>
  );
}

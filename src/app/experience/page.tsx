import { Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const experiences = [
  {
    role: "Team Lead, Technical Support & Automation Specialist",
    company: "Collective RCM",
    period: "JAN 2022 - PRESENT | Colombo",
    details: [
      "Lead a team of 15, improving operational efficiency by 25% through data analysis and workflow redesign.",
      "Developed predictive models to forecast claim denials, reducing them by 15% and increasing revenue.",
      "Managed technical support for ERP systems, ensuring minimal downtime and swift issue resolution.",
      "Designed and implemented automation scripts (Python, SQL), saving over 200 manual hours monthly.",
    ],
  },
  {
    role: "Associate Team Lead",
    company: "Collective RCM",
    period: "MAR 2021 - DEC 2021 | Colombo",
    details: [
      "Supervised a team of 10, providing coaching and performance feedback to achieve a 10% increase in productivity.",
      "Implemented data-driven strategies for workflow optimization and quality control.",
    ],
  },
  {
    role: "Senior Medical Billing Associate",
    company: "Collective RCM",
    period: "MAR 2019 - FEB 2021 | Colombo",
    details: [
      "Managed end-to-end RCM processes, including charge entry, payment posting, and denial management.",
      "Conducted regular audits to ensure compliance and accuracy, reducing billing errors by 20%.",
    ],
  },
  {
    role: "Medical Billing Associate",
    company: "Collective RCM",
    period: "MAR 2018 - FEB 2019 | Colombo",
    details: [
      "Handled medical billing and coding for various specialties, ensuring timely and accurate claim submissions.",
      "Resolved claim rejections and denials by communicating with insurance companies.",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <Briefcase size={36} /> Work Experience
        </h1>
        <p className="mt-2 text-muted-foreground">My professional journey and key accomplishments.</p>
      </header>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border/70">
        {experiences.map((exp, index) => (
          <Card key={index} className="pl-12 relative">
            <div className="absolute left-5 top-5 w-3 h-3 bg-primary rounded-full -translate-x-[5px]"></div>
            <CardHeader>
              <CardTitle>{exp.role}</CardTitle>
              <CardDescription>
                {exp.company} &middot; {exp.period}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {exp.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
      <footer className="text-center text-sm text-muted-foreground pt-8">
            <p>&copy; {new Date().getFullYear()} Thanuka Ellepola. All rights reserved.</p>
      </footer>
    </div>
  );
}

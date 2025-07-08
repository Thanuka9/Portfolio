import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center gap-3">
          <Mail size={36} /> Get In Touch
        </h1>
        <p className="mt-2 text-muted-foreground">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
      </header>
      
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
      
      <footer className="text-center text-sm text-muted-foreground pt-8">
            <p>&copy; {new Date().getFullYear()} Thanuka Ellepola. All rights reserved.</p>
      </footer>
    </div>
  );
}

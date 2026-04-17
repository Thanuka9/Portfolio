export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-24 px-6 space-y-12">
      <header className="space-y-4">
        <h1 className="text-5xl font-black font-headline tracking-tighter">Privacy <span className="text-primary italic">Policy.</span></h1>
        <p className="text-muted-foreground font-medium">Last updated: April 17, 2026</p>
      </header>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">1. Data Collection</h2>
        <p className="text-muted-foreground leading-relaxed">
          I only collect personal information that you voluntarily provide through my contact form (name, email, subject, and message). 
          This information is used solely to respond to your inquiry and provide consulting services.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">2. Data Security</h2>
        <p className="text-muted-foreground leading-relaxed">
          I am committed to ensuring that your information is secure. No third-party tracking or advertising cookies are used on this site.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold">3. Contact</h2>
        <p className="text-muted-foreground leading-relaxed">
          If you have any questions about this policy, please contact me at thanuka.ellepola@gmail.com.
        </p>
      </section>
    </div>
  );
}

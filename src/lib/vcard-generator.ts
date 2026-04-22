export function generateVCard() {
  const contact = {
    name: 'Thanuka Ellepola',
    title: 'AI Architect & Data Scientist',
    email: 'thanuka.ellepola@gmail.com',
    phone: '+94776705832',
    url: 'https://thanukaellepola.careers',
    linkedin: 'https://www.linkedin.com/in/thanuka-ellepola-a559b01aa/',
    location: 'Colombo, Sri Lanka'
  };

  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
ORG:Collective RCM
TITLE:${contact.title}
TEL;TYPE=CELL,VOICE:${contact.phone}
EMAIL;TYPE=PREF,INTERNET:${contact.email}
URL:${contact.url}
X-SOCIALPROFILE;TYPE=linkedin:${contact.linkedin}
ADR;TYPE=WORK,POSTAL,PARCEL:;;Colombo;Western Province;;Sri Lanka
NOTE:AI Architect & Data Scientist specializing in Autonomous Agents, RAG Pipelines, and Healthcare Predictive Analytics. Achieving R2 > 0.90 in production systems.
REV:${new Date().toISOString()}
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Thanuka_Ellepola.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function generateVCard() {
  const contact = {
    name: 'Thanuka Ellepola',
    title: 'AI Architect & Full Stack Developer',
    email: 'thanuka.ellepola@gmail.com',
    phone: '+94776705832',
    url: 'https://thanukaellepola.com',
    linkedin: 'https://www.linkedin.com/in/thanuka-ellepola-a559b01aa/',
    location: 'Colombo, Sri Lanka'
  };

  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
ORG:Central Bank of Sri Lanka
TITLE:${contact.title}
TEL;TYPE=CELL,VOICE:${contact.phone}
EMAIL;TYPE=PREF,INTERNET:${contact.email}
URL:${contact.url}
X-SOCIALPROFILE;TYPE=linkedin:${contact.linkedin}
ADR;TYPE=WORK,POSTAL,PARCEL:;;Colombo;Western Province;;Sri Lanka
NOTE:AI architect and full-stack developer focused on practical AI systems and enterprise software.
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

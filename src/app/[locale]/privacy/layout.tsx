import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy and data protection terms for thanukaellepola.careers — how your information is collected, used, and protected.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://thanukaellepola.careers/privacy',
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';
import { Fraunces, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import Nav from '@/src/components/layout/Nav';
import Footer from '@/src/components/layout/Footer';
import PageTransition from '@/src/components/layout/PageTransition';
import './globals.css';

const display = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
});

const sans = Hanken_Grotesk({
  variable: '--font-hanken',
  subsets: ['latin'],
  display: 'swap',
});

const mono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
});

const description =
  'Software Engineer mit Web-Schwerpunkt — Laravel, CMS-Lösungen und E-Commerce. Kundenportale, Intranets und Konfiguratoren — vom Konzept bis zur Pflege.';

export const metadata: Metadata = {
  metadataBase: new URL('https://romanschulz.com'),
  title: {
    default: 'Roman Schulz · Software Engineer',
    template: '%s · Roman Schulz',
  },
  description,
  keywords: [
    'Roman Schulz',
    'Software Engineer',
    'Softwareentwickler',
    'Full-Stack-Webentwickler',
    'Laravel',
    'TYPO3',
    'Shopware',
    'JTL-Shop',
    'React',
    'Hemer',
    'Iserlohn',
  ],
  authors: [{ name: 'Roman Schulz', url: 'https://romanschulz.com' }],
  creator: 'Roman Schulz',
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://romanschulz.com',
    siteName: 'Roman Schulz',
    title: 'Roman Schulz · Software Engineer',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roman Schulz · Software Engineer',
    description,
  },
};

// Resolve light/dark before paint to avoid a flash of the wrong theme.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=t;}catch(e){}})();`;

const SITE_URL = 'https://romanschulz.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/roman-schulz~';

// Structured data (schema.org) for search engines and AI. Person + WebSite.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Roman Schulz',
      url: SITE_URL,
      jobTitle: 'Software Engineer',
      description,
      email: 'mailto:kontakt@romanschulz.com',
      knowsLanguage: ['de', 'en'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hemer',
        addressRegion: 'NRW',
        addressCountry: 'DE',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Hochschule Mittweida',
      },
      knowsAbout: [
        'Software Engineering', 'PHP', 'Laravel', 'Laravel Nova', 'TypeScript',
        'React', 'REST APIs', 'TYPO3', 'WordPress', 'Shopware', 'JTL-Shop',
        'MySQL', 'Datenbankarchitektur', 'CI/CD', 'Linux', 'SEO', 'AI / Agentic Coding',
      ],
      sameAs: [LINKEDIN_URL],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Roman Schulz',
      description,
      inLanguage: 'de-DE',
      author: { '@id': `${SITE_URL}/#person` },
      publisher: { '@id': `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <Nav />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}

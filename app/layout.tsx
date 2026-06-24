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
  'Full-Stack-Webentwickler mit Schwerpunkt auf Laravel, CMS-Lösungen und E-Commerce. Kundenportale, Intranets und Konfiguratoren — vom Konzept bis zur Pflege.';

export const metadata: Metadata = {
  metadataBase: new URL('https://romanschulz.com'),
  title: {
    default: 'Roman Schulz · Full-Stack-Webentwickler',
    template: '%s · Roman Schulz',
  },
  description,
  keywords: [
    'Roman Schulz',
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
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://romanschulz.com',
    siteName: 'Roman Schulz',
    title: 'Roman Schulz · Full-Stack-Webentwickler',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roman Schulz · Full-Stack-Webentwickler',
    description,
  },
};

// Resolve light/dark before paint to avoid a flash of the wrong theme.
const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();`;

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
        <Nav />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}

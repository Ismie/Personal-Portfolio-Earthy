import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Nav from '@/src/components/layout/Nav';
import Footer from '@/src/components/layout/Footer';
import PageTransition from '@/src/components/layout/PageTransition';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Roman Schulz · Full-Stack-Webentwickler',
  description: 'Full-Stack-Webentwickler mit Schwerpunkt auf Laravel, CMS-Lösungen und E-Commerce.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Nav />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}

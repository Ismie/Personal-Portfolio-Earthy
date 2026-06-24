import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Projekt im Bereich Laravel, CMS oder E-Commerce? Schreib Roman Schulz — per Formular, E-Mail oder Telefon.',
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children;
}

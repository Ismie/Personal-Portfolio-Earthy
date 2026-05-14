export type Project = {
  name: string;
  sub: string;
  desc: string;
  tags: string[];
  year: string;
  status: string;
  link: string | null;
  accent: boolean;
};

export const projectsAll: Project[] = [
  {
    name: 'Codo',
    sub: 'Produktdokumentationsportal · Laravel Nova',
    desc: 'Multi-Mandanten-Plattform zur strukturierten Verwaltung und Präsentation technischer Produktdokumentation. Custom-Frontend mit markenspezifischem Design je Kunde (u.a. Kemper, Muli Cycles).',
    tags: ['laravel', 'nova', 'multi-tenant', 'mysql'],
    year: '2025',
    status: 'in betrieb',
    link: null,
    accent: true,
  },
  {
    name: 'Neumärker Thermocook',
    sub: 'Connected-Product-Portal · Laravel Nova',
    desc: 'Community-Plattform für ein internetverbundenes Waffeleisen: User-Generated Content (Rezepte, Bewertungen, Likes, Moderation), bidirektionaler Datenaustausch mit Gerät und Shop-System, Dual-Datenbank-Anbindung, Gerätelizenzierung und vollständiges Auth-System.',
    tags: ['laravel', 'nova', 'iot', 'dual-db'],
    year: '2025',
    status: 'in betrieb',
    link: 'neumaerker.de',
    accent: true,
  },
  {
    name: 'BAISO',
    sub: 'Arbeitssicherheits-Informationssystem · Neuentwicklung',
    desc: 'Mandantenfähige SaaS-Plattform für rechtssicheres Arbeitsschutzmanagement: Gefährdungsbeurteilungen, Gefahrstoffverzeichnis, Betriebsorganisation und Unfallstatistik. Kunden erhalten individuelle Instanzen mit branchenspezifischen Vorlagen und rollenbasierter Rechteverwaltung.',
    tags: ['laravel', 'saas', 'rbac', 'mysql'],
    year: '2024',
    status: 'in betrieb',
    link: null,
    accent: true,
  },
  {
    name: 'Kirchhoff K>NET',
    sub: 'Konzernintranet · TYPO3',
    desc: 'Entwicklung und laufende Pflege eines unternehmensweiten Intranets mit Nutzerforum, SharePoint-Contentanbindung, Career-System (PDF-Generierung) und diversen API-Integrationen (Microsoft, Wetter, KI, Übersetzung, Tracking) sowie einem Custom-KPI-Dashboard mit Quartalsvergleichen.',
    tags: ['typo3', 'sharepoint', 'ms-graph', 'kpi'],
    year: '2024',
    status: 'in pflege',
    link: null,
    accent: true,
  },
  {
    name: 'Widerruf-Button-Konfigurator',
    sub: 'Shop-übergreifendes Tool',
    desc: 'Konfigurierbares Tool zur automatisierten, gesetzeskonformen Einbindung des Widerruf-Buttons in verschiedene Shop-Systeme (Shopware, JTL, XT-Commerce u.a.) inkl. automatisiertem E-Mail-Versand und Individualisierungsoptionen.',
    tags: ['php', 'shopware', 'jtl', 'xt-commerce'],
    year: '2024',
    status: 'shipped',
    link: null,
    accent: true,
  },
  {
    name: 'MyLogoWaffel-Konfigurator',
    sub: 'Neumärker · interaktiver Konfigurator',
    desc: 'Interaktives Konfigurationstool für individuelle Waffelbackplatten mit eigenem Logo-Upload, SVG-Umrechnung und Schwellwertberechnung für CNC-Fräsvorlagen. Ein bisschen Bildverarbeitung, ein bisschen Geometrie, sehr viele Waffeln.',
    tags: ['javascript', 'svg', 'canvas', 'cnc'],
    year: '2024',
    status: 'shipped',
    link: 'neumaerker.de',
    accent: true,
  },
  {
    name: 'NWB Akademie',
    sub: 'E-Training-Management-Plattform',
    desc: 'Umsetzung einer browserbasierten Lernplattform für digitale Weiterbildungskurse inklusive Kursmanagement und Nutzertracking. SCORM-tauglich, mit ordentlich Edge-Cases im Reporting.',
    tags: ['php', 'scorm', 'mysql'],
    year: '2024',
    status: 'in betrieb',
    link: null,
    accent: true,
  },
  {
    name: 'Reflex Group',
    sub: 'Corporate Website',
    desc: 'TYPO3-basierte Unternehmenswebsite — Konzeption der Inhaltsstruktur, mehrsprachige Pflege, Performance- und SEO-Optimierung.',
    tags: ['typo3', 'seo', 'i18n'],
    year: '2024',
    status: 'in pflege',
    link: 'reflexgroup.de',
    accent: true,
  },
  {
    name: 'Quilt Cabin',
    sub: 'Shop-Projekt',
    desc: 'Shop-System-Umsetzung mit individuell angepasstem Frontend und Pflege im laufenden Betrieb.',
    tags: ['shopware', 'frontend', 'seo'],
    year: '2024',
    status: 'in pflege',
    link: 'quiltcabin.de',
    accent: true,
  },
];

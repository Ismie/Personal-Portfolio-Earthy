'use client';

import Divider from '@/src/components/layout/Divider';

const featuredPost = {
  date: '2025-11-04',
  readTime: '11 min',
  title: 'Laravel Nova für Multi-Mandanten-Portale: was wirklich skaliert',
  excerpt: 'Drei Codo-Iterationen und ein Connected-Product-Portal später: hier ist die Resource-Struktur, die Policies und das Theming-Pattern, mit dem Nova auch bei 12 Mandanten noch übersichtlich bleibt.',
  tag: 'aus der praxis',
};

const recentPosts = [
  {
    date: '2025-09-21',
    readTime: '7 min',
    title: 'TYPO3 + SharePoint: eine Integration, die nicht weh tut',
    excerpt: 'Wie wir das Kirchhoff-Intranet an Microsoft Graph angeschlossen haben — Auth, Caching, und der Trick mit den Drive-IDs.',
  },
  {
    date: '2025-07-12',
    readTime: '5 min',
    title: 'Dual-Database in Laravel: wenn ein Connection-String nicht reicht',
    excerpt: 'Geräte-Telemetrie schreibt auf DB A, der Shop liest aus DB B. Eloquent, Migrations und Tests in einer 2-DB-Welt.',
  },
  {
    date: '2025-05-30',
    readTime: '6 min',
    title: 'SVG → CNC: Schwellwerte, die wirklich fräsbar sind',
    excerpt: 'Lessons learned aus dem MyLogoWaffel-Konfigurator — Vektorisierung, Schwellwerte und warum 1mm doch viel ist.',
  },
];

export default function BlogPage() {
  return (
    <div className="page wrap">
      <header className="page-head">
        <h1>blog<span className="dot">.</span></h1>
        <p>
          Notizen aus dem Tagesgeschäft — meist Laravel, CMS-Architektur und der eine
          oder andere Konfigurator, der mehr Mühe gemacht hat als geplant.
        </p>
      </header>

      <a href="#" className="blog-featured" onClick={(e) => e.preventDefault()}>
        <div className="blog-featured-img">
          <div className="pixel-art-tile">
            <span className="label">[ titelbild · 480×320 ]</span>
          </div>
        </div>
        <div className="blog-featured-body">
          <div className="blog-featured-tag">★ {featuredPost.tag}</div>
          <h2 className="blog-featured-title">{featuredPost.title}</h2>
          <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>
          <div className="blog-featured-meta">
            <span>{featuredPost.date}</span>
            <span>·</span>
            <span>{featuredPost.readTime}</span>
          </div>
        </div>
      </a>

      <div className="section-head" style={{ marginTop: 48 }}>
        <h2>// zuletzt</h2>
        <div className="meta">3 aktuelle</div>
      </div>

      <div className="blog-grid">
        {recentPosts.map(p => (
          <a key={p.title} href="#" className="card blog-card" onClick={(e) => e.preventDefault()}>
            <div className="blog-card-date">{p.date}</div>
            <div className="blog-card-title">{p.title}</div>
            <div className="blog-card-excerpt">{p.excerpt}</div>
            <div className="blog-card-readtime">{p.readTime} lesen →</div>
          </a>
        ))}
      </div>

      <Divider />
      <div style={{ textAlign: 'center' }}>
        <a href="#" className="btn btn-ghost" onClick={(e) => e.preventDefault()}>
          archiv · alle beiträge
        </a>
      </div>
    </div>
  );
}

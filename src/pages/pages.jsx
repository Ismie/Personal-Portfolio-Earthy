// Home, Projects, Blog, Contact — content adapted to Roman Schulz's CV (DE)

import { useState as useStateP, useEffect as useEffectP } from 'react';
import PixelSprite from '../components/pixel/PixelSprite';
import Divider from '../components/layout/Divider';

// ── Home ──────────────────────────────────────────────────────────────────────

function TypewriterRole() {
  const roles = [
    'full-stack-webentwickler · laravel · cms',
    'typo3 · shopware · jtl-shop',
    'agenturpraxis · iserlohn · seit 2024',
  ];
  const [idx, setIdx] = useStateP(0);
  const [text, setText] = useStateP('');
  const [phase, setPhase] = useStateP('typing');

  useEffectP(() => {
    let timer;
    const target = roles[idx];
    if (phase === 'typing') {
      if (text.length < target.length) {
        timer = setTimeout(() => setText(target.slice(0, text.length + 1)), 45);
      } else {
        if (idx === roles.length - 1) {
          setPhase('done');
        } else {
          timer = setTimeout(() => setPhase('erasing'), 1700);
        }
      }
    } else if (phase === 'erasing') {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), 24);
      } else {
        setIdx((idx + 1) % roles.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timer);
  }, [text, phase, idx]);

  return (
    <div className="hero-role">
      <span className="bracket">[ </span>
      <span>{text}</span>
      <span className="cursor" />
      <span className="bracket"> ]</span>
    </div>
  );
}

const experience = [
  {
    period: 'seit 05.2024',
    sub: '(Praktikum 04–05.2024)',
    role: 'Programmierer / Full-Stack-Webentwickler',
    company: 'Everscreen Medienagentur · Iserlohn',
    desc: 'Agenturpraxis quer durchs Web: Laravel-Anwendungen, CMS-Pflege und -Entwicklung (TYPO3, WordPress, Shopware, JTL, XT-Commerce), Intranet-Systeme, Konfiguratoren, Performance-Tuning und Serveradministration für mittelständische Kunden.',
  },
];

const skills = [
  { label: 'Backend',     items: ['PHP', 'Laravel', 'Nova', 'Python', 'Java', 'Node.js'] },
  { label: 'Frontend',    items: ['JavaScript', 'TypeScript', 'React', 'jQuery', 'HTML5', 'CSS3'] },
  { label: 'CMS / Shop',  items: ['TYPO3', 'WordPress', 'Shopware', 'JTL-Shop', 'XT-Commerce'] },
  { label: 'Daten',       items: ['MySQL', 'MariaDB', 'SQL-Tuning', 'Dual-DB'] },
  { label: 'DevOps',      items: ['Linux', 'Git', 'CI/CD', 'Hosting', 'Caching', 'Security'] },
  { label: 'Marketing',   items: ['GA4', 'Google Ads', 'Matomo', 'SEO', 'KI-Anbindungen'] },
];

function HomePage({ setRoute }) {
  const featured = projectsAll.slice(0, 3);
  return (
    <div className="page">
      <section className="hero wrap">
        <div className="hero-sprite">
          <PixelSprite size={48} label="terminal.png" />
        </div>
        <h1 className="hero-name">Roman<span className="dot">.</span></h1>
        <TypewriterRole />
        <p className="hero-sub">
          Full-Stack-Webentwickler mit Schwerpunkt auf Laravel, CMS-Lösungen und E-Commerce.
          Ich baue Kundenportale, Intranets und Konfiguratoren — vom Konzept bis zur Pflege.
          M.Sc. Medieninformatik, zuhause in Hemer.
        </p>
        <div className="hero-cta">
          <button className="btn btn-primary" onClick={() => setRoute('projects')}>
            projekte ansehen →
          </button>
          <button className="btn btn-ghost" onClick={() => setRoute('contact')}>
            kontakt aufnehmen
          </button>
        </div>
      </section>

      <Divider />

      <section className="wrap about">
        <div className="about-label">// über mich</div>
        <div className="about-body">
          <p>
            Ich bin <strong>Full-Stack-Entwickler</strong> bei der Everscreen Medienagentur
            in Iserlohn. Mein Tagesgeschäft sind <strong>maßgeschneiderte Laravel-Anwendungen</strong>,
            Konzern-Intranets in TYPO3 und Shop-Lösungen für mittelständische Kunden — vom
            ersten Architektur-Sketch bis zur fünf Jahre alten Bestandspflege.
          </p>
          <p>
            Ich mag Systeme, die <strong>lange halten</strong>: saubere Datenmodelle, ehrliche
            APIs, ein DX-Niveau, bei dem auch der Kollege in zwei Jahren noch weiß, was los
            ist. Abseits des Bildschirms: 3D-Modellierung, Langstreckenlauf, Badminton.
          </p>
        </div>
      </section>

      <Divider />

      <section className="wrap">
        <div className="section-head">
          <h2>// werdegang</h2>
          <div className="meta">aktuell</div>
        </div>
        <div className="exp-list">
          {experience.map((x, i) => (
            <div className="exp-row" key={i}>
              <div className="exp-period">
                <div>{x.period}</div>
                {x.sub ? <div className="exp-sub">{x.sub}</div> : null}
              </div>
              <div className="exp-body">
                <div className="exp-role">{x.role}</div>
                <div className="exp-company">{x.company}</div>
                <p className="exp-desc">{x.desc}</p>
              </div>
            </div>
          ))}
          <div className="exp-row">
            <div className="exp-period">
              <div>10.2019 – 04.2023</div>
            </div>
            <div className="exp-body">
              <div className="exp-role">M.Sc. Medieninformatik &amp; Interaktives Entertainment</div>
              <div className="exp-company">Hochschule Mittweida</div>
            </div>
          </div>
          <div className="exp-row">
            <div className="exp-period">
              <div>09.2015 – 10.2019</div>
            </div>
            <div className="exp-body">
              <div className="exp-role">B.Sc. Medieninformatik &amp; Interaktives Entertainment</div>
              <div className="exp-company">Hochschule Mittweida</div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      <section className="wrap">
        <div className="section-head">
          <h2>// stack</h2>
          <div className="meta">womit ich täglich arbeite</div>
        </div>
        <div className="skills-grid">
          {skills.map(s => (
            <div className="skill-block" key={s.label}>
              <div className="skill-label">{s.label}</div>
              <div className="tags">
                {s.items.map(t => <span className="tag" key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      <section className="wrap">
        <div className="section-head">
          <h2>// ausgewählte projekte</h2>
          <div className="meta">3 von {projectsAll.length}</div>
        </div>
        <div className="feat-list">
          {featured.map(p => <ProjectCard key={p.name} p={p} />)}
        </div>
        <a href="#" className="see-all" onClick={(e) => { e.preventDefault(); setRoute('projects'); }}>
          alle projekte <span className="arrow">→</span>
        </a>
      </section>
    </div>
  );
}

// ── Projects ─────────────────────────────────────────────────────────────────

const projectsAll = [
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

function ProjectCard({ p }) {
  return (
    <a className="card project" href="#" onClick={(e) => e.preventDefault()}>
      {p.accent ? <span className="card-accent-bar" /> : null}
      <div className="project-top">
        <div>
          <div className="project-name">{p.name}</div>
          {p.sub ? <div className="project-sub">{p.sub}</div> : null}
        </div>
        <div className="project-meta">{p.year} · {p.status}</div>
      </div>
      <p className="project-desc">{p.desc}</p>
      <div className="project-foot">
        <div className="tags">
          {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
        </div>
        {p.link ? <span className="project-link">{p.link} ↗</span> : null}
      </div>
    </a>
  );
}

function ProjectsPage() {
  return (
    <div className="page wrap">
      <header className="page-head">
        <h1>projekte<span className="dot">.</span></h1>
        <p>
          Auswahl aus der Agenturpraxis bei Everscreen — Laravel-Plattformen, TYPO3-Intranets,
          Konfiguratoren und Shop-Lösungen. Stand 2024/2025, alles in produktivem Einsatz oder
          in laufender Pflege.
        </p>
      </header>
      <div className="section-head">
        <h2>// katalog</h2>
        <div className="meta">{projectsAll.length} einträge</div>
      </div>
      <div className="project-list">
        {projectsAll.map(p => <ProjectCard key={p.name} p={p} />)}
      </div>
      <Divider />
      <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)' }}>
        ende der liste · weitere referenzen auf anfrage
      </div>
    </div>
  );
}

// ── Blog ─────────────────────────────────────────────────────────────────────

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

function BlogPage() {
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

// ── Contact ──────────────────────────────────────────────────────────────────

function ContactPage() {
  const [form, setForm] = useStateP({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useStateP({});
  const [status, setStatus] = useStateP(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'bitte angeben.';
    if (!form.email.trim()) e.email = 'bitte angeben.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'das sieht nicht nach einer e-mail aus.';
    if (!form.message.trim()) e.message = 'bitte angeben.';
    else if (form.message.trim().length < 10) e.message = 'noch ein bisschen mehr, bitte.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(null), 4000);
    }, 900);
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="page wrap">
      <header className="page-head">
        <h1>kontakt<span className="dot">.</span></h1>
        <p>
          Interessantes Projekt im Bereich Laravel, CMS oder E-Commerce? Schreib mir gerne —
          eine kurze Beschreibung, was ihr vorhabt, reicht für den Anfang.
        </p>
      </header>

      <div className="contact-grid">
        <div className="contact-side">
          <h3>kanäle</h3>
          <p>
            Am schnellsten erreichst du mich per E-Mail oder Telefon. Postanschrift nur für
            offizielle Schreiben — alles andere geht digital.
          </p>
          <div className="contact-channels">
            <a className="channel" href="mailto:romanschulz.kn@gmail.com">
              <PixelSprite size={32} />
              <div>
                <div className="channel-label">e-mail</div>
                <div className="channel-value">romanschulz.kn@gmail.com</div>
              </div>
              <span className="channel-arrow">↗</span>
            </a>
            <a className="channel" href="tel:+4915905301529">
              <PixelSprite size={32} />
              <div>
                <div className="channel-label">telefon</div>
                <div className="channel-value">+49 159 05301529</div>
              </div>
              <span className="channel-arrow">↗</span>
            </a>
            <div className="channel" style={{ cursor: 'default' }}>
              <PixelSprite size={32} />
              <div>
                <div className="channel-label">postanschrift</div>
                <div className="channel-value" style={{ lineHeight: 1.5 }}>
                  Clara-Schumann-Str. 7<br />58675 Hemer
                </div>
              </div>
            </div>
            <a className="channel" href="#" onClick={(e) => e.preventDefault()}>
              <PixelSprite size={32} />
              <div>
                <div className="channel-label">linkedin</div>
                <div className="channel-value">in/romanschulz</div>
              </div>
              <span className="channel-arrow">↗</span>
            </a>
          </div>
        </div>

        <form className="form" onSubmit={submit} noValidate>
          <div className="field">
            <label>name</label>
            <input value={form.name} onChange={set('name')} placeholder="wer schreibt da?" />
            {errors.name ? <span className="err">{errors.name}</span> : null}
          </div>
          <div className="field">
            <label>e-mail</label>
            <input value={form.email} onChange={set('email')} placeholder="wohin antworten?" />
            {errors.email ? <span className="err">{errors.email}</span> : null}
          </div>
          <div className="field">
            <label>betreff <span style={{ opacity: .5 }}>(optional)</span></label>
            <input value={form.subject} onChange={set('subject')} placeholder="kurz und knapp" />
          </div>
          <div className="field">
            <label>nachricht</label>
            <textarea rows={6} value={form.message} onChange={set('message')} placeholder="erzähl mir, worum es geht." />
            {errors.message ? <span className="err">{errors.message}</span> : null}
          </div>
          <div className="form-foot">
            <div className="form-status">
              {status === 'sending' ? 'sende…' : status === 'sent' ? '✓ danke — ich melde mich innerhalb von ein, zwei tagen.' : ''}
            </div>
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'sende…' : 'senden →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { HomePage, ProjectsPage, BlogPage, ContactPage, ProjectCard };

import Link from 'next/link';
import TypewriterRole from '@/src/components/TypewriterRole';
import ProjectCard from '@/src/components/ProjectCard';
import Divider from '@/src/components/layout/Divider';
import PixelSprite from '@/src/components/pixel/PixelSprite';
import { projectsAll } from '@/src/data/projects';

const experience = [
  {
    period: 'seit 05.2024',
    sub: '(Praktikum 04–05.2024)',
    role: 'Software Engineer / Full-Stack-Entwickler',
    company: 'Everscreen Medienagentur · Iserlohn',
    desc: 'Agenturpraxis quer durchs Web: Laravel-Anwendungen, CMS-Pflege und -Entwicklung (TYPO3, WordPress, Shopware, JTL, XT-Commerce), Intranet-Systeme, Konfiguratoren, Performance-Tuning und Serveradministration für mittelständische Kunden.',
  },
];

const skills = [
  { label: 'Backend',    items: ['PHP', 'Laravel', 'Nova', 'Python', 'Java', 'Node.js'] },
  { label: 'Frontend',   items: ['JavaScript', 'TypeScript', 'React', 'jQuery', 'HTML5', 'CSS3'] },
  { label: 'CMS / Shop', items: ['TYPO3', 'WordPress', 'Shopware', 'JTL-Shop', 'XT-Commerce'] },
  { label: 'Daten',      items: ['MySQL', 'MariaDB', 'SQL-Tuning', 'Dual-DB'] },
  { label: 'DevOps',     items: ['Linux', 'Git', 'CI/CD', 'Hosting', 'Caching', 'Security'] },
  { label: 'Marketing',  items: ['GA4', 'Google Ads', 'Matomo', 'SEO', 'KI-Anbindungen'] },
];

export default function HomePage() {
  const featured = projectsAll.slice(0, 3);
  return (
    <div className="page">
      <section className="hero wrap">
        <div className="hero-sprite">
          <PixelSprite name="terminal" size={120} />
        </div>
        <div className="hero-eyebrow">roman schulz · software engineer</div>
        <h1 className="hero-name">Software, die bleibt<span className="dot">.</span></h1>
        <TypewriterRole />
        <p className="hero-sub">
          <strong>Maßgeschneiderte Lösungen</strong> — Kundenportale, Intranets und
          Konfiguratoren, vom Konzept bis zur Pflege. Schwerpunkt Laravel, CMS und
          E-Commerce. M.Sc. Medieninformatik, zuhause in Hemer.
        </p>
        <div className="hero-cta">
          <Link href="/projekte" className="btn btn-primary">projekte ansehen →</Link>
          <Link href="/kontakt" className="btn btn-ghost">kontakt aufnehmen</Link>
        </div>
      </section>

      <Divider />

      <section className="wrap about">
        <div className="about-label">{'// über mich'}</div>
        <div className="about-body">
          <p>
            Ich bin <strong>Software Engineer</strong> mit Web-Schwerpunkt — aktuell in einer
            Medienagentur in Iserlohn. Mein Tagesgeschäft sind <strong>maßgeschneiderte
            Laravel-Anwendungen</strong>, Konzern-Intranets in TYPO3 und Shop-Lösungen für
            mittelständische Kunden — vom ersten Architektur-Sketch bis zur fünf Jahre alten
            Bestandspflege.
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
          <h2>{'// werdegang'}</h2>
          <div className="meta">aktuell</div>
        </div>
        <div className="exp-list">
          {experience.map((x) => (
            <div className="exp-row" key={x.company}>
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
            <div className="exp-period"><div>10.2019 – 04.2023</div></div>
            <div className="exp-body">
              <div className="exp-role">M.Sc. Medieninformatik &amp; Interaktives Entertainment</div>
              <div className="exp-company">Hochschule Mittweida</div>
            </div>
          </div>
          <div className="exp-row">
            <div className="exp-period"><div>09.2015 – 10.2019</div></div>
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
          <h2>{'// stack'}</h2>
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
          <h2>{'// ausgewählte projekte'}</h2>
          <div className="meta">3 von {projectsAll.length}</div>
        </div>
        <div className="feat-list">
          {featured.map(p => <ProjectCard key={p.name} p={p} />)}
        </div>
        <Link href="/projekte" className="see-all">
          alle projekte <span className="arrow">→</span>
        </Link>
      </section>
    </div>
  );
}

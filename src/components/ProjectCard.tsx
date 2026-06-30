import type { Project } from '@/src/data/projects';

export default function ProjectCard({ p }: { p: Project }) {
  const inner = (
    <>
      {p.accent ? <span className="card-accent-bar" /> : null}
      <div className="project-top">
        <div>
          <div className="project-name">{p.name}</div>
          {p.sub ? <div className="project-sub">{p.sub}</div> : null}
        </div>
        <div className="project-aside">
          <span className="project-meta">{p.year} · {p.status}</span>
          <span className="project-role">{p.role}</span>
        </div>
      </div>
      <p className="project-desc">{p.desc}</p>
      <div className="project-foot">
        <div className="tags">
          {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
        </div>
        {p.link ? <span className="project-link">{p.link} ↗</span> : null}
      </div>
    </>
  );

  if (p.link) {
    return (
      <a
        className="card project"
        href={`https://${p.link}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }

  return <div className="card project">{inner}</div>;
}

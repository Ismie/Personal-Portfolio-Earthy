'use client';

import type { Project } from '@/src/data/projects';

export default function ProjectCard({ p }: { p: Project }) {
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

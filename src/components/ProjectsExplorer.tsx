'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { categories, type Project, type ProjectCategory } from '@/src/data/projects';

type Filter = ProjectCategory | 'all';

export default function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>('all');
  const visible = active === 'all' ? projects : projects.filter(p => p.category === active);

  return (
    <>
      <div className="filter-chips">
        <button
          type="button"
          className={`chip ${active === 'all' ? 'is-active' : ''}`}
          onClick={() => setActive('all')}
        >
          alle <span className="chip-count">{projects.length}</span>
        </button>
        {categories.map(c => {
          const count = projects.filter(p => p.category === c.id).length;
          if (count === 0) return null;
          return (
            <button
              key={c.id}
              type="button"
              className={`chip ${active === c.id ? 'is-active' : ''}`}
              onClick={() => setActive(c.id)}
            >
              {c.label} <span className="chip-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="project-list">
        {visible.map(p => <ProjectCard key={p.name} p={p} />)}
      </div>
    </>
  );
}

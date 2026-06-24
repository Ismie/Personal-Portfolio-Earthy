import type { Metadata } from 'next';
import ProjectCard from '@/src/components/ProjectCard';
import Divider from '@/src/components/layout/Divider';
import { projectsAll } from '@/src/data/projects';

export const metadata: Metadata = {
  title: 'Projekte',
  description:
    'Auswahl aus der Agenturpraxis bei Everscreen — Laravel-Plattformen, TYPO3-Intranets, Konfiguratoren und Shop-Lösungen.',
};

export default function ProjectsPage() {
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
        <h2>{'// katalog'}</h2>
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

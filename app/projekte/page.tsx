import type { Metadata } from 'next';
import ProjectsExplorer from '@/src/components/ProjectsExplorer';
import Divider from '@/src/components/layout/Divider';
import { projectsAll } from '@/src/data/projects';

export const metadata: Metadata = {
  title: 'Projekte',
  description:
    'Ausgewählte Projekte: Laravel-Plattformen & SaaS, Konfiguratoren, TYPO3-Intranets, Shops und Websites — von der Konzeption bis zum Betrieb.',
};

export default function ProjectsPage() {
  return (
    <div className="page wrap">
      <header className="page-head">
        <h1>projekte<span className="dot">.</span></h1>
        <p>
          Eine Auswahl aus der Praxis — Plattformen und SaaS, Konfiguratoren und Tools,
          Websites und Bestandspflege. Von der ersten Architektur bis zum laufenden Betrieb.
        </p>
      </header>
      <div className="section-head">
        <h2>{'// katalog'}</h2>
        <div className="meta">{projectsAll.length} einträge</div>
      </div>
      <ProjectsExplorer projects={projectsAll} />
      <Divider />
      <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)' }}>
        ende der liste · weitere referenzen auf anfrage
      </div>
    </div>
  );
}

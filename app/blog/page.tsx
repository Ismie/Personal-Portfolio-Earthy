import type { Metadata } from 'next';
import Link from 'next/link';
import Divider from '@/src/components/layout/Divider';
import { posts } from '@/src/data/posts';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Notizen aus dem Tagesgeschäft — Laravel, CMS-Architektur und der eine oder andere Konfigurator.',
};

export default function BlogPage() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const recent = posts.filter((p) => p.slug !== featured.slug);

  return (
    <div className="page wrap">
      <header className="page-head">
        <h1>blog<span className="dot">.</span></h1>
        <p>
          Notizen aus dem Tagesgeschäft — meist Laravel, CMS-Architektur und der eine
          oder andere Konfigurator, der mehr Mühe gemacht hat als geplant.
        </p>
      </header>

      <Link href={`/blog/${featured.slug}`} className="blog-featured">
        <div className="blog-featured-img">
          <div className="pixel-art-tile">
            <span className="label">[ titelbild · 480×320 ]</span>
          </div>
        </div>
        <div className="blog-featured-body">
          <div className="blog-featured-tag">★ {featured.tag}</div>
          <h2 className="blog-featured-title">{featured.title}</h2>
          <p className="blog-featured-excerpt">{featured.excerpt}</p>
          <div className="blog-featured-meta">
            <span>{featured.date}</span>
            <span>·</span>
            <span>{featured.readTime}</span>
          </div>
        </div>
      </Link>

      <div className="section-head" style={{ marginTop: 48 }}>
        <h2>{'// zuletzt'}</h2>
        <div className="meta">{recent.length} aktuelle</div>
      </div>

      <div className="blog-grid">
        {recent.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="card blog-card">
            <div className="blog-card-date">{p.date}</div>
            <div className="blog-card-title">{p.title}</div>
            <div className="blog-card-excerpt">{p.excerpt}</div>
            <div className="blog-card-readtime">{p.readTime} lesen →</div>
          </Link>
        ))}
      </div>

      <Divider />
      <div style={{ textAlign: 'center' }}>
        <span className="btn btn-ghost" aria-disabled="true">
          archiv · weitere beiträge folgen
        </span>
      </div>
    </div>
  );
}

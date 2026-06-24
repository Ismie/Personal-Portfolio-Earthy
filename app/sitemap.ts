import type { MetadataRoute } from 'next';
import { posts } from '@/src/data/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://romanschulz.com';
  const routes = ['', '/projekte', '/blog', '/kontakt'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
  const postUrls = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));
  return [...routes, ...postUrls];
}

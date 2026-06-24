import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Divider from '@/src/components/layout/Divider';
import { posts, getPost, type Block } from '@/src/data/posts';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  };
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case 'h2':
      return <h2 key={i}>{block.text}</h2>;
    case 'code':
      return (
        <pre key={i}>
          <code>{block.text}</code>
        </pre>
      );
    case 'ul':
      return (
        <ul key={i}>
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p key={i}>{block.text}</p>;
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="page wrap post">
      <Link href="/blog" className="post-back">← alle beiträge</Link>
      <div className="post-tag">{post.tag}</div>
      <h1 className="post-title">{post.title}</h1>
      <div className="post-meta">
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readTime} lesen</span>
      </div>

      <div className="post-body">{post.body.map(renderBlock)}</div>

      <Divider />
      <div className="post-foot">
        <span className="post-foot-note">Fragen oder ein Projekt im Kopf?</span>
        <Link href="/kontakt" className="btn btn-primary">projekt besprechen →</Link>
      </div>
    </article>
  );
}

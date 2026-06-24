import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>© 2026 Roman Schulz · Hemer · handgeschrieben, nicht generiert</div>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          <a href="mailto:kontakt@romanschulz.com">e-mail</a>
          <a href="https://www.linkedin.com/in/roman-schulz" target="_blank" rel="noopener noreferrer">linkedin</a>
          <Link href="/impressum">impressum</Link>
          <Link href="/datenschutz">datenschutz</Link>
        </div>
      </div>
    </footer>
  );
}

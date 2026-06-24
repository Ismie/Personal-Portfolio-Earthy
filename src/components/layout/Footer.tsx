'use client';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>© 2026 Roman Schulz · Hemer · handgeschrieben, nicht generiert</div>
        <div style={{ display: 'flex', gap: 18 }}>
          <a href="mailto:kontakt@romanschulz.com">e-mail</a>
          <a href="https://www.linkedin.com/in/roman-schulz" target="_blank" rel="noopener noreferrer">linkedin</a>
          <a href="#" onClick={(e) => e.preventDefault()}>impressum</a>
        </div>
      </div>
    </footer>
  );
}

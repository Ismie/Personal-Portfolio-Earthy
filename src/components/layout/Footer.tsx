'use client';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>© 2026 Roman Schulz · Hemer · handgeschrieben, nicht generiert</div>
        <div style={{ display: 'flex', gap: 18 }}>
          <a href="mailto:romanschulz.kn@gmail.com">e-mail</a>
          <a href="#" onClick={(e) => e.preventDefault()}>linkedin</a>
          <a href="#" onClick={(e) => e.preventDefault()}>impressum</a>
        </div>
      </div>
    </footer>
  );
}

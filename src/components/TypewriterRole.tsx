'use client';

import { useState, useEffect } from 'react';

const roles = [
  'full-stack-webentwickler · laravel · cms',
  'typo3 · shopware · jtl-shop',
  'agenturpraxis · iserlohn · seit 2024',
];

export default function TypewriterRole() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'erasing' | 'done'>('typing');

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const target = roles[idx];
    if (phase === 'typing') {
      if (text.length < target.length) {
        timer = setTimeout(() => setText(target.slice(0, text.length + 1)), 45);
      } else {
        if (idx === roles.length - 1) {
          setPhase('done');
        } else {
          timer = setTimeout(() => setPhase('erasing'), 1700);
        }
      }
    } else if (phase === 'erasing') {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), 24);
      } else {
        setIdx((idx + 1) % roles.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timer);
  }, [text, phase, idx]);

  return (
    <div className="hero-role">
      <span className="bracket">[ </span>
      <span>{text}</span>
      <span className="cursor" />
      <span className="bracket"> ]</span>
    </div>
  );
}

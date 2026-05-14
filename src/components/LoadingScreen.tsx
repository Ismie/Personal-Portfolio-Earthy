'use client';

import { useState, useEffect } from 'react';

type LoadingScreenProps = { onDone: () => void };

const poseA = [
  0,0,2,2,2,2,0,0,
  0,2,2,2,2,2,2,0,
  0,2,1,1,1,2,2,0,
  0,2,1,1,1,1,2,0,
  0,0,3,3,3,3,0,0,
  0,3,3,3,3,3,3,0,
  0,3,0,3,3,0,3,0,
  0,3,0,0,0,0,3,0,
];

const poseB = [
  0,0,2,2,2,2,0,0,
  0,2,2,2,2,2,2,0,
  0,2,1,1,1,2,2,0,
  0,2,1,1,1,1,2,0,
  0,0,3,3,3,3,0,0,
  0,3,3,3,3,3,3,0,
  0,0,3,3,3,3,0,0,
  0,3,3,0,0,3,3,0,
];

const colors: Record<number, string> = {
  0: 'transparent',
  1: '#E2C7A8',
  2: '#3A3E6A',
  3: '#4ECBA0',
};

export default function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [gone, setGone] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setFrame(f => (f + 1) % 8), 100);
    const t = setTimeout(() => {
      setGone(true);
      setTimeout(onDone, 320);
    }, 1500);
    return () => { clearInterval(iv); clearTimeout(t); };
  }, [onDone]);

  const grid = frame % 2 === 0 ? poseA : poseB;

  return (
    <div className={`loader ${gone ? 'gone' : ''}`}>
      <div className="loader-track">
        <div className="loader-ground" />
        <div className="loader-char">
          <div className="frame" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 4px)',
            gridTemplateRows: 'repeat(8, 4px)',
          }}>
            {grid.map((c, i) => (
              <span key={i} style={{ background: colors[c], width: 4, height: 4 }} />
            ))}
          </div>
        </div>
      </div>
      <div className="loader-text">lade<span className="loader-dots" /></div>
    </div>
  );
}

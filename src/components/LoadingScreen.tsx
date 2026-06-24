'use client';

import { useState, useEffect, useRef } from 'react';

type LoadingScreenProps = { onDone: () => void; duration?: number };

export default function LoadingScreen({ onDone, duration = 1400 }: LoadingScreenProps) {
  const [gone, setGone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const S = 4, W = 12, H = 13;
    let ctx: CanvasRenderingContext2D | null = null;
    if (cv) {
      cv.width = W * S;
      cv.height = H * S;
      ctx = cv.getContext('2d');
      if (ctx) ctx.imageSmoothingEnabled = false;
    }
    const O = '#241C16';
    const L = '#5A4230';
    const px = (x: number, y: number, w: number, h: number, c: string) => {
      if (!ctx) return;
      ctx.fillStyle = c;
      ctx.fillRect(x * S, y * S, w * S, h * S);
    };
    const drawFrame = (f: number) => {
      if (!ctx || !cv) return;
      ctx.clearRect(0, 0, cv.width, cv.height);
      px(4, 1, 4, 2, '#3A2A1E');        // hair
      px(4, 3, 4, 2, '#E6C6A0');        // face
      px(5, 4, 1, 1, O); px(7, 4, 1, 1, O); // eyes
      px(3, 6, 6, 2, '#C2613B');        // shirt
      px(3, 7, 6, 1, '#9B4A28');        // shirt shade
      px(2, 6, 1, 2, '#E6C6A0');        // left arm
      px(9, 6, 1, 2, '#E6C6A0');        // right arm
      if (f === 0 || f === 2) {         // stand
        px(3, 8, 2, 3, L); px(7, 8, 2, 3, L);
      } else if (f === 1) {             // stride a
        px(2, 8, 2, 2, L); px(2, 10, 1, 1, L); px(7, 8, 2, 1, L); px(9, 9, 1, 1, L);
      } else {                          // stride b
        px(3, 8, 2, 1, L); px(2, 9, 1, 1, L); px(7, 8, 2, 2, L); px(9, 10, 1, 1, L);
      }
    };

    let frame = 0;
    drawFrame(0);
    const iv = setInterval(() => { frame = (frame + 1) % 4; drawFrame(frame); }, 130);

    const fill = fillRef.current;
    if (fill) {
      fill.style.transition = `width ${duration}ms linear`;
      requestAnimationFrame(() => { if (fill) fill.style.width = '100%'; });
    }
    if (cv) {
      cv.style.transition = `transform ${duration}ms linear`;
      requestAnimationFrame(() => { if (cv) cv.style.transform = 'translateX(152px)'; });
    }

    const t1 = setTimeout(() => setGone(true), duration);
    const t2 = setTimeout(onDone, duration + 320);
    return () => { clearInterval(iv); clearTimeout(t1); clearTimeout(t2); };
  }, [onDone, duration]);

  return (
    <div className={`loader ${gone ? 'gone' : ''}`}>
      <div className="loader-scene">
        <canvas ref={canvasRef} className="loader-sprite" aria-hidden="true" />
        <div className="loader-ground" />
      </div>
      <div className="loader-bar"><div className="loader-bar-fill" ref={fillRef} /></div>
      <div className="loader-text">lade<span className="loader-dots" /></div>
    </div>
  );
}

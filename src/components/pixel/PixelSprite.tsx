'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { sprites, type SpriteName } from './sprites';

type PixelSpriteProps = {
  name?: SpriteName;
  size?: number; // target height in px (rounded to an integer pixel scale)
  label?: string;
  className?: string;
  style?: CSSProperties;
};

export default function PixelSprite({
  name = 'terminal',
  size = 32,
  label,
  className,
  style = {},
}: PixelSpriteProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const sprite = sprites[name] ?? sprites.terminal;
  const scale = Math.max(1, Math.round(size / sprite.h));
  const w = sprite.w * scale;
  const h = sprite.h * scale;

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    cv.width = w;
    cv.height = h;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, w, h);
    const px = (x: number, y: number, pw: number, ph: number, c: string) => {
      ctx.fillStyle = c;
      ctx.fillRect(x * scale, y * scale, pw * scale, ph * scale);
    };
    sprite.draw(px);
  }, [sprite, scale, w, h]);

  return (
    <div style={{ display: 'inline-block', lineHeight: 0, ...style }} className={className}>
      <canvas
        ref={ref}
        style={{ width: w, height: h, imageRendering: 'pixelated', display: 'block' }}
        aria-hidden="true"
      />
      {label ? <div className="pixel-sprite-label">{label}</div> : null}
    </div>
  );
}

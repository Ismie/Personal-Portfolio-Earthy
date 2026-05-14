import React from 'react';

type PixelSpriteProps = { size?: number; label?: string; style?: React.CSSProperties };

export default function PixelSprite({ size = 32, label, style = {} }: PixelSpriteProps) {
  return (
    <div style={{ position: 'relative', display: 'inline-block', ...style }}>
      <div className={`pixel-sprite s${size}`} />
      {label ? <div className="pixel-sprite-label">{label}</div> : null}
    </div>
  );
}

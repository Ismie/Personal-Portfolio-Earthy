type PixelAvatarProps = { size?: number };

const grid = [
  0,0,2,2,2,2,0,0,
  0,2,2,2,2,2,2,0,
  0,2,1,1,1,2,2,0,
  0,2,1,1,1,1,2,0,
  0,0,1,1,1,1,0,0,
  0,0,3,3,3,3,3,0,
  0,3,3,3,3,3,3,3,
  0,3,3,3,3,3,3,3,
];

const colors: Record<number, string> = {
  0: 'transparent',
  1: '#E2C7A8',
  2: '#3A3E6A',
  3: '#7B6CF6',
};

export default function PixelAvatar({ size = 24 }: PixelAvatarProps) {
  const px = size / 8;
  return (
    <div style={{
      width: size, height: size,
      display: 'grid',
      gridTemplateColumns: `repeat(8, ${px}px)`,
      gridTemplateRows: `repeat(8, ${px}px)`,
      background: '#0D0E1A',
      borderRadius: 2,
      overflow: 'hidden',
      imageRendering: 'pixelated',
      flex: '0 0 auto',
    }}>
      {grid.map((c, i) => (
        <span key={i} style={{ background: colors[c], width: px, height: px, display: 'block' }} />
      ))}
    </div>
  );
}

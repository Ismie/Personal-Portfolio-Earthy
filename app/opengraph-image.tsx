import { ImageResponse } from 'next/og';

export const alt = 'Roman Schulz · Full-Stack-Webentwickler';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#F4ECDD',
          color: '#2A2420',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 30, color: '#8A7C6C' }}>
          ~/ romanschulz.com
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 152, fontWeight: 700, lineHeight: 1 }}>
            <span>Roman</span>
            <span style={{ color: '#C2613B' }}>.</span>
          </div>
          <div style={{ display: 'flex', fontSize: 34, color: '#5C5046', marginTop: 20 }}>
            Full-Stack-Webentwickler · Laravel · TYPO3 · Shopware
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            width: 320,
            height: 14,
            borderRadius: 4,
            background: 'linear-gradient(90deg, #C2613B, #DD9A2B)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}

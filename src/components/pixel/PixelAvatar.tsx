'use client';

import PixelSprite from './PixelSprite';

type PixelAvatarProps = { size?: number };

export default function PixelAvatar({ size = 24 }: PixelAvatarProps) {
  return <PixelSprite name="mark" size={size} />;
}

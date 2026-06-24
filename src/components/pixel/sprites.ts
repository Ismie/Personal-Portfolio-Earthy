// Warm Terminal pixel sprites — drawn on a canvas at integer scale for crisp,
// shaded pixel art. Each draw fn receives `px(x, y, w, h, color)` in grid units.

export type Px = (x: number, y: number, w: number, h: number, c: string) => void;
export type Sprite = { w: number; h: number; draw: (px: Px) => void };

// shared palette
const O = '#241C16'; // outline / espresso
const CL = '#D8895C'; // clay light
const CM = '#C2613B'; // clay
const CD = '#8F4523'; // clay dark
const SA = '#E7A93A'; // screen amber
const SG = '#F4D08A'; // screen glow
const SD = '#C98A22'; // scanline
const SCR = '#3A2A16'; // on-screen ink
const PT = '#3E7D6B'; // petrol
const PTL = '#5A9C88'; // petrol light
const CREAM = '#FBF6EC';
const PAPER = '#F4ECDD';

// CRT terminal — the hero "terminal.png"
const terminal: Sprite = {
  w: 32,
  h: 28,
  draw: (px) => {
    // casing outline
    px(4, 2, 24, 2, O);
    px(4, 2, 2, 19, O);
    px(26, 2, 2, 19, O);
    px(4, 19, 24, 2, O);
    // casing body (light top → dark bottom)
    px(6, 4, 20, 4, CL);
    px(6, 8, 20, 7, CM);
    px(6, 15, 20, 4, CD);
    // power LED
    px(23, 17, 1, 1, PTL);
    // screen
    px(8, 5, 16, 11, O);
    px(9, 6, 14, 9, SA);
    px(9, 6, 14, 1, SG);
    // scanlines
    px(9, 8, 14, 1, SD);
    px(9, 10, 14, 1, SD);
    px(9, 12, 14, 1, SD);
    px(9, 14, 14, 1, SD);
    // prompt: ">" chevron + command + output line
    px(10, 9, 1, 1, SCR);
    px(11, 10, 1, 1, SCR);
    px(10, 11, 1, 1, SCR);
    px(13, 9, 3, 1, SCR);
    px(13, 11, 5, 1, SCR);
    // neck + base
    px(14, 21, 4, 3, CD);
    px(14, 21, 1, 3, O);
    px(17, 21, 1, 3, O);
    px(10, 24, 12, 1, CL);
    px(10, 25, 12, 1, CM);
    px(10, 26, 12, 1, O);
  },
};

// mini terminal — the nav/footer brand mark
const mark: Sprite = {
  w: 12,
  h: 12,
  draw: (px) => {
    px(1, 1, 10, 1, O);
    px(1, 1, 1, 8, O);
    px(10, 1, 1, 8, O);
    px(1, 8, 10, 1, O);
    px(2, 2, 8, 2, CL);
    px(2, 4, 8, 2, CM);
    px(2, 6, 8, 2, CD);
    px(3, 3, 6, 3, SA);
    px(3, 3, 6, 1, SG);
    px(4, 4, 3, 1, SCR);
    px(5, 9, 2, 1, CD);
    px(4, 10, 4, 1, CM);
    px(4, 11, 4, 1, O);
  },
};

// envelope
const mail: Sprite = {
  w: 16,
  h: 16,
  draw: (px) => {
    px(2, 4, 12, 9, O);
    px(3, 5, 10, 7, CM);
    px(3, 5, 10, 1, CL);
    px(3, 5, 2, 1, CD);
    px(5, 6, 2, 1, CD);
    px(7, 7, 2, 1, CD);
    px(9, 6, 2, 1, CD);
    px(11, 5, 2, 1, CD);
  },
};

// smartphone
const phone: Sprite = {
  w: 16,
  h: 16,
  draw: (px) => {
    px(5, 2, 7, 12, O);
    px(6, 3, 5, 10, '#4A3E36');
    px(6, 4, 5, 7, SA);
    px(6, 4, 5, 1, SG);
    px(8, 3, 1, 1, '#C9B79A');
    px(7, 12, 3, 1, '#C9B79A');
  },
};

// map pin
const pin: Sprite = {
  w: 16,
  h: 16,
  draw: (px) => {
    px(6, 2, 4, 1, CM);
    px(5, 3, 6, 1, CM);
    px(5, 4, 6, 1, CM);
    px(5, 5, 6, 1, CM);
    px(7, 4, 2, 1, PAPER); // hole
    px(6, 3, 1, 2, CL); // highlight
    px(6, 6, 4, 1, CD);
    px(7, 7, 2, 1, CD);
    px(7, 8, 2, 1, CD);
    px(8, 9, 1, 1, CD); // tip
  },
};

// linkedin "in" badge
const link: Sprite = {
  w: 16,
  h: 16,
  draw: (px) => {
    px(2, 2, 12, 12, O);
    px(3, 3, 10, 10, PT);
    px(3, 3, 10, 1, PTL);
    // i
    px(5, 5, 1, 1, CREAM);
    px(5, 7, 1, 4, CREAM);
    // n
    px(8, 7, 1, 4, CREAM);
    px(8, 7, 3, 1, CREAM);
    px(10, 7, 1, 4, CREAM);
  },
};

// sun — shown in dark mode (amber, reads on dark bg)
const sun: Sprite = {
  w: 12,
  h: 12,
  draw: (px) => {
    const A = '#DD9A2B';
    const AL = '#F0C97A';
    px(5, 0, 2, 2, A); px(5, 10, 2, 2, A);
    px(0, 5, 2, 2, A); px(10, 5, 2, 2, A);
    px(1, 1, 2, 2, A); px(9, 1, 2, 2, A);
    px(1, 9, 2, 2, A); px(9, 9, 2, 2, A);
    px(4, 3, 4, 6, A); px(3, 4, 6, 4, A);
    px(4, 4, 2, 2, AL);
  },
};

// moon — shown in light mode (ink, reads on cream bg)
const moon: Sprite = {
  w: 12,
  h: 12,
  draw: (px) => {
    const M = '#5C5046';
    px(4, 1, 3, 1, M);
    px(3, 2, 3, 1, M);
    px(2, 3, 3, 1, M);
    px(2, 4, 2, 1, M);
    px(2, 5, 2, 1, M);
    px(2, 6, 2, 1, M);
    px(2, 7, 2, 1, M);
    px(2, 8, 3, 1, M);
    px(3, 9, 3, 1, M);
    px(4, 10, 3, 1, M);
  },
};

export const sprites = { terminal, mark, mail, phone, pin, link, sun, moon };
export type SpriteName = keyof typeof sprites;

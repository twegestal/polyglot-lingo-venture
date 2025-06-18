import type { FireworksTypes } from 'fireworks-js';

export const difficultyOrder = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

export const successColor = '#00b341';
export const failColor = '#E43D3A';
export const blueManGroupBlue = '#228be6';

export const fireworksOptions: Partial<FireworksTypes.Options> = {
  hue: { min: 0, max: 360 },
  brightness: { min: 50, max: 80 },
  delay: { min: 15, max: 30 },
  boundaries: {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    debug: false,
  },
  opacity: 0.5,
  friction: 0.95,
  gravity: 1.5,
  explosion: 5,
  flickering: 50,
  intensity: 30,
  traceLength: 3,
  traceSpeed: 10,
  autoresize: true,
};

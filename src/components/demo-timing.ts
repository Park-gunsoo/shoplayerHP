export const DEMO_SPEED = 1.5;
export const DEMO_HOLD_MS = 1000;
export const demoDuration = (milliseconds: number) => Math.round(milliseconds / DEMO_SPEED);
export const demoCycle = (originalAnimationMs: number) => demoDuration(originalAnimationMs) + DEMO_HOLD_MS;

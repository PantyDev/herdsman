import { Point } from 'pixi.js';

export function distance(a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.hypot(dx, dy);
}

export function moveTowards(from: Point, to: Point, step: number, stopThreshold = 0.5): boolean {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy);
  if (dist <= stopThreshold || dist === 0) return false;
  const t = Math.min(1, step / dist);
  from.x += dx * t;
  from.y += dy * t;
  return true;
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


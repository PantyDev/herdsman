import { Point } from 'pixi.js';

export function distance(a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.hypot(dx, dy);
}

export function moveTowards(from: Point, to: Point, speed: number): void {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy);

  if (dist === 0) return;

  const ratio = speed / dist;
  from.x += dx * ratio;
  from.y += dy * ratio;
}

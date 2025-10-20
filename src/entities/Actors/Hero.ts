import { Point } from 'pixi.js';
import BaseActor from './BaseActor';
import { distance, moveTowards } from '../../lib/math';
import type { IVisualData } from '../../types/actor';
import type { BaseAnimal } from '..';

class Hero extends BaseActor {
  private speed = 2;
  private target: Point;
  private followers: BaseAnimal[] = [];

  constructor(x: number, y: number, visual?: IVisualData | null) {
    super(x, y, 15, 0xff0000);
    this.target = new Point(x, y);
    this.setVisual(visual);
  }

  setTarget(x: number, y: number) {
    this.target.set(x, y);
  }

  update(delta: number) {
    if (!this.target) return;
    this.zIndex = Math.round(this.y);
    const dist = distance(this.position, this.target);

    if (dist > 1) {
      const oldX = this.x;
      const oldY = this.y;
      moveTowards(this.position, this.target, this.speed * delta);
      const dx = this.x - oldX;
      const dy = this.y - oldY;
      this.updateVisualFromDelta(dx, dy);
    } else {
      this.setMoving(false);
    }
  }

  tryAddFollower(animal: BaseAnimal) {
    if (this.followers.length < 5 && !this.followers.includes(animal)) {
      this.followers.push(animal);
      animal.follow(this);
    }
  }

  getFollowers(): BaseAnimal[] {
    return this.followers;
  }

  removeFollower(animal: BaseAnimal) {
    this.followers = this.followers.filter(a => a !== animal);
  }
}

export default Hero;
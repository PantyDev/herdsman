import { Container, Point } from 'pixi.js';
import BaseActor from './BaseActor';
import { distance, moveTowards } from '../../lib/math';
import AnimalPatrolController from '../../core/classes/AnimalPatrolController';
import type { IVisualData } from '../../types/actor';

export class BaseAnimal extends BaseActor {
  private leader: Container | null = null;
  private target: Point;
  private patrolController: AnimalPatrolController;
  protected speed = 1.5;
  protected scoreMultiplier = 1;
  private _prevX: number = 0;
  private _prevY: number = 0;

  constructor(
    x: number,
    y: number,
    radius = 10,
    color = 0xffffff,
    visual: IVisualData | null = null
  ) {
    super(x, y, radius, color);
    this.target = new Point(x, y);
    this.patrolController = new AnimalPatrolController(this);
    this.setVisual(visual);
  }

  follow(target: Container) {
    this.leader = target;
  }

  setTarget(x: number, y: number): void {
    this.target.set(x, y);
  }

  update(delta: number) {
    let isMoving = false;
    this.zIndex = Math.round(this.y);

    if (!this.leader) {
        isMoving = this.move(this.target, this.speed * delta);
    } else {
        const target = this.leader.position;
        const dist = distance(this.position, target);
        if (dist > 20) {
            isMoving = this.move(target, this.speed * delta);
        }
    }

    this.setMoving(isMoving);
  }

  private move(target: Point, speed: number): boolean {
    const moved = moveTowards(this.position, target, speed, 0.5);
    this.patrolController.update();
    if (moved) {
        const dx = this.x - (this._prevX ?? this.x);
        const dy = this.y - (this._prevY ?? this.y);
        this.updateVisualFromDelta(dx, dy);
    } else {
        this.updateVisualFromDelta(0, 0);
    }
    this._prevX = this.x; this._prevY = this.y;
    return moved;
  }

  getScoreMultiplier() {
    return this.scoreMultiplier;
  }

  isInYard(yard: Container): boolean {
    return yard.getBounds().rectangle.contains(this.x, this.y);
  }
}

import { Container } from 'pixi.js';
import BaseActor from './BaseActor';

export class Animal extends BaseActor {
    private leader: Container | null = null;
    private speed = 1.5;

    constructor(x: number, y: number) {
        super(x, y, 10, 0xffffff);
    }

    follow(target: Container) {
        this.leader = target;
    }

    update(delta: number) {
        if (!this.leader) return;
        const target = this.leader.position;
        const dist = Math.hypot(target.x - this.x, target.y - this.y);
        if (dist > 20) {
            const angle = Math.atan2(target.y - this.y, target.x - this.x);
            this.x += Math.cos(angle) * this.speed * delta;
            this.y += Math.sin(angle) * this.speed * delta;
        }
    }

    isInYard(yard: Container): boolean {
        return yard.getBounds().rectangle.contains(this.x, this.y);
    }
}

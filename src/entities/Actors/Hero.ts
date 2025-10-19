import { Point } from 'pixi.js';
import { Animal } from './Animal';
import BaseActor from './BaseActor';
import { distance, moveTowards } from '../../lib/math';

export class Hero extends BaseActor {
    private speed = 2;
    private target: Point | null = null;
    private followers: Animal[] = [];

    constructor(x: number, y: number) {
        super(x, y, 15, 0xff0000);
        this.target = new Point(x, y);
    }

    setTarget(x: number, y: number) {
        this.target?.set(x, y);
    }

    update(delta: number) {
        if (!this.target) return;
        const dist = distance(this.position, this.target);

        if (dist > 1) {
            moveTowards(this.position, this.target, this.speed * delta);
        }
    }

    tryAddFollower(animal: Animal) {
        if (this.followers.length < 5 && !this.followers.includes(animal)) {
            this.followers.push(animal);
            animal.follow(this);
        }
    }

    getFollowers(): Animal[] {
        return this.followers;
    }

    removeFollower(animal: Animal) {
        this.followers = this.followers.filter(a => a !== animal);
    }
}

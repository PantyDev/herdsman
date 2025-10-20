import { Point } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, SPAWN_PADDING } from "../utils/constants";
import { distance, getRandomInt } from "../../lib/math";
import type { BaseAnimal } from "../../entities";

class AnimalPatrolController {
    private actor: BaseAnimal | null = null;
    private currentPosition: Point;

    constructor(actor: BaseAnimal) {
        this.actor = actor;
        this.currentPosition = this.nextPosition();
        this.actor.setTarget(this.currentPosition.x, this.currentPosition.y)
    }

    update() {
        if(!this.actor) return;

        if (distance(this.actor.position, this.currentPosition) < 4) {
            this.currentPosition = this.nextPosition();
            this.actor.setTarget(this.currentPosition.x, this.currentPosition.y);
        }

    }


    private clampX(val: number) {
        return Math.max(SPAWN_PADDING, Math.min(GAME_WIDTH - SPAWN_PADDING, val));
    }

    private clampY(val: number) {
        return Math.max(SPAWN_PADDING, Math.min(GAME_HEIGHT - SPAWN_PADDING, val));
    }

    private randomNewX() {
        if (!this.actor) return Math.floor(GAME_WIDTH / 2);
        const add = getRandomInt(-100, 100);
        const candidate = Math.floor(this.actor.x + add);
        return this.clampX(candidate);
    }

    private randomNewY() {
        if (!this.actor) return Math.floor(GAME_HEIGHT / 2);
        const add = getRandomInt(-100, 100);
        const candidate = Math.floor(this.actor.y + add);
        return this.clampY(candidate);
    }

    private nextPosition() {
        return new Point(this.randomNewX(), this.randomNewY())
    }
}

export default AnimalPatrolController;
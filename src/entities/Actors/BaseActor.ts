import { Graphics, Container } from 'pixi.js';

abstract class BaseActor extends Container {
    protected body: Graphics;

    constructor(x: number, y: number, radius: number, color: number) {
        super();
        this.body = new Graphics()
            .circle(0, 0, radius)
            .fill(color)
        this.addChild(this.body);
        this.position.set(x, y);
    }

    update(_delta: number): void {}
}

export default BaseActor;
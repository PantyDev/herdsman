import type { Container, ContainerChild } from "pixi.js";
import type { BaseActor } from "../../entities";

class PlayerController {
    private stage: Container<ContainerChild> | null = null;
    private actor: BaseActor | null = null;

    constructor(stage: Container<ContainerChild>, actor: BaseActor) {
        this.stage = stage;
        this.actor = actor;
    }

    init() {
        if(!this.stage) return;
        this.stage.on('pointerdown', e => {
            if(!this.actor) return;
            this.actor.setTarget(e.global.x, e.global.y);
        });
    }
}

export default PlayerController;
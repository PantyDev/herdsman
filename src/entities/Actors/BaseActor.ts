import { DropShadowFilter } from "pixi-filters/drop-shadow";
import { Container, Graphics, AnimatedSprite } from "pixi.js";

import { DEBUG_COLLIDERS } from "../../core/utils/constants";
import type { IMovable, IVisualData } from "../../types/actor";

abstract class BaseActor extends Container implements IMovable {
	protected body: Graphics | null = null;
	protected sprite: AnimatedSprite | null = null;
	private moving = false;

	constructor(x: number, y: number, radius: number, color: number) {
		super();
		if (DEBUG_COLLIDERS) {
			this.body = new Graphics().circle(0, 0, radius).fill(color);
			this.addChild(this.body);
		}

		this.position.set(x, y);
	}

	setVisual(visual?: IVisualData | null) {
		if (this.sprite) {
			this.removeChild(this.sprite);
			this.sprite.destroy({ children: true });
			this.sprite = null;
		}
		if (!visual) return;

		this.sprite = new AnimatedSprite(visual.textures);
		this.sprite.anchor.set(visual.anchor);
		this.sprite.filters = [
			new DropShadowFilter({
				color: 0x000000,
				alpha: 0.5,
				blur: 4,
				offset: { x: 4, y: 4 },
			}),
		];
		this.sprite.animationSpeed = visual.animationSpeed;

		this.addChildAt(this.sprite, 0);
	}

	protected faceTowards(dx: number) {
		if (!this.sprite) return;
		this.sprite.scale.x = dx < 0 ? -1 : 1;
	}

	setMoving(isMoving: boolean) {
		if (!this.sprite) return;
		if (this.moving === isMoving) return;
		this.moving = isMoving;

		if (isMoving) {
			if (!this.sprite.playing) this.sprite.play();
		} else {
			this.sprite.gotoAndStop(0);
		}
	}

	protected updateVisualFromDelta(dx: number, dy: number) {
		const moved = Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1;
		if (moved) this.faceTowards(dx);
		this.setMoving(moved);
	}

	abstract update(delta: number): void;
	abstract setTarget(x: number, y: number): void;
}

export default BaseActor;

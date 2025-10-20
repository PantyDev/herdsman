import type { Texture } from "pixi.js";

export interface IMovable {
	setTarget(x: number, y: number): void;
	update(delta: number): void;
}

export interface IVisualData {
	textures: Texture[];
	animationSpeed: number;
	anchor: number;
}

import type { IVisualData } from "../../types/actor";

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;

export const HERO_RADIUS = 15;
export const ANIMAL_RADIUS = 10;
export const SPAWN_PADDING = 100;
export const MAX_FOLLOWERS = 5;

export const MIN_SPAWN = 5;
export const MAX_SPAWN = 10;

export const DEBUG_COLLIDERS = false;

export const COLORS = {
	background: 0x228b22,
	hero: 0xff0000,
	animal: 0xffffff,
	yard: 0xffff00,
};

export const VISUAL_CONFIG: Record<string, IVisualData> = {
	hero: {
		textures: [],
		animationSpeed: 1,
		anchor: 0.5,
	},
	cow: {
		textures: [],
		animationSpeed: 0.5,
		anchor: 0.5,
	},
	sheep: {
		textures: [],
		animationSpeed: 0.75,
		anchor: 0.5,
	},
	pig: {
		textures: [],
		animationSpeed: 0.85,
		anchor: 0.5,
	},
};

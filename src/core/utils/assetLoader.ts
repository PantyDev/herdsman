import { Assets } from "pixi.js";

import { VISUAL_CONFIG } from "./constants";

export default async function loadAssets(): Promise<void> {
	Assets.addBundle("animals", {
		cow: "assets/actors/cow/cow.json",
		sheep: "assets/actors/sheep/sheep.json",
		pig: "assets/actors/pig/pig.json",
	});

	Assets.addBundle("player", {
		hero: "assets/actors/hero/hero.json",
	});

	const { cow, sheep, pig } = await Assets.loadBundle("animals");

	VISUAL_CONFIG.cow.textures = cow.animations["cow"];
	VISUAL_CONFIG.sheep.textures = sheep.animations["sheep"];
	VISUAL_CONFIG.pig.textures = pig.animations["pig"];

	const { hero } = await Assets.loadBundle("player");

	VISUAL_CONFIG.hero.textures = hero.animations["hero"];
}

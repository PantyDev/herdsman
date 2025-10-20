import { Container, Text, type ContainerChild, type StrokeInput } from "pixi.js";

import { GAME_HEIGHT, GAME_WIDTH } from "../core/utils/constants";

export class GameOverlay {
	private zIndex = 5000;
	private scoreText: Text;
	private timeLeftText: Text;
	private clickToRestartText: Text;

	constructor(stage: Container<ContainerChild>) {
		const stroke = {
			width: 4,
			color: 0x000000,
			alpha: 1,
			join: "round",
		} as StrokeInput;

		this.scoreText = new Text({
			text: "Score: 0",
			style: {
				fill: "#ffffff",
				fontSize: 24,
				stroke,
			},
		});
		this.scoreText.position.set(10, 10);
		this.scoreText.zIndex = this.zIndex;

		this.timeLeftText = new Text({
			text: "Time left: ",
			style: {
				fill: "#ffffff",
				fontSize: 24,
				stroke,
			},
		});
		this.timeLeftText.position.set(10, 40);
		this.timeLeftText.zIndex = this.zIndex;

		this.clickToRestartText = new Text({
			text: "Click to restart!",
			anchor: 0.5,
			style: {
				fill: "#ffffff",
				fontSize: 32,
				fontWeight: "600",
				stroke,
			},
		});
		this.clickToRestartText.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2);
		this.clickToRestartText.zIndex = this.zIndex;
		this.clickToRestartText.alpha = 0;

		stage.addChild(this.scoreText, this.timeLeftText, this.clickToRestartText);
	}

	setScore(score: number) {
		this.scoreText.text = `Score: ${score}`;
	}

	getTimeLeftText() {
		return this.timeLeftText;
	}
	showClickToRestart(score: number) {
		this.clickToRestartText.text = `Your score: ${score}\nClick to restart!`;
		this.clickToRestartText.alpha = 1;
	}
}

import { Graphics, Container } from "pixi.js";

class Yard extends Container {
	constructor(x: number, y: number) {
		super();
		const area = new Graphics().rect(0, 0, 100, 100).fill(0xffff00); // жёлтый цвет
		this.addChild(area);
		this.position.set(x, y);
	}
}

export default Yard;

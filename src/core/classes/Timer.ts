import { Text, Ticker } from "pixi.js";

class Timer {
	private timeLeftText: Text;
	private tickerHandle: ((time: Ticker) => void) | null = null;
	private remainingMs = 0;
	private running = false;
	private onFinish: (() => void) | null = null;

	constructor(text: Text) {
		this.timeLeftText = text;
	}

	start(seconds: number, onFinish?: () => void) {
		this.stop();
		this.remainingMs = Math.max(0, Math.floor(seconds * 1000));
		this.onFinish = onFinish ?? null;
		this.updateTimeText();
		this.running = true;

		this.tickerHandle = (ticker: Ticker) => {
			const delta = ticker.deltaTime;
			const ms = delta * (1000 / 60);
			this.remainingMs = Math.max(0, this.remainingMs - ms);
			this.updateTimeText();

			if (this.remainingMs <= 0) {
				this.stop();
				if (this.onFinish) this.onFinish();
			}
		};

		Ticker.shared.add(this.tickerHandle);
	}

	pause() {
		if (!this.running || !this.tickerHandle) return;
		Ticker.shared.remove(this.tickerHandle);
		this.running = false;
	}

	resume() {
		if (this.running || !this.tickerHandle) return;
		Ticker.shared.add(this.tickerHandle);
		this.running = true;
	}

	stop() {
		if (this.tickerHandle) {
			Ticker.shared.remove(this.tickerHandle);
			this.tickerHandle = null;
		}
		this.running = false;
		this.updateTimeText();
	}

	reset(seconds: number) {
		this.stop();
		this.remainingMs = Math.max(0, Math.floor(seconds * 1000));
		this.updateTimeText();
	}

	private updateTimeText() {
		const totalSeconds = Math.ceil(this.remainingMs / 1000);
		const mm = Math.floor(totalSeconds / 60);
		const ss = totalSeconds % 60;
		this.timeLeftText.text = `Time left: ${this.pad2(mm)}:${this.pad2(ss)}`;
	}

	private pad2(v: number) {
		return v < 10 ? `0${v}` : `${v}`;
	}
}

export default Timer;

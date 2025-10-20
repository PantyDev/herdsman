import { Application } from 'pixi.js';
import PlayerController from './PlayerController';
import { getRandomItem } from '../../lib/array';
import { GAME_HEIGHT, GAME_WIDTH, MAX_SPAWN, MIN_SPAWN, SPAWN_PADDING, VISUAL_CONFIG } from '../utils/constants';
import { getRandomInt } from '../../lib/math';
import { GameOverlay } from '../../ui/GameOverlay';
import Timer from './Timer';
import EffectManager from './EffectManager';
import { Game } from '.';
import { Hero, Yard, Cow, Sheep, Pig, BaseAnimal } from '../../entities';

class GameManager {
    private app: Application;
    private hero: Hero;
    private yard: Yard;
    private gameOverlay: GameOverlay;
    private animalTypes = [Cow, Sheep, Pig];
    private animals: BaseAnimal[] = [];
    private score = 0;
    private paused = false;

    constructor(app: Application) {
        this.app = app;
        this.hero = new Hero(400, 300, VISUAL_CONFIG.hero);
        this.yard = new Yard(700, 500);

        const controller = new PlayerController(this.app.stage, this.hero);
        controller.init();

        this.gameOverlay = new GameOverlay(this.app.stage);
        const timer = new Timer(this.gameOverlay.getTimeLeftText());
        
        this.app.stage.sortableChildren = true;
        this.app.stage.addChild(this.yard, this.hero);
        this.spawnAnimals();

        this.app.ticker.add(time => this.update(time.deltaTime));
        this.app.stage.eventMode = 'static';
        this.app.stage.hitArea = this.app.screen;
        this.app.stage.on('pointerdown', e => {
            const pos = e.global;
            this.hero.setTarget(pos.x, pos.y);
        });

        timer.start(60, () => {
            this.gameOverlay.getTimeLeftText().text = "Done";
            this.gameOverlay.showClickToRestart(this.score);
            setTimeout(() => {
                this.pauseGame();
                this.app.canvas.addEventListener("click", () => {
                    this.reinitGame();
                });
            }, 50);
        });
    }

    private reinitGame() {
        this.app.canvas.remove();
        this.app.destroy();
        const game = new Game();
        game.init();
    }

    private spawnAnimals(from?: number, to?: number) {
        const count = getRandomInt(from ?? MIN_SPAWN, to ?? MAX_SPAWN);

        for (let i = 0; i < count; i++) {
            const CurrentAnimal = getRandomItem<typeof BaseAnimal>(this.animalTypes);
            const x = (Math.random() * (GAME_WIDTH - SPAWN_PADDING * 2)) + SPAWN_PADDING;
            const y = (Math.random() * (GAME_HEIGHT - SPAWN_PADDING * 2)) + SPAWN_PADDING;

            const animal = new CurrentAnimal(
                x, 
                y
            );
            this.animals.push(animal);
            this.app.stage.addChild(animal);

            const effect = new EffectManager(this.app.stage, x, y);
            effect.createConfetti();
        }
    }


    private update(delta: number) {
        this.hero.update(delta);
        
        const removed: BaseAnimal[] = [];
        for (const animal of this.animals) {
            animal.update(delta);
            if (animal.isInYard(this.yard)) {
                this.hero.removeFollower(animal);
                this.app.stage.removeChild(animal);
                removed.push(animal);
                this.score += animal.getScoreMultiplier();
            } else {
                if (Math.hypot(animal.x - this.hero.x, animal.y - this.hero.y) < 30) {
                    this.hero.tryAddFollower(animal);
                }
            }
        }
        if (removed.length) {
            this.animals = this.animals.filter(a => !removed.includes(a));
            this.gameOverlay.setScore(this.score)
            if (this.animals.length < 3) this.spawnAnimals(3, 6);
        }
    }

    pauseGame() {
        if (this.paused) return;
        this.paused = true;
        this.app.ticker.stop();
        this.app.stage.eventMode = 'none';
        this.app.stage.interactiveChildren = false;
    }

    resumeGame() {
        if (!this.paused) return;
        this.paused = false;
        this.app.ticker.start();
        this.app.stage.eventMode = 'static';
        this.app.stage.interactiveChildren = true;
    }
}

export default GameManager;
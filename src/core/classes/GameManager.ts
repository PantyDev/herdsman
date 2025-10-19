import { Application, Text } from 'pixi.js';
import { Yard } from '../../entities/Yard';
import { BaseAnimal } from '../../entities/Actors/BaseAnimal';
import { Hero } from '../../entities/Actors/Hero';
import PlayerController from './PlayerController';
import { Cow } from '../../entities/Actors/Cow';
import { Sheep } from '../../entities/Actors/Sheep';
import { getRandomItem } from '../../lib/array';
import { GAME_HEIGHT, GAME_WIDTH, MAX_SPAWN, MIN_SPAWN, SPAWN_PADDING, VISUAL_CONFIG } from '../utils/constants';
import { getRandomInt } from '../../lib/math';
import { Pig } from '../../entities/Actors/Pig';

class GameManager {
    private app: Application;
    private hero: Hero;
    private animalTypes = [Cow, Sheep, Pig];
    private animals: BaseAnimal[] = [];
    private yard: Yard;
    private score = 0;
    private scoreText: Text;

    constructor(app: Application) {
        this.app = app;
        this.hero = new Hero(400, 300, VISUAL_CONFIG.hero);
        this.yard = new Yard(700, 500);
        this.scoreText = new Text({ text: 'Score: 0', style: { fill: '#ffffff', fontSize: 24 }});
        this.scoreText.position.set(10, 10);

        const controller = new PlayerController(this.app.stage, this.hero);
        controller.init();
        
        this.app.stage.sortableChildren = true;
        this.app.stage.addChild(this.yard, this.hero, this.scoreText);
        this.spawnAnimals();

        this.app.ticker.add(time => this.update(time.deltaTime));
        this.app.stage.eventMode = 'static';
        this.app.stage.hitArea = this.app.screen;
        this.app.stage.on('pointerdown', e => {
            const pos = e.global;
            this.hero.setTarget(pos.x, pos.y);
        });
    }

    private spawnAnimals(from?: number, to?: number) {
        const count = getRandomInt(from ?? MIN_SPAWN, to ?? MAX_SPAWN);

        for (let i = 0; i < count; i++) {
            const CurrentAnimal = getRandomItem<typeof BaseAnimal>(this.animalTypes);
            const animal = new CurrentAnimal(
                (Math.random() * (GAME_WIDTH - SPAWN_PADDING * 2)) + SPAWN_PADDING, 
                (Math.random() * (GAME_HEIGHT - SPAWN_PADDING * 2)) + SPAWN_PADDING
            );
            this.animals.push(animal);
            this.app.stage.addChild(animal);
        }
    }


    private update(delta: number) {
        this.hero.update(delta);
        
        const removed: BaseAnimal[] = [];
        for (const animal of this.animals) {
            animal.update(delta);
            animal.zIndex = Math.round(animal.y);
            if (animal.isInYard(this.yard)) {
                this.hero.removeFollower(animal);
                this.app.stage.removeChild(animal);
                removed.push(animal);
                this.score++;
            } else {
                if (Math.hypot(animal.x - this.hero.x, animal.y - this.hero.y) < 30) {
                    this.hero.tryAddFollower(animal);
                }
            }
        }
        if (removed.length) {
            this.animals = this.animals.filter(a => !removed.includes(a));
            this.scoreText.text = `Score: ${this.score}`;
            if (this.animals.length < 3) this.spawnAnimals(3, 6);
        }
    }
}

export default GameManager;
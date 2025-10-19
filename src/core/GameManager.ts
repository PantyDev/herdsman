import { Application, Text } from 'pixi.js';
import { Yard } from '../entities/Yard';
import { Animal } from '../entities/Actors/Animal';
import { Hero } from '../entities/Actors/Hero';

class GameManager {
    private app: Application;
    private hero: Hero;
    private animals: Animal[] = [];
    private yard: Yard;
    private score = 0;
    private scoreText: Text;

    constructor(app: Application) {
        this.app = app;
        this.hero = new Hero(400, 300);
        this.yard = new Yard(700, 500);
        this.scoreText = new Text({ text: 'Score: 0', style: { fill: '#ffffff', fontSize: 24 }});
        this.scoreText.position.set(10, 10);

        this.app.stage.addChild(this.yard, this.hero, this.scoreText);
        this.spawnAnimals();

        this.app.ticker.add(time => this.update(time.deltaTime));
        this.app.stage.eventMode = 'static';
        this.app.stage.hitArea = this.app.screen;
        this.app.stage.on('pointerdown', e => {
            const pos = e.global;
            console.log(pos)
            this.hero.setTarget(pos.x, pos.y);
        });
    }

    private spawnAnimals() {
        const count = Math.floor(Math.random() * 5) + 5;
        for (let i = 0; i < count; i++) {
            const animal = new Animal(Math.random() * 700 + 50, Math.random() * 500 + 50);
            this.animals.push(animal);
            this.app.stage.addChild(animal);
        }
    }

    private update(delta: number) {
        this.hero.update(delta);
        for (const animal of this.animals) {
            animal.update(delta);
            if (!animal.isInYard(this.yard)) {
                if (Math.hypot(animal.x - this.hero.x, animal.y - this.hero.y) < 30) {
                this.hero.tryAddFollower(animal);
                }
            } else {
                this.hero.removeFollower(animal);
                this.app.stage.removeChild(animal);
                this.animals = this.animals.filter(a => a !== animal);
                this.score++;
                this.scoreText.text = `Score: ${this.score}`;
            }
        }
    }
}

export default GameManager;
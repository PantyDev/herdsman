import gsap from "gsap";
import { DropShadowFilter } from "pixi-filters";
import { Container, Graphics } from "pixi.js";
import Physics2DPlugin from 'gsap/Physics2DPlugin';

gsap.registerPlugin(Physics2DPlugin);

class EffectManager {
    x: number;
    y: number;
    stage: Container;
    
    constructor(stage: Container, x: number, y: number) {
        this.x = x;
        this.y = y;
        this.stage = stage;
    }

    createConfetti() {
        const dotCount = gsap.utils.random(5, 25, 1);
        const colors = ['white'];

        for (let i = 0; i < dotCount; i++) {
            const dot = new Graphics()
                .circle(0, 0, gsap.utils.random(5, 15))
                .fill('white') // Pick a random color
                .stroke({ color: 'white', width: 2 }); // Add a white stroke

            dot.zIndex = 5000;
            dot.filters = [
                new DropShadowFilter({
                    color: 'white',
                    alpha: 0.5,
                    blur: 4,
                    offset: { x: 0, y: 5 },
                }),
            ];

            this.stage.addChild(dot);


            gsap.set(dot, {
                tint: gsap.utils.random(colors),
                y: this.y,
                x: this.x,
                scale: 0,
            });

            gsap
                .timeline({
                    onComplete: () => dot.destroy(), 
                })
                .to(dot, {
                    scale: gsap.utils.random(0.3, 1),
                    duration: 0.02,
                    alpha: 1,
                    ease: 'power3.out',
                })
                .to(dot, {
                    duration: 1,
                    alpha: 0,
                    physics2D: {
                        velocity: gsap.utils.random(100, 200),
                        angle: gsap.utils.random(0, 360),
                        gravity: 0,
                    },
                    ease: 'none',
                });
        }
    }
}

export default EffectManager;
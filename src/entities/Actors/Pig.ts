
import { BaseAnimal } from '..';
import { VISUAL_CONFIG } from '../../core/utils/constants';

class Pig extends BaseAnimal {
    constructor(x: number, y: number) {
        super(x, y, 20, 0x000fff, VISUAL_CONFIG.pig);
        this.speed = 0.9;
        this.scoreMultiplier = 3;
    }
}

export default Pig;
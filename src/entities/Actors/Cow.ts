
import { BaseAnimal } from '..';
import { VISUAL_CONFIG } from '../../core/utils/constants';

class Cow extends BaseAnimal {
    constructor(x: number, y: number) {
        super(x, y, 35, 0x000fff, VISUAL_CONFIG.cow);
        this.speed = 0.7;
        this.scoreMultiplier = 1;
    }
}

export default Cow;
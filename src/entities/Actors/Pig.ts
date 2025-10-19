
import { VISUAL_CONFIG } from '../../core/utils/constants';
import { BaseAnimal } from './BaseAnimal';

export class Pig extends BaseAnimal {
    constructor(x: number, y: number) {
        super(x, y, 20, 0x000fff, VISUAL_CONFIG.pig);
        this.speed = 0.9;
    }
}

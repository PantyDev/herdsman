
import { VISUAL_CONFIG } from '../../core/utils/constants';
import { BaseAnimal } from './BaseAnimal';

export class Sheep extends BaseAnimal {
    constructor(x: number, y: number) {
        super(x, y, 25, 0xfff000, VISUAL_CONFIG.sheep);
        this.speed = 0.8;
    }
}

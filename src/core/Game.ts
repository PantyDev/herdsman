import { Application } from 'pixi.js';
import { GameManager } from './GameManager';
import { COLORS, GAME_HEIGHT, GAME_WIDTH } from './constants';

export class Game {
  private app: Application;

  constructor() {
    this.app = new Application();
  }

  async init() {
    await this.app.init({ 
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        backgroundColor: COLORS.background, 
    });

    document.body.appendChild(this.app.canvas);
    
    new GameManager(this.app);
  }
}

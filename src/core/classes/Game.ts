import { Application } from 'pixi.js';
import GameManager from './GameManager';
import { COLORS, GAME_HEIGHT, GAME_WIDTH } from '../utils/constants';
import loadAssets from '../utils/assetLoader';

class Game {
  private app: Application;

  constructor() {
    this.app = new Application();
  }

  async init(withoutLoadAssets = false) {
    await this.app.init({ 
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        backgroundColor: COLORS.background
    });

    document.body.appendChild(this.app.canvas);
    
    if(withoutLoadAssets) {
      new GameManager(this.app); 
      return;
    }
    loadAssets().then(() => {
      new GameManager(this.app); 
    });
  }
}

export default Game;

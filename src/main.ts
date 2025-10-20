import { Game } from "./core/classes";
import "./style.css";

(async () => {
   const gameInitButton = document.querySelector(".game-init");
   if(!gameInitButton) return;

   gameInitButton.addEventListener("click", () => {
      const game = new Game();
      game.init();
      gameInitButton.classList.add("hide");
   });
})();

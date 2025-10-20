# HERDSMAN

A charming farm-themed game built with PixiJS and TypeScript. You control a hero who rounds up wandering animals and leads them into a fenced yard. The game features animated sprites, autonomous animal behavior, and a clean architecture designed for scalability and maintainability.

DEMO https://pantydev.github.io/herdsman/

### 🚀 Getting Started
node -v 22.18.0 (>=)
git clone git@github.com:PantyDev/herdsman.git
cd herdsman
npm install
npm run dev

Then open **http://localhost:5173** in your browser.

### 🎮 Gameplay
- Click anywhere on the screen to move the hero.
- Approach animals to make them follow you.
- Lead animals into the yellow yard to score points.
- Animals patrol randomly until they’re close enough to be recruited.
- Once inside the yard, animals disappear and your score increases.
- New animals spawn automatically when the count drops below a threshold.

### Architecture Overview
Component               Description
GameManager             Main game loop and scene controller
Hero	                Player-controlled character
BaseAnimal	            Abstract class for animal behavior and animation
AnimalPatrolController	Handles autonomous movement for animals
PlayerController	    Processes user input
Yard	                The fenced area where animals are delivered
constants.ts	        Game settings, colors, dimensions, and animation configs
AssetLoader.ts	        Loads animated textures from JSON bundles


### 🎨 Animation System
Each animal uses AnimatedSprite with custom speed and direction.
The hero can also be animated using VISUAL_CONFIG.hero.
Sprites flip horizontally based on movement direction.
Animation starts/stops based on movement state.

### 📁 Project Structure
src/
├── core/
│   ├── classes/
│   └── utils/
├── entities/
│   ├── Actors/
│   └── Yard.ts
├── lib/
├── types/
└── main.ts

### 🛠 Technologies Used
PixiJS — rendering and animation
TypeScript — strict typing and clean architecture
Vite — fast bundling and dev server
import { AudioSystem } from "./audio.js";
import { MusicSystem } from "./music.js";
import { UISystem } from "./ui.js";
import { Game } from "./game.js";

const audioSystem =
    new AudioSystem();

const musicSystem =
    new MusicSystem();

const uiSystem =
    new UISystem(
        audioSystem
    );

const game =
    new Game(
        uiSystem,
        audioSystem,
        musicSystem
    );

uiSystem.initialize(
    game
);

audioSystem.initialize();

musicSystem.initialize();

console.log(
    "THE DARK JEWEL // PROTOTYPE 0.2 INITIALIZED"
);

import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { CollisionSystem } from "./collision.js";
import { NavigationSystem } from "./navigation.js";
import { VisionSystem } from "./vision.js";
import { MissionSystem } from "./mission.js";
import { RadioSystem } from "./radio.js";
import { GameOverSystem } from "./gameover.js";
import { Joystick } from "./joystick.js";
import { MapSystem } from "./map.js";

export class Game {

    constructor(
        uiSystem,
        audioSystem,
        musicSystem
    ) {

        this.uiSystem = uiSystem;
        this.audioSystem = audioSystem;
        this.musicSystem = musicSystem;

        this.canvas =
            document.getElementById(
                "game-canvas"
            );

        this.context =
            this.canvas.getContext("2d");

        this.running = false;
        this.lastTime = 0;

        this.mapSystem =
            new MapSystem();

        this.collisionSystem =
            new CollisionSystem(
                this.mapSystem
            );

        this.navigationSystem =
            new NavigationSystem(
                this.mapSystem
            );

        this.player =
            new Player(
                this.collisionSystem
            );

        this.enemy =
            new Enemy(
                this.collisionSystem,
                this.navigationSystem,
                this.player
            );

        this.visionSystem =
            new VisionSystem(
                this.collisionSystem
            );

        this.missionSystem =
            new MissionSystem(
                this.mapSystem
            );

        this.radioSystem =
            new RadioSystem(
                this.audioSystem
            );

        this.gameOverSystem =
            new GameOverSystem(
                this
            );

        this.joystick =
            new Joystick(
                document.getElementById(
                    "joystick-zone"
                ),
                document.getElementById(
                    "joystick-stick"
                )
            );

        this.animationFrame = null;
    }

    startMission() {

        this.audioSystem.initialize();
        this.audioSystem.resume();

        this.musicSystem.stopAll();

        this.radioSystem.openStartCommunication(
            this.uiSystem
        );
    }

    beginGameplay() {

        this.resetMission();

        this.running = true;

        this.musicSystem.playMission();

        this.lastTime =
            performance.now();

        this.animationFrame =
            requestAnimationFrame(
                (time) => this.loop(time)
            );
    }

    resetMission() {

        this.player.x = 100;
        this.player.y = 440;

        this.player.active = true;

        this.enemy.x = 590;
        this.enemy.y = 100;

        this.enemy.currentPatrolPoint = 0;
        this.enemy.detectedPlayer = false;

        this.missionSystem =
            new MissionSystem(
                this.mapSystem
            );

        this.gameOverSystem.active = false;

        this.uiSystem.updateObjective(
            this.missionSystem.getObjectiveText()
        );

        this.uiSystem.updateDetection(
            "STATUS // NORMAL"
        );
    }

    restartMission() {

        this.running = false;

        this.resetMission();

        this.uiSystem.showScreen(
            "game-screen"
        );

        this.beginGameplay();
    }

    returnToMenu() {

        this.running = false;

        this.musicSystem.stopAll();

        this.uiSystem.showScreen(
            "main-menu"
        );

        this.musicSystem.playMenu();
    }

    loop(time) {

        if (!this.running) {
            return;
        }

        const deltaTime =
            Math.min(
                (time - this.lastTime) / 1000,
                0.05
            );

        this.lastTime = time;

        this.update(deltaTime);
        this.draw();

        this.animationFrame =
            requestAnimationFrame(
                (nextTime) =>
                    this.loop(nextTime)
            );
    }

    update(deltaTime) {

        if (this.gameOverSystem.active) {

            this.gameOverSystem.update(
                deltaTime
            );

            return;
        }

        const direction =
            this.joystick.getDirection();

        this.player.setDirection(
            direction.x,
            direction.y
        );

        this.player.update(
            deltaTime
        );

        this.enemy.update(
            deltaTime
        );

        const detected =
            this.visionSystem.canDetect(
                this.enemy,
                this.player
            );

        if (detected) {

            this.uiSystem.updateDetection(
                "STATUS // DETECTADO"
            );

            this.gameOverSystem.start(
                this.enemy
            );

            return;
        }

        this.uiSystem.updateDetection(
            "STATUS // NORMAL"
        );

        const missionResult =
            this.missionSystem.update(
                this.player
            );

        if (
            missionResult ===
            "objective-collected"
        ) {

            this.audioSystem.playObjective();

            this.uiSystem.updateObjective(
                this.missionSystem.getObjectiveText()
            );
        }

        if (
            missionResult ===
            "mission-complete"
        ) {

            this.completeMission();
        }
    }

    completeMission() {

        this.running = false;

        this.musicSystem.stopAll();

        this.radioSystem.openCompletionCommunication(
            this.uiSystem
        );
    }

    showGameOver() {

        this.running = false;

        this.musicSystem.stopAll();

        this.uiSystem.showGameOver();
    }

    draw() {

        this.context.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.mapSystem.draw(
            this.context
        );

        this.visionSystem.draw(
            this.context,
            this.enemy
        );

        this.enemy.draw(
            this.context
        );

        this.player.draw(
            this.context
        );

        this.drawLighting();
    }

    drawLighting() {

        const gradient =
            this.context.createRadialGradient(
                this.player.x,
                this.player.y,
                40,
                this.player.x,
                this.player.y,
                230
            );

        gradient.addColorStop(
            0,
            "rgba(50, 80, 105, 0.05)"
        );

        gradient.addColorStop(
            1,
            "rgba(0, 0, 0, 0.38)"
        );

        this.context.fillStyle =
            gradient;

        this.context.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }
}

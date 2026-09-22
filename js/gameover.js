export class GameOverSystem {

    constructor(game) {

        this.game = game;

        this.active = false;
        this.timer = 0;

        this.duration = 2.8;
    }

    start(enemy) {

        if (this.active) {
            return;
        }

        this.active = true;
        this.timer = 0;

        this.game.player.active = false;
        enemy.stop();

        this.game.audioSystem.playAlert();
    }

    update(deltaTime) {

        if (!this.active) {
            return;
        }

        this.timer += deltaTime;

        if (this.timer >= this.duration) {

            this.active = false;

            this.game.showGameOver();
        }
    }
}

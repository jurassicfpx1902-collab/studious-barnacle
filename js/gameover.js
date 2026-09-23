class GameOverSystem {
    show() {
        audioSystem.playGameOver();
        audioSystem.setIntensity("danger");

        if (window.gameController) {
            gameController.showGameOver();
        }
    }

    retry() {
        if (window.gameController) {
            gameController.startGameplay();
        }
    }
}

window.gameOverSystem = new GameOverSystem();

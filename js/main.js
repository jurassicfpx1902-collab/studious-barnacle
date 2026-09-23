class GameController {

constructor() {

    this.canvas =
        document.getElementById(
            "game-canvas"
        );

    this.ctx =
        this.canvas
            ? this.canvas.getContext("2d")
            : null;

    this.running = false;

    this.lastTime = 0;

    this.enemies = [];

    this.enemyAI = null;

    this.difficulty = "NORMAL";
}

init() {

    uiManager.init();

    interactionSystem.init();

    this.resizeCanvas();

    window.addEventListener(
        "resize",
        () => this.resizeCanvas()
    );

    this.bindButtons();

    this.showMenu();

    requestAnimationFrame(
        time => this.loop(time)
    );
}

resizeCanvas() {

    if (!this.canvas) {
        return;
    }

    /*
     * Keep the internal game resolution fixed.
     * CSS controls the visual size on mobile.
     */

    this.canvas.width = 800;
    this.canvas.height = 600;
}

bindButtons() {

    const startButton =
        document.getElementById(
            "start-button"
        );

    const settingsButton =
        document.getElementById(
            "settings-button"
        );

    const creditsButton =
        document.getElementById(
            "credits-button"
        );

    const exitButton =
        document.getElementById(
            "exit-button"
        );

    const continueButton =
        document.getElementById(
            "radio-continue"
        );

    const skipButton =
        document.getElementById(
            "radio-skip"
        );

    const backSettings =
        document.getElementById(
            "settings-back"
        );

    const backCredits =
        document.getElementById(
            "credits-back"
        );

    const retryButton =
        document.getElementById(
            "retry-button"
        );

    const gameOverMenu =
        document.getElementById(
            "gameover-menu"
        );

    const completeButton =
        document.getElementById(
            "complete-button"
        );


    startButton?.addEventListener(
        "click",
        () => this.beginMission()
    );

    settingsButton?.addEventListener(
        "click",
        () => this.showSettings()
    );

    creditsButton?.addEventListener(
        "click",
        () => this.showCredits()
    );

    exitButton?.addEventListener(
        "click",
        () => this.showMenu()
    );

    continueButton?.addEventListener(
        "click",
        () => radioSystem.next()
    );

    skipButton?.addEventListener(
        "click",
        () => radioSystem.finish()
    );

    backSettings?.addEventListener(
        "click",
        () => this.showMenu()
    );

    backCredits?.addEventListener(
        "click",
        () => this.showMenu()
    );

    retryButton?.addEventListener(
        "click",
        () => gameOverSystem.retry()
    );

    gameOverMenu?.addEventListener(
        "click",
        () => gameOverSystem.returnToMenu()
    );

    completeButton?.addEventListener(
        "click",
        () => this.showMenu()
    );


    /*
     * AUDIO
     */

    const audioToggle =
        document.getElementById(
            "audio-toggle"
        );

    audioToggle?.addEventListener(
        "change",
        event => {

            audioSystem.setEnabled(
                event.target.checked
            );

            if (
                event.target.checked
            ) {

                audioSystem.startMusic();
            }
        }
    );


    /*
     * DIFFICULTY
     */

    document
        .querySelectorAll(
            "[data-difficulty]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    this.difficulty =
                        button.dataset.difficulty;

                    document
                        .querySelectorAll(
                            "[data-difficulty]"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "selected"
                            );
                        });

                    button.classList.add(
                        "selected"
                    );

                    audioSystem.playConfirm();
                }
            );
        });
}

showMenu() {

    this.running = false;

    audioSystem.init();

    audioSystem.startMusic();

    audioSystem.setIntensity(
        "normal"
    );

    uiManager.showScreen(
        "menu-screen"
    );
}

showSettings() {

    audioSystem.playConfirm();

    uiManager.showScreen(
        "settings-screen"
    );
}

showCredits() {

    audioSystem.playConfirm();

    uiManager.showScreen(
        "credits-screen"
    );
}

beginMission() {

    audioSystem.resume();

    audioSystem.playConfirm();

    effectsSystem.triggerGlitch(
        0.25
    );

    uiManager.showScreen(
        "radio-screen"
    );

    radioSystem.start();
}

startGameplay() {

    uiManager.showScreen(
        "game-screen"
    );

    this.createMission();

    missionSystem.start();

    this.running = true;

    audioSystem.startMusic();
}

createMission() {

    const enemyCount =
        this.difficulty === "EXTREMO"
            ? 3
            : 2;

    this.enemies = [];


    /*
     * ENEMY 01
     */

    this.enemies.push(

        new Enemy(
            275,
            145,
            [
                {
                    x: 275,
                    y: 145
                },
                {
                    x: 275,
                    y: 360
                }
            ]
        )
    );


    /*
     * ENEMY 02
     */

    this.enemies.push(

        new Enemy(
            430,
            440,
            [
                {
                    x: 430,
                    y: 440
                },
                {
                    x: 600,
                    y: 440
                }
            ]
        )
    );


    /*
     * EXTREME MODE
     */

    if (enemyCount >= 3) {

        this.enemies.push(

            new Enemy(
                585,
                145,
                [
                    {
                        x: 545,
                        y: 145
                    },
                    {
                        x: 620,
                        y: 330
                    }
                ]
            )
        );
    }


    this.enemyAI =
        new EnemyAI(
            this.enemies
        );

    extractionSystem.reset();
}

update(delta) {

    if (!this.running) {
        return;
    }

    const input =
        joystick.getInput();

    player.update(
        input,
        delta
    );

    collisionSystem.keepPlayerInside();

    this.enemyAI.update(
        delta
    );

    missionSystem.update();

    interactionSystem.updateHint();

    effectsSystem.update(
        delta
    );

    this.updateAudioState();
}

updateAudioState() {

    let state = "normal";

    for (
        const enemy of this.enemies
    ) {

        if (
            enemy.state === "ALERT"
        ) {

            state = "alert";

            break;
        }

        if (
            enemy.state === "SEARCH"
        ) {

            state = "suspicious";
        }
    }

    if (
        missionSystem.objectiveCollected
    ) {

        state = "extraction";
    }

    audioSystem.setIntensity(
        state
    );
}

draw() {

    if (!this.ctx) {
        return;
    }

    const ctx = this.ctx;

    ctx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );


    /*
     * MAP
     */

    gameMap.draw(
        ctx
    );


    /*
     * ENEMY VISION
     */

    for (
        const enemy of this.enemies
    ) {

        visionSystem.drawVision(
            ctx,
            enemy
        );
    }


    /*
     * ENEMIES
     */

    for (
        const enemy of this.enemies
    ) {

        enemy.draw(
            ctx
        );
    }


    /*
     * PLAYER
     */

    player.draw(
        ctx
    );


    /*
     * EFFECTS
     */

    effectsSystem.draw(
        ctx,
        this.canvas.width,
        this.canvas.height
    );
}

loop(time) {

    const delta =
        Math.min(
            (time - this.lastTime) /
            1000,
            0.05
        );

    this.lastTime =
        time;

    this.update(
        delta
    );

    this.draw();

    requestAnimationFrame(
        nextTime =>
            this.loop(nextTime)
    );
}

showMissionComplete() {

    this.running = false;

    uiManager.showScreen(
        "mission-complete-screen"
    );
}

showGameOver() {

    this.running = false;

    uiManager.showScreen(
        "game-over-screen"
    );
}

}

window.gameController =
new GameController();

window.addEventListener(
"load",
() => {

    gameController.init();
}

);

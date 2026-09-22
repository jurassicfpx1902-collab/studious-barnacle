export class UISystem {

    constructor(audioSystem) {

        this.audioSystem = audioSystem;

        this.screens = [
            "main-menu",
            "settings-screen",
            "credits-screen",
            "radio-screen",
            "game-screen",
            "gameover-screen"
        ];

        this.audioEnabled = true;
    }

    initialize(game) {

        this.game = game;

        this.bindMenuButtons();
        this.bindSettings();
        this.bindRadio();
        this.bindGameOver();
    }

    showScreen(screenId) {

        for (const id of this.screens) {

            const screen =
                document.getElementById(id);

            screen.classList.toggle(
                "active",
                id === screenId
            );
        }
    }

    bindMenuButtons() {

        const buttons =
            document.querySelectorAll(
                "[data-action]"
            );

        buttons.forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const action =
                        button.dataset.action;

                    this.audioSystem.resume();
                    this.audioSystem.playMenuMove();

                    if (action === "start") {
                        this.game.startMission();
                    }

                    if (action === "settings") {
                        this.showScreen(
                            "settings-screen"
                        );
                    }

                    if (action === "credits") {
                        this.showScreen(
                            "credits-screen"
                        );
                    }

                    if (action === "back") {
                        this.showScreen(
                            "main-menu"
                        );
                    }

                    if (action === "exit") {
                        this.showMessage(
                            "SAÍDA SOLICITADA."
                        );
                    }
                }
            );
        });
    }

    bindSettings() {

        const button =
            document.getElementById(
                "audio-toggle"
            );

        button.addEventListener(
            "click",
            () => {

                this.audioEnabled =
                    !this.audioEnabled;

                this.audioSystem.setEnabled(
                    this.audioEnabled
                );

                this.game.musicSystem.setEnabled(
                    this.audioEnabled
                );

                button.textContent =
                    this.audioEnabled
                        ? "ÁUDIO: ATIVADO"
                        : "ÁUDIO: DESATIVADO";
            }
        );
    }

    bindRadio() {

        const button =
            document.getElementById(
                "radio-continue"
            );

        button.addEventListener(
            "click",
            () => {

                this.audioSystem.playConfirm();

                this.showScreen(
                    "game-screen"
                );

                this.game.beginGameplay();
            }
        );
    }

    showRadio(
        speaker,
        message,
        buttonText
    ) {

        document.querySelector(
            ".radio-speaker"
        ).textContent = speaker;

        document.getElementById(
            "radio-message"
        ).textContent = message;

        document.getElementById(
            "radio-continue"
        ).textContent = buttonText;

        this.showScreen(
            "radio-screen"
        );
    }

    updateObjective(text) {

        document.getElementById(
            "objective-text"
        ).textContent = text;
    }

    updateDetection(status) {

        document.getElementById(
            "detection-status"
        ).textContent = status;
    }

    bindGameOver() {

        document.getElementById(
            "restart-button"
        ).addEventListener(
            "click",
            () => {

                this.audioSystem.playConfirm();

                this.game.restartMission();
            }
        );

        document.getElementById(
            "menu-button"
        ).addEventListener(
            "click",
            () => {

                this.audioSystem.playCancel();

                this.game.returnToMenu();
            }
        );
    }

    showGameOver() {

        this.showScreen(
            "gameover-screen"
        );
    }

    showMessage(message) {

        console.info(message);
    }
}

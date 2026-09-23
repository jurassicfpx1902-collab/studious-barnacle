class RadioSystem {
    constructor() {
        this.messageIndex = 0;

        this.messages = [
            "— Prossiga até o ponto marcado e recupere o dispositivo de informação, e retorne até a área de extração.",
            "— Mantenha o canal seguro. Evite chamar atenção desnecessária.",
            "— Muito bem, aguarde para mais respostas."
        ];
    }

    start() {
        this.messageIndex = 0;

        audioSystem.playRadioConnect();

        this.showMessage();
    }

    showMessage() {
        const text = this.messages[this.messageIndex];

        uiManager.updateText(
            "radio-speaker",
            "KATHERINE"
        );

        uiManager.updateText(
            "radio-message",
            text
        );
    }

    next() {
        audioSystem.playRadioStatic();

        this.messageIndex++;

        if (this.messageIndex >= this.messages.length) {
            this.finish();
            return;
        }

        this.showMessage();
    }

    finish() {
        audioSystem.playRadioStatic();

        if (window.gameController) {
            gameController.startGameplay();
        }
    }
}

window.radioSystem = new RadioSystem();

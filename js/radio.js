export class RadioSystem {

    constructor(audioSystem) {

        this.audioSystem = audioSystem;

        this.messages = {
            start:
                "— Prossiga até o ponto marcado e recupere o dispositivo de informação, e retorne até a área de extração.",

            complete:
                "— Muito bem, aguarde para mais respostas."
        };

        this.currentMessage = "";
    }

    openStartCommunication(uiSystem) {

        this.currentMessage =
            this.messages.start;

        this.audioSystem.playRadio();

        uiSystem.showRadio(
            "KATHERINE",
            this.currentMessage,
            "CONTINUAR"
        );
    }

    openCompletionCommunication(uiSystem) {

        this.currentMessage =
            this.messages.complete;

        this.audioSystem.playRadio();

        uiSystem.showRadio(
            "KATHERINE",
            this.currentMessage,
            "CONTINUAR"
        );
    }
}

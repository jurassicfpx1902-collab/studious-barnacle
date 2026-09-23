class ExtractionSystem {
    constructor() {
        this.completed = false;
    }

    complete() {
        if (this.completed) return;

        this.completed = true;

        audioSystem.playExtraction();

        missionSystem.finish();

        setTimeout(() => {
            if (window.gameController) {
                gameController.showMissionComplete();
            }
        }, 700);
    }

    reset() {
        this.completed = false;
    }
}

window.extractionSystem = new ExtractionSystem();

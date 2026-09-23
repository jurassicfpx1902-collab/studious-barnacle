class MissionSystem {
    constructor() {
        this.active = false;
        this.objectiveCollected = false;
        this.completed = false;
    }

    start() {
        this.active = true;
        this.objectiveCollected = false;
        this.completed = false;

        player.reset(105, 300);

        gameMap.build();

        uiManager.setMissionText(
            "RECUPERE O DISPOSITIVO DE INFORMAÇÃO"
        );

        audioSystem.playMissionStart();
    }

    update() {
        if (!this.active) return;

        if (
            !this.objectiveCollected &&
            gameMap.isInsideZone(player, gameMap.objectiveZone)
        ) {
            this.collectObjective();
        }

        if (
            this.objectiveCollected &&
            gameMap.isInsideZone(player, gameMap.extractionZone)
        ) {
            extractionSystem.complete();
        }
    }

    collectObjective() {
        this.objectiveCollected = true;

        uiManager.setMissionText(
            "RETORNE À ÁREA DE EXTRAÇÃO"
        );

        uiManager.showSystemMessage(
            "DISPOSITIVO RECUPERADO"
        );

        audioSystem.playObjective();
    }

    finish() {
        this.active = false;
        this.completed = true;
    }
}

window.missionSystem = new MissionSystem();

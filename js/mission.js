export class MissionSystem {

    constructor(mapSystem) {

        this.mapSystem = mapSystem;

        this.state = "objective";

        this.objectiveCollected = false;
        this.completed = false;
    }

    update(player) {

        if (
            this.state === "objective" &&
            player.distanceTo(
                this.mapSystem.objective.x,
                this.mapSystem.objective.y
            ) < 30
        ) {

            this.objectiveCollected = true;
            this.state = "extraction";

            return "objective-collected";
        }

        if (
            this.state === "extraction" &&
            this.mapSystem.isInsideExtraction(
                player.x,
                player.y
            )
        ) {

            this.completed = true;
            this.state = "complete";

            return "mission-complete";
        }

        return null;
    }

    getObjectiveText() {

        if (this.state === "objective") {

            return "RECUPERE O DISPOSITIVO DE INFORMAÇÃO";
        }

        if (this.state === "extraction") {

            return "RETORNE À ÁREA DE EXTRAÇÃO";
        }

        return "MISSÃO CONCLUÍDA";
    }
}

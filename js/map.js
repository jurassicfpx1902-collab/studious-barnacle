class GameMap {
    constructor() {
        this.width = 800;
        this.height = 600;

        this.extractionZone = {
            x: 55,
            y: 245,
            width: 75,
            height: 110
        };

        this.objectiveZone = {
            x: 650,
            y: 220,
            width: 75,
            height: 90
        };
    }

    build() {
        collisionSystem.clear();

        collisionSystem.addObstacle(200, 120, 30, 300);
        collisionSystem.addObstacle(390, 260, 150, 30);
        collisionSystem.addObstacle(560, 100, 30, 250);
        collisionSystem.addObstacle(310, 480, 230, 25);
    }

    draw(ctx) {
        ctx.fillStyle = "#11161a";
        ctx.fillRect(0, 0, this.width, this.height);

        this.drawFloor(ctx);
        this.drawExtraction(ctx);
        this.drawObjective(ctx);
        collisionSystem.draw(ctx);
    }

    drawFloor(ctx) {
        ctx.strokeStyle = "rgba(90,110,120,0.15)";
        ctx.lineWidth = 1;

        for (let x = 0; x < this.width; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 60);
            ctx.lineTo(x, this.height);
            ctx.stroke();
        }

        for (let y = 60; y < this.height; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
            ctx.stroke();
        }
    }

    drawExtraction(ctx) {
        ctx.fillStyle = "rgba(50,180,100,0.20)";
        ctx.strokeStyle = "#53bd77";

        ctx.fillRect(
            this.extractionZone.x,
            this.extractionZone.y,
            this.extractionZone.width,
            this.extractionZone.height
        );

        ctx.strokeRect(
            this.extractionZone.x,
            this.extractionZone.y,
            this.extractionZone.width,
            this.extractionZone.height
        );
    }

    drawObjective(ctx) {
        ctx.fillStyle = "rgba(60,130,200,0.18)";
        ctx.strokeStyle = "#4d8fc4";

        ctx.fillRect(
            this.objectiveZone.x,
            this.objectiveZone.y,
            this.objectiveZone.width,
            this.objectiveZone.height
        );

        ctx.strokeRect(
            this.objectiveZone.x,
            this.objectiveZone.y,
            this.objectiveZone.width,
            this.objectiveZone.height
        );
    }

    isInsideZone(entity, zone) {
        return (
            entity.x > zone.x &&
            entity.x < zone.x + zone.width &&
            entity.y > zone.y &&
            entity.y < zone.y + zone.height
        );
    }
}

window.gameMap = new GameMap();

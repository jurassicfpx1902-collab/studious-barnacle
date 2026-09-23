class GameMap {

constructor() {

    this.width = 800;
    this.height = 600;

    this.extractionZone = {
        x: 45,
        y: 250,
        width: 95,
        height: 105
    };

    /*
     * Objective moved closer to the center
     * so it remains easier to see on mobile.
     */

    this.objectiveZone = {
        x: 555,
        y: 235,
        width: 90,
        height: 95
    };
}

build() {

    collisionSystem.clear();

    /*
     * AREA A
     * Starting area
     */

    collisionSystem.addObstacle(
        180,
        110,
        35,
        200
    );

    collisionSystem.addObstacle(
        180,
        390,
        35,
        100
    );


    /*
     * CENTRAL CORRIDOR
     */

    collisionSystem.addObstacle(
        330,
        180,
        35,
        220
    );


    /*
     * AREA B
     */

    collisionSystem.addObstacle(
        475,
        105,
        35,
        145
    );

    collisionSystem.addObstacle(
        475,
        370,
        35,
        130
    );


    /*
     * OBJECTIVE AREA
     */

    collisionSystem.addObstacle(
        670,
        120,
        35,
        120
    );

    collisionSystem.addObstacle(
        670,
        350,
        35,
        130
    );
}

draw(ctx) {

    ctx.fillStyle =
        "#11161a";

    ctx.fillRect(
        0,
        0,
        this.width,
        this.height
    );

    this.drawFloor(ctx);

    this.drawExtraction(ctx);

    this.drawObjective(ctx);

    collisionSystem.draw(ctx);
}

drawFloor(ctx) {

    ctx.strokeStyle =
        "rgba(90,110,120,0.12)";

    ctx.lineWidth = 1;


    for (
        let x = 0;
        x < this.width;
        x += 40
    ) {

        ctx.beginPath();

        ctx.moveTo(
            x,
            60
        );

        ctx.lineTo(
            x,
            this.height
        );

        ctx.stroke();
    }


    for (
        let y = 60;
        y < this.height;
        y += 40
    ) {

        ctx.beginPath();

        ctx.moveTo(
            0,
            y
        );

        ctx.lineTo(
            this.width,
            y
        );

        ctx.stroke();
    }
}

drawExtraction(ctx) {

    ctx.fillStyle =
        "rgba(55,170,105,0.16)";

    ctx.strokeStyle =
        "#53ad76";

    ctx.lineWidth = 2;

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

    ctx.fillStyle =
        "#6eb58b";

    ctx.font =
        "10px Arial";

    ctx.textAlign =
        "center";

    ctx.fillText(
        "EXTRAÇÃO",
        this.extractionZone.x +
        this.extractionZone.width / 2,
        this.extractionZone.y +
        this.extractionZone.height / 2
    );
}

drawObjective(ctx) {

    ctx.fillStyle =
        "rgba(65,130,180,0.16)";

    ctx.strokeStyle =
        "#518caf";

    ctx.lineWidth = 2;

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

    ctx.fillStyle =
        "#709bb2";

    ctx.font =
        "10px Arial";

    ctx.textAlign =
        "center";

    ctx.fillText(
        "OBJETIVO",
        this.objectiveZone.x +
        this.objectiveZone.width / 2,
        this.objectiveZone.y +
        this.objectiveZone.height / 2
    );
}

isInsideZone(entity, zone) {

    return (
        entity.x > zone.x &&
        entity.x <
            zone.x +
            zone.width &&

        entity.y > zone.y &&
        entity.y <
            zone.y +
            zone.height
    );
}

}

window.gameMap =
new GameMap();

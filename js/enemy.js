class Enemy {
constructor(x, y, patrolPoints = []) {

    this.x = x;
    this.y = y;

    this.width = 30;
    this.height = 46;

    this.speed = 55;

    this.state = "PATROL";

    this.patrolPoints =
        patrolPoints;

    this.currentPoint = 0;

    this.lastKnownX = x;
    this.lastKnownY = y;

    this.neutralized = false;

    this.alertTimer = 0;

    this.animationTime = 0;
    this.stepCycle = 0;

    this.directionX = 1;
}

update(delta) {

    if (this.neutralized) {
        return;
    }

    this.animationTime += delta;

    if (this.state === "PATROL") {
        this.followPatrol(delta);
    }

    if (this.state === "SEARCH") {
        this.moveToLastKnown(delta);
    }

    if (this.state === "ALERT") {

        this.alertTimer -= delta;

        if (this.alertTimer <= 0) {
            this.state = "SEARCH";
        }
    }
}

followPatrol(delta) {

    if (!this.patrolPoints.length) {
        return;
    }

    const target =
        this.patrolPoints[
            this.currentPoint
        ];

    const dx =
        target.x - this.x;

    const dy =
        target.y - this.y;

    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );

    if (distance < 6) {

        this.currentPoint =
            (this.currentPoint + 1) %
            this.patrolPoints.length;

        return;
    }

    this.x +=
        (dx / distance) *
        this.speed *
        delta;

    this.y +=
        (dy / distance) *
        this.speed *
        delta;

    if (Math.abs(dx) > 0.1) {
        this.directionX =
            Math.sign(dx);
    }

    this.stepCycle =
        Math.sin(
            this.animationTime * 8
        );
}

moveToLastKnown(delta) {

    const dx =
        this.lastKnownX - this.x;

    const dy =
        this.lastKnownY - this.y;

    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );

    if (distance < 6) {

        this.state = "PATROL";

        return;
    }

    this.x +=
        (dx / distance) *
        this.speed *
        delta;

    this.y +=
        (dy / distance) *
        this.speed *
        delta;

    if (Math.abs(dx) > 0.1) {
        this.directionX =
            Math.sign(dx);
    }
}

setAlert(x, y) {

    this.lastKnownX = x;
    this.lastKnownY = y;

    this.state = "ALERT";

    this.alertTimer = 2.5;

    audioSystem.playAlert();
}

neutralize() {

    this.neutralized = true;

    this.state = "NEUTRALIZED";

    audioSystem.playNeutralize();
}

draw(ctx) {

    ctx.save();

    ctx.translate(
        Math.round(this.x),
        Math.round(this.y)
    );

    if (this.directionX < 0) {
        ctx.scale(-1, 1);
    }

    const movement =
        this.state === "PATROL"
            ? this.stepCycle * 3
            : 0;


    /* LEGS */

    ctx.fillStyle = "#111418";

    ctx.fillRect(
        -9,
        17,
        7,
        20 + movement
    );

    ctx.fillRect(
        2,
        17,
        7,
        20 - movement
    );


    /* BOOTS */

    ctx.fillStyle = "#07090b";

    ctx.fillRect(
        -10,
        36 + movement,
        9,
        5
    );

    ctx.fillRect(
        2,
        36 - movement,
        9,
        5
    );


    /* TORSO */

    ctx.fillStyle =
        this.neutralized
            ? "#34383b"
            : "#181c20";

    ctx.fillRect(
        -12,
        -5,
        24,
        23
    );


    /* HEAVY VEST */

    ctx.fillStyle =
        this.neutralized
            ? "#3d4245"
            : "#2a3035";

    ctx.fillRect(
        -14,
        -3,
        28,
        16
    );


    /* EQUIPMENT */

    ctx.fillStyle = "#101418";

    ctx.fillRect(
        -11,
        2,
        5,
        8
    );

    ctx.fillRect(
        6,
        2,
        5,
        8
    );


    /* ARMS */

    ctx.fillStyle = "#161a1e";

    ctx.fillRect(
        -18,
        -2,
        6,
        19
    );

    ctx.fillRect(
        12,
        -2,
        6,
        19
    );


    /* NECK */

    ctx.fillStyle = "#1b2024";

    ctx.fillRect(
        -4,
        -10,
        8,
        6
    );


    /* HEAD */

    ctx.fillStyle = "#111418";

    ctx.fillRect(
        -9,
        -21,
        18,
        14
    );


    /* HELMET */

    ctx.fillStyle = "#080b0e";

    ctx.fillRect(
        -11,
        -24,
        22,
        6
    );

    ctx.fillRect(
        -8,
        -27,
        16,
        4
    );


    /* ALERT INDICATOR */

    if (this.state === "ALERT") {

        ctx.fillStyle = "#b85a60";

        ctx.font =
            "bold 15px Arial";

        ctx.textAlign = "center";

        ctx.fillText(
            "!",
            0,
            -32
        );
    }

    ctx.restore();
}

getBounds() {

    return {
        x: this.x - this.width / 2,
        y: this.y - this.height / 2,
        width: this.width,
        height: this.height
    };
}

}

window.Enemy = Enemy;

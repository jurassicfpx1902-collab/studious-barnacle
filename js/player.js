class Player {
constructor() {
this.x = 105;
this.y = 300;

    this.width = 24;
    this.height = 44;

    this.speed = 125;

    this.directionX = 1;
    this.directionY = 0;

    this.running = false;

    this.animationTime = 0;
    this.stepCycle = 0;

    this.neutralizing = false;
}

reset(x, y) {
    this.x = x;
    this.y = y;

    this.directionX = 1;
    this.directionY = 0;

    this.running = false;

    this.animationTime = 0;
    this.stepCycle = 0;

    this.neutralizing = false;
}

update(input, delta) {

    let dx = input.x;
    let dy = input.y;

    const magnitude =
        Math.sqrt(dx * dx + dy * dy);

    if (magnitude > 1) {
        dx /= magnitude;
        dy /= magnitude;
    }

    const moving =
        magnitude > 0.08;

    this.running =
        magnitude > 0.65;

    if (moving) {

        const speed =
            this.running
                ? this.speed * 1.35
                : this.speed;

        this.x +=
            dx * speed * delta;

        this.y +=
            dy * speed * delta;

        if (Math.abs(dx) > 0.1) {
            this.directionX =
                Math.sign(dx);
        }

        if (Math.abs(dy) > 0.1) {
            this.directionY =
                Math.sign(dy);
        }

        this.animationTime += delta;

        this.stepCycle =
            Math.sin(
                this.animationTime *
                (this.running ? 13 : 9)
            );

    } else {

        this.animationTime += delta * 0.5;

        this.stepCycle =
            Math.sin(
                this.animationTime * 2
            ) * 0.15;
    }

    this.x =
        Math.max(
            25,
            Math.min(
                775,
                this.x
            )
        );

    this.y =
        Math.max(
            85,
            Math.min(
                565,
                this.y
            )
        );
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

    const walking =
        Math.abs(this.stepCycle) > 0.1;

    const legOffset =
        walking
            ? this.stepCycle * 4
            : 0;

    const armOffset =
        walking
            ? -this.stepCycle * 3
            : 0;


    /* BODY */

    ctx.fillStyle = "#151a1f";

    ctx.fillRect(
        -9,
        -4,
        18,
        23
    );


    /* VEST / EQUIPMENT */

    ctx.fillStyle = "#242b30";

    ctx.fillRect(
        -8,
        -2,
        16,
        13
    );

    ctx.fillStyle = "#30383d";

    ctx.fillRect(
        -5,
        1,
        10,
        3
    );


    /* NECK */

    ctx.fillStyle = "#b98f76";

    ctx.fillRect(
        -3,
        -10,
        6,
        7
    );


    /* HEAD */

    ctx.fillStyle = "#d2ae91";

    ctx.fillRect(
        -7,
        -23,
        14,
        14
    );


    /* HAIR */

    ctx.fillStyle = "#c7ad67";

    ctx.fillRect(
        -7,
        -25,
        14,
        6
    );

    ctx.fillRect(
        -8,
        -22,
        3,
        5
    );


    /* ARMS */

    ctx.fillStyle = "#151a1f";

    ctx.save();

    ctx.translate(
        -11,
        -1
    );

    ctx.rotate(
        armOffset * 0.035
    );

    ctx.fillRect(
        -3,
        0,
        6,
        18
    );

    ctx.fillStyle = "#c19b82";

    ctx.fillRect(
        -3,
        17,
        6,
        5
    );

    ctx.restore();


    ctx.save();

    ctx.translate(
        11,
        -1
    );

    ctx.rotate(
        -armOffset * 0.035
    );

    ctx.fillStyle = "#151a1f";

    ctx.fillRect(
        -3,
        0,
        6,
        18
    );

    ctx.fillStyle = "#c19b82";

    ctx.fillRect(
        -3,
        17,
        6,
        5
    );

    ctx.restore();


    /* LEGS */

    ctx.fillStyle = "#11161a";

    ctx.fillRect(
        -7,
        18,
        6,
        19 + legOffset
    );

    ctx.fillRect(
        1,
        18,
        6,
        19 - legOffset
    );


    /* BOOTS */

    ctx.fillStyle = "#080b0e";

    ctx.fillRect(
        -8,
        35 + legOffset,
        8,
        5
    );

    ctx.fillRect(
        1,
        35 - legOffset,
        8,
        5
    );


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

window.player = new Player();

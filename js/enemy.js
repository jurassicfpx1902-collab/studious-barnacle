class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.width = 25;
        this.height = 45;

        this.speed = 0.75;

        this.directionX = 0;
        this.directionY = 1;

        this.state = "patrol";
    }

    update(targetX, targetY) {
        if (this.state !== "patrol") {
            return;
        }

        const dx =
            targetX - this.x;

        const dy =
            targetY - this.y;

        const distance =
            Math.hypot(dx, dy);

        if (
            distance > 80 &&
            distance < 180
        ) {
            this.directionX =
                dx / distance;

            this.directionY =
                dy / distance;

            this.x +=
                this.directionX *
                this.speed;

            this.y +=
                this.directionY *
                this.speed;
        }
    }

    draw(ctx) {
        ctx.save();

        ctx.translate(
            this.x,
            this.y
        );

        // Shadow
        ctx.fillStyle =
            "rgba(0, 0, 0, 0.45)";

        ctx.beginPath();

        ctx.ellipse(
            0,
            23,
            15,
            5,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Legs
        ctx.fillStyle = "#121619";

        ctx.fillRect(
            -10,
            8,
            8,
            17
        );

        ctx.fillRect(
            2,
            8,
            8,
            17
        );

        // Boots
        ctx.fillStyle = "#07090a";

        ctx.fillRect(
            -11,
            21,
            10,
            5
        );

        ctx.fillRect(
            1,
            21,
            11,
            5
        );

        // Hips
        ctx.fillStyle = "#252b2f";

        ctx.fillRect(
            -11,
            4,
            22,
            9
        );

        // Heavy torso
        ctx.fillStyle = "#181d21";

        ctx.beginPath();

        ctx.moveTo(-11, -12);
        ctx.lineTo(11, -12);
        ctx.lineTo(13, 5);
        ctx.lineTo(-13, 5);

        ctx.closePath();

        ctx.fill();

        // Vest
        ctx.fillStyle = "#30373b";

        ctx.fillRect(
            -10,
            -8,
            20,
            13
        );

        // Side equipment
        ctx.fillStyle = "#0c1013";

        ctx.fillRect(
            -14,
            -3,
            4,
            11
        );

        ctx.fillRect(
            10,
            -3,
            4,
            11
        );

        // Shoulders
        ctx.fillStyle = "#1b2024";

        ctx.beginPath();

        ctx.arc(
            -12,
            -8,
            5,
            0,
            Math.PI * 2
        );

        ctx.arc(
            12,
            -8,
            5,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Arms
        ctx.fillRect(
            -15,
            -5,
            6,
            16
        );

        ctx.fillRect(
            9,
            -5,
            6,
            16
        );

        // Gloves
        ctx.fillStyle = "#080b0d";

        ctx.beginPath();

        ctx.arc(
            -12,
            12,
            3,
            0,
            Math.PI * 2
        );

        ctx.arc(
            12,
            12,
            3,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Neck
        ctx.fillStyle = "#101416";

        ctx.fillRect(
            -4,
            -16,
            8,
            5
        );

        // Head
        ctx.fillStyle = "#111518";

        ctx.beginPath();

        ctx.ellipse(
            0,
            -21,
            8,
            8,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Helmet
        ctx.fillStyle = "#252c30";

        ctx.beginPath();

        ctx.arc(
            0,
            -23,
            9,
            Math.PI,
            Math.PI * 2
        );

        ctx.fill();

        // Dark visor
        ctx.fillStyle = "#050708";

        ctx.fillRect(
            -7,
            -21,
            14,
            4
        );

        // Back equipment
        ctx.fillStyle = "#0a0d0f";

        ctx.fillRect(
            -14,
            -7,
            4,
            15
        );

        ctx.fillRect(
            10,
            -7,
            4,
            15
        );

        ctx.restore();
    }
}

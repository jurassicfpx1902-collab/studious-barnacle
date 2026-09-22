class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.width = 22;
        this.height = 42;

        this.speed = 2.2;

        this.directionX = 0;
        this.directionY = 1;

        this.isMoving = false;
    }

    update(input) {
        this.directionX = input.x;
        this.directionY = input.y;

        const length = Math.hypot(
            this.directionX,
            this.directionY
        );

        if (length > 0) {
            const normalizedX =
                this.directionX / length;

            const normalizedY =
                this.directionY / length;

            this.x += normalizedX * this.speed;
            this.y += normalizedY * this.speed;

            this.isMoving = true;
        } else {
            this.isMoving = false;
        }
    }

    draw(ctx) {
        ctx.save();

        ctx.translate(
            this.x,
            this.y
        );

        const moving =
            this.isMoving ? 1 : 0;

        // Shadow
        ctx.fillStyle =
            "rgba(0, 0, 0, 0.35)";

        ctx.beginPath();

        ctx.ellipse(
            0,
            21,
            13,
            4,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Legs
        ctx.fillStyle = "#15191d";

        ctx.fillRect(
            -9,
            8,
            7,
            15
        );

        ctx.fillRect(
            2,
            8,
            7,
            15
        );

        // Boots
        ctx.fillStyle = "#090b0d";

        ctx.fillRect(
            -10,
            20,
            9,
            5
        );

        ctx.fillRect(
            1,
            20,
            10,
            5
        );

        // Hips
        ctx.fillStyle = "#20252a";

        ctx.fillRect(
            -9,
            4,
            18,
            8
        );

        // Torso
        ctx.beginPath();

        ctx.moveTo(-8, -11);
        ctx.lineTo(8, -11);
        ctx.lineTo(10, 5);
        ctx.lineTo(-10, 5);

        ctx.closePath();

        ctx.fillStyle = "#11161a";
        ctx.fill();

        // Vest / equipment
        ctx.fillStyle = "#252b30";

        ctx.fillRect(
            -7,
            -7,
            14,
            9
        );

        // Center detail
        ctx.fillStyle = "#080a0c";

        ctx.fillRect(
            -2,
            -6,
            4,
            7
        );

        // Shoulders
        ctx.fillStyle = "#171c20";

        ctx.beginPath();

        ctx.arc(
            -9,
            -8,
            4,
            0,
            Math.PI * 2
        );

        ctx.arc(
            9,
            -8,
            4,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Arms
        ctx.fillRect(
            -12,
            -5,
            6,
            13
        );

        ctx.fillRect(
            6,
            -5,
            6,
            13
        );

        // Hands
        ctx.fillStyle = "#c7a88c";

        ctx.beginPath();

        ctx.arc(
            -9,
            9,
            2.5,
            0,
            Math.PI * 2
        );

        ctx.arc(
            9,
            9,
            2.5,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Neck
        ctx.fillStyle = "#b8957a";

        ctx.fillRect(
            -3,
            -14,
            6,
            5
        );

        // Head
        ctx.fillStyle = "#d0ad90";

        ctx.beginPath();

        ctx.ellipse(
            0,
            -19,
            7,
            8,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Blonde hair
        ctx.fillStyle = "#c8ad67";

        ctx.beginPath();

        ctx.arc(
            0,
            -22,
            7,
            Math.PI,
            Math.PI * 2
        );

        ctx.fill();

        ctx.fillRect(
            -7,
            -22,
            14,
            4
        );

        // Face direction
        ctx.fillStyle = "#6e5548";

        const eyeX =
            this.directionX > 0
                ? 3
                : this.directionX < 0
                    ? -3
                    : 0;

        ctx.fillRect(
            eyeX,
            -19,
            1.5,
            1.5
        );

        // Back equipment
        ctx.fillStyle = "#0a0d10";

        ctx.fillRect(
            -11,
            -7,
            3,
            13
        );

        ctx.fillRect(
            8,
            -7,
            3,
            13
        );

        // Movement detail
        if (moving) {
            ctx.globalAlpha = 0.35;

            ctx.fillStyle = "#3d5663";

            ctx.fillRect(
                -13,
                12,
                2,
                5
            );

            ctx.fillRect(
                11,
                12,
                2,
                5
            );
        }

        ctx.restore();
    }
}

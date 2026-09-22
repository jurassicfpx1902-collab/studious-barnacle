export class Player {

    constructor(collisionSystem) {

        this.collisionSystem = collisionSystem;

        this.x = 100;
        this.y = 440;

        this.radius = 13;

        this.speed = 145;

        this.directionX = 1;
        this.directionY = 0;

        this.active = true;
    }

    setDirection(x, y) {

        const length =
            Math.hypot(x, y);

        if (length < 0.05) {

            this.directionX = 0;
            this.directionY = 0;

            return;
        }

        this.directionX = x / length;
        this.directionY = y / length;
    }

    update(deltaTime) {

        if (!this.active) {
            return;
        }

        const movementX =
            this.directionX *
            this.speed *
            deltaTime;

        const movementY =
            this.directionY *
            this.speed *
            deltaTime;

        this.collisionSystem.moveEntity(
            this,
            movementX,
            movementY
        );
    }

    distanceTo(x, y) {

        return Math.hypot(
            this.x - x,
            this.y - y
        );
    }

    draw(context) {

        context.save();

        context.translate(
            this.x,
            this.y
        );

        context.rotate(
            Math.atan2(
                this.directionY,
                this.directionX
            )
        );

        /*
         * Stylized human silhouette.
         */

        context.fillStyle = "#c7a77b";

        context.fillRect(
            5,
            -6,
            9,
            12
        );

        context.fillStyle = "#18212a";

        context.fillRect(
            -8,
            -10,
            15,
            20
        );

        context.fillRect(
            -11,
            -8,
            5,
            15
        );

        context.fillRect(
            7,
            -7,
            5,
            14
        );

        context.fillRect(
            -6,
            9,
            5,
            9
        );

        context.fillRect(
            3,
            9,
            5,
            9
        );

        context.fillStyle = "#0b1015";

        context.fillRect(
            -8,
            16,
            7,
            3
        );

        context.fillRect(
            3,
            16,
            7,
            3
        );

        context.restore();
    }
}

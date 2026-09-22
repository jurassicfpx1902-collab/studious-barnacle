export class Enemy {

    constructor(
        collisionSystem,
        navigationSystem,
        player
    ) {

        this.collisionSystem =
            collisionSystem;

        this.navigationSystem =
            navigationSystem;

        this.player = player;

        this.x = 590;
        this.y = 100;

        this.radius = 15;

        this.speed = 58;

        this.directionX = 1;
        this.directionY = 0;

        this.patrolPoints = [
            { x: 590, y: 100 },
            { x: 780, y: 100 },
            { x: 780, y: 150 },
            { x: 590, y: 150 }
        ];

        this.currentPatrolPoint = 0;

        this.detectedPlayer = false;
    }

    update(deltaTime) {

        if (this.detectedPlayer) {
            return;
        }

        const target =
            this.patrolPoints[
                this.currentPatrolPoint
            ];

        const dx = target.x - this.x;
        const dy = target.y - this.y;

        const distance =
            Math.hypot(dx, dy);

        if (distance < 8) {

            this.currentPatrolPoint =
                (
                    this.currentPatrolPoint + 1
                ) %
                this.patrolPoints.length;

            return;
        }

        this.directionX = dx / distance;
        this.directionY = dy / distance;

        this.collisionSystem.moveEntity(
            this,
            this.directionX *
                this.speed *
                deltaTime,
            this.directionY *
                this.speed *
                deltaTime
        );
    }

    stop() {

        this.detectedPlayer = true;
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
         * Heavy stylized enemy silhouette.
         */

        context.fillStyle = "#11161b";

        context.fillRect(
            -9,
            -11,
            18,
            22
        );

        context.fillRect(
            -13,
            -8,
            5,
            17
        );

        context.fillRect(
            8,
            -8,
            5,
            17
        );

        context.fillRect(
            -7,
            9,
            6,
            10
        );

        context.fillRect(
            2,
            9,
            6,
            10
        );

        context.fillStyle = "#070a0d";

        context.fillRect(
            1,
            -12,
            12,
            7
        );

        context.fillStyle = "#596875";

        context.fillRect(
            4,
            -10,
            7,
            3
        );

        context.strokeStyle =
            "rgba(110, 130, 145, 0.4)";

        context.strokeRect(
            -9,
            -11,
            18,
            22
        );

        context.restore();
    }
}

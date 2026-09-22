export class VisionSystem {

    constructor(collisionSystem) {

        this.collisionSystem =
            collisionSystem;

        this.range = 210;

        this.angle =
            Math.PI / 2.8;
    }

    canDetect(enemy, player) {

        const dx =
            player.x - enemy.x;

        const dy =
            player.y - enemy.y;

        const distance =
            Math.hypot(dx, dy);

        if (distance > this.range) {
            return false;
        }

        const playerAngle =
            Math.atan2(dy, dx);

        const enemyAngle =
            Math.atan2(
                enemy.directionY,
                enemy.directionX
            );

        let difference =
            playerAngle - enemyAngle;

        while (difference > Math.PI) {
            difference -= Math.PI * 2;
        }

        while (difference < -Math.PI) {
            difference += Math.PI * 2;
        }

        if (
            Math.abs(difference) >
            this.angle / 2
        ) {
            return false;
        }

        return this.collisionSystem.hasLineOfSight(
            enemy.x,
            enemy.y,
            player.x,
            player.y
        );
    }

    draw(context, enemy) {

        context.save();

        context.translate(
            enemy.x,
            enemy.y
        );

        const angle =
            Math.atan2(
                enemy.directionY,
                enemy.directionX
            );

        context.rotate(angle);

        context.beginPath();

        context.moveTo(0, 0);

        context.arc(
            0,
            0,
            this.range,
            -this.angle / 2,
            this.angle / 2
        );

        context.closePath();

        context.fillStyle =
            "rgba(180, 45, 45, 0.12)";

        context.fill();

        context.strokeStyle =
            "rgba(190, 55, 55, 0.22)";

        context.stroke();

        context.restore();
    }
}

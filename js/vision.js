class VisionSystem {
    constructor() {
        this.maxDistance = 130;
        this.fov = Math.PI * 0.55;
    }

    canSee(enemy, target) {
        const dx = target.x - enemy.x;
        const dy = target.y - enemy.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > this.maxDistance) {
            return false;
        }

        const directionToTarget = Math.atan2(dy, dx);

        const enemyDirection = enemy.patrolPoints.length
            ? Math.atan2(
                enemy.patrolPoints[enemy.currentPoint].y - enemy.y,
                enemy.patrolPoints[enemy.currentPoint].x - enemy.x
            )
            : 0;

        let angleDifference =
            Math.abs(directionToTarget - enemyDirection);

        if (angleDifference > Math.PI) {
            angleDifference = Math.PI * 2 - angleDifference;
        }

        return angleDifference <= this.fov / 2;
    }

    drawVision(ctx, enemy) {
        if (enemy.neutralized) return;

        const direction = enemy.patrolPoints.length
            ? Math.atan2(
                enemy.patrolPoints[enemy.currentPoint].y - enemy.y,
                enemy.patrolPoints[enemy.currentPoint].x - enemy.x
            )
            : 0;

        ctx.save();

        ctx.globalAlpha = 0.10;
        ctx.fillStyle = "#d44";

        ctx.beginPath();

        ctx.moveTo(enemy.x, enemy.y);

        ctx.arc(
            enemy.x,
            enemy.y,
            this.maxDistance,
            direction - this.fov / 2,
            direction + this.fov / 2
        );

        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}

window.visionSystem = new VisionSystem();

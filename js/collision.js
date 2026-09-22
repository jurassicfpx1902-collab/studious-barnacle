export class CollisionSystem {

    constructor(mapSystem) {
        this.mapSystem = mapSystem;
    }

    circleIntersectsRect(
        x,
        y,
        radius,
        rectangle
    ) {

        const closestX = Math.max(
            rectangle.x,
            Math.min(x, rectangle.x + rectangle.width)
        );

        const closestY = Math.max(
            rectangle.y,
            Math.min(y, rectangle.y + rectangle.height)
        );

        const dx = x - closestX;
        const dy = y - closestY;

        return (
            dx * dx +
            dy * dy <
            radius * radius
        );
    }

    canMove(x, y, radius) {

        const walls = this.mapSystem.getCollisionRects();

        for (const wall of walls) {

            if (
                this.circleIntersectsRect(
                    x,
                    y,
                    radius,
                    wall
                )
            ) {
                return false;
            }
        }

        return true;
    }

    moveEntity(entity, deltaX, deltaY) {

        const nextX = entity.x + deltaX;

        if (
            this.canMove(
                nextX,
                entity.y,
                entity.radius
            )
        ) {
            entity.x = nextX;
        }

        const nextY = entity.y + deltaY;

        if (
            this.canMove(
                entity.x,
                nextY,
                entity.radius
            )
        ) {
            entity.y = nextY;
        }
    }

    lineIntersectsRect(
        x1,
        y1,
        x2,
        y2,
        rect
    ) {

        const steps = 30;

        for (let i = 0; i <= steps; i++) {

            const t = i / steps;

            const x = x1 + (x2 - x1) * t;
            const y = y1 + (y2 - y1) * t;

            if (
                x >= rect.x &&
                x <= rect.x + rect.width &&
                y >= rect.y &&
                y <= rect.y + rect.height
            ) {
                return true;
            }
        }

        return false;
    }

    hasLineOfSight(
        startX,
        startY,
        endX,
        endY
    ) {

        const walls =
            this.mapSystem.getCollisionRects();

        for (const wall of walls) {

            if (
                this.lineIntersectsRect(
                    startX,
                    startY,
                    endX,
                    endY,
                    wall
                )
            ) {
                return false;
            }
        }

        return true;
    }
}

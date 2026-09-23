class CollisionSystem {
    constructor() {
        this.obstacles = [];
    }

    addObstacle(x, y, width, height) {
        this.obstacles.push({
            x,
            y,
            width,
            height
        });
    }

    clear() {
        this.obstacles = [];
    }

    intersects(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    isBlocked(bounds) {
        return this.obstacles.some(obstacle =>
            this.intersects(bounds, obstacle)
        );
    }

    keepPlayerInside() {
        const bounds = player.getBounds();

        for (const obstacle of this.obstacles) {
            if (this.intersects(bounds, obstacle)) {
                player.x -= player.directionX * 4;
                player.y -= player.directionY * 4;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = "#252b30";

        for (const obstacle of this.obstacles) {
            ctx.fillRect(
                obstacle.x,
                obstacle.y,
                obstacle.width,
                obstacle.height
            );
        }
    }
}

window.collisionSystem = new CollisionSystem();

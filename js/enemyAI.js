class EnemyAI {
    constructor(enemies) {
        this.enemies = enemies;
    }

    update(delta) {
        for (const enemy of this.enemies) {
            enemy.update(delta);

            if (enemy.neutralized) continue;

            const distance = this.getDistance(
                enemy.x,
                enemy.y,
                player.x,
                player.y
            );

            if (distance < 115 && visionSystem.canSee(enemy, player)) {
                enemy.setAlert(player.x, player.y);
            }
        }
    }

    getDistance(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;

        return Math.sqrt(dx * dx + dy * dy);
    }
}

window.EnemyAI = EnemyAI;

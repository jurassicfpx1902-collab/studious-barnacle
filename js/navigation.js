export class NavigationSystem {

    constructor(mapSystem) {
        this.mapSystem = mapSystem;
    }

    getNextPoint(enemy, targetPoint) {

        const walls =
            this.mapSystem.getCollisionRects();

        let blocked = false;

        for (const wall of walls) {

            if (
                targetPoint.x >= wall.x &&
                targetPoint.x <= wall.x + wall.width &&
                targetPoint.y >= wall.y &&
                targetPoint.y <= wall.y + wall.height
            ) {
                blocked = true;
                break;
            }
        }

        if (blocked) {
            return null;
        }

        return targetPoint;
    }
}

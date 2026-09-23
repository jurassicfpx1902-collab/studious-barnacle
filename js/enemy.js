class Enemy {
    constructor(x, y, patrolPoints = []) {
        this.x = x;
        this.y = y;

        this.width = 28;
        this.height = 42;

        this.speed = 65;

        this.state = "PATROL";
        this.patrolPoints = patrolPoints;
        this.currentPoint = 0;

        this.lastKnownX = x;
        this.lastKnownY = y;

        this.neutralized = false;
        this.alertTimer = 0;
    }

    update(delta) {
        if (this.neutralized) return;

        if (this.state === "PATROL") {
            this.followPatrol(delta);
        }

        if (this.state === "SEARCH") {
            this.moveToLastKnown(delta);
        }

        if (this.state === "ALERT") {
            this.alertTimer -= delta;

            if (this.alertTimer <= 0) {
                this.state = "SEARCH";
            }
        }
    }

    followPatrol(delta) {
        if (!this.patrolPoints.length) return;

        const target = this.patrolPoints[this.currentPoint];

        const dx = target.x - this.x;
        const dy = target.y - this.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 5) {
            this.currentPoint =
                (this.currentPoint + 1) % this.patrolPoints.length;

            return;
        }

        this.x += (dx / distance) * this.speed * delta;
        this.y += (dy / distance) * this.speed * delta;
    }

    moveToLastKnown(delta) {
        const dx = this.lastKnownX - this.x;
        const dy = this.lastKnownY - this.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 5) {
            this.state = "PATROL";
            return;
        }

        this.x += (dx / distance) * this.speed * delta;
        this.y += (dy / distance) * this.speed * delta;
    }

    setAlert(x, y) {
        this.lastKnownX = x;
        this.lastKnownY = y;
        this.state = "ALERT";
        this.alertTimer = 2.5;

        audioSystem.playAlert();
    }

    neutralize() {
        this.neutralized = true;
        this.state = "NEUTRALIZED";

        audioSystem.playNeutralize();
    }

    draw(ctx) {
        ctx.save();

        ctx.translate(this.x, this.y);

        ctx.fillStyle = this.neutralized
            ? "#34383d"
            : "#171a1e";

        // Torso
        ctx.fillRect(-11, -5, 22, 22);

        // Heavy vest
        ctx.fillStyle = "#282d32";
        ctx.fillRect(-13, -3, 26, 15);

        // Head
        ctx.fillStyle = "#101317";
        ctx.fillRect(-8, -20, 16, 14);

        // Helmet
        ctx.fillStyle = "#090b0e";
        ctx.fillRect(-10, -22, 20, 6);

        // Arms
        ctx.fillStyle = "#15181c";
        ctx.fillRect(-17, -3, 6, 17);
        ctx.fillRect(11, -3, 6, 17);

        // Legs
        ctx.fillRect(-9, 17, 7, 19);
        ctx.fillRect(2, 17, 7, 19);

        ctx.restore();
    }

    getBounds() {
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2,
            width: this.width,
            height: this.height
        };
    }
}

window.Enemy = Enemy;

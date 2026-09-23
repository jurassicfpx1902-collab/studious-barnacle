class Player {
    constructor() {
        this.x = 100;
        this.y = 300;

        this.width = 22;
        this.height = 38;

        this.speed = 145;
        this.running = false;

        this.directionX = 1;
        this.directionY = 0;

        this.hidden = false;
        this.neutralizing = false;
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
        this.directionX = 1;
        this.directionY = 0;
        this.hidden = false;
        this.neutralizing = false;
    }

    update(input, delta) {
        let dx = input.x;
        let dy = input.y;

        const magnitude = Math.sqrt(dx * dx + dy * dy);

        if (magnitude > 1) {
            dx /= magnitude;
            dy /= magnitude;
        }

        this.running = magnitude > 0.65;

        const currentSpeed = this.running
            ? this.speed * 1.25
            : this.speed;

        this.x += dx * currentSpeed * delta;
        this.y += dy * currentSpeed * delta;

        if (Math.abs(dx) > 0.1) {
            this.directionX = Math.sign(dx);
        }

        if (Math.abs(dy) > 0.1) {
            this.directionY = Math.sign(dy);
        }

        this.x = Math.max(20, Math.min(780, this.x));
        this.y = Math.max(70, Math.min(550, this.y));
    }

    draw(ctx) {
        ctx.save();

        ctx.translate(this.x, this.y);

        if (this.directionX < 0) {
            ctx.scale(-1, 1);
        }

        // Body
        ctx.fillStyle = "#11151a";
        ctx.fillRect(-8, -5, 16, 21);

        // Head
        ctx.fillStyle = "#d4b39a";
        ctx.fillRect(-6, -18, 12, 12);

        // Hair
        ctx.fillStyle = "#c7b26d";
        ctx.fillRect(-6, -19, 12, 5);

        // Arms
        ctx.fillStyle = "#171c21";
        ctx.fillRect(-13, -3, 5, 15);
        ctx.fillRect(8, -3, 5, 15);

        // Legs
        ctx.fillRect(-7, 16, 6, 17);
        ctx.fillRect(1, 16, 6, 17);

        // Boots
        ctx.fillStyle = "#090b0d";
        ctx.fillRect(-8, 31, 7, 5);
        ctx.fillRect(1, 31, 8, 5);

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

window.player = new Player();

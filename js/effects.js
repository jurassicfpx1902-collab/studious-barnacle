class EffectsSystem {
    constructor() {
        this.glitchTimer = 0;
        this.flashTimer = 0;
    }

    update(delta) {
        this.glitchTimer -= delta;
        this.flashTimer -= delta;
    }

    triggerGlitch(duration = 0.15) {
        this.glitchTimer = duration;
    }

    triggerFlash(duration = 0.08) {
        this.flashTimer = duration;
    }

    draw(ctx, width, height) {
        if (this.glitchTimer > 0) {
            ctx.save();

            ctx.globalAlpha = 0.08;
            ctx.fillStyle = "#527fa0";

            for (let y = 70; y < height; y += 8) {
                ctx.fillRect(
                    Math.random() * 8,
                    y,
                    width,
                    1
                );
            }

            ctx.restore();
        }

        if (this.flashTimer > 0) {
            ctx.save();

            ctx.globalAlpha = 0.08;
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, width, height);

            ctx.restore();
        }
    }
}

window.effectsSystem = new EffectsSystem();

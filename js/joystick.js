class Joystick {
    constructor() {
        this.element = document.getElementById("joystick");
        this.knob = document.getElementById("joystick-knob");

        this.x = 0;
        this.y = 0;

        this.active = false;
        this.pointerId = null;

        this.setup();
    }

    setup() {
        if (!this.element) return;

        this.element.addEventListener(
            "pointerdown",
            event => this.start(event)
        );

        window.addEventListener(
            "pointermove",
            event => this.move(event)
        );

        window.addEventListener(
            "pointerup",
            event => this.end(event)
        );
    }

    start(event) {
        this.active = true;
        this.pointerId = event.pointerId;

        this.element.setPointerCapture?.(event.pointerId);

        this.move(event);
    }

    move(event) {
        if (!this.active) return;

        const rect = this.element.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let dx = event.clientX - centerX;
        let dy = event.clientY - centerY;

        const radius = rect.width / 2;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > radius) {
            dx = (dx / distance) * radius;
            dy = (dy / distance) * radius;
        }

        this.x = dx / radius;
        this.y = dy / radius;

        if (this.knob) {
            this.knob.style.transform =
                `translate(${dx}px, ${dy}px)`;
        }
    }

    end(event) {
        if (!this.active) return;

        if (
            this.pointerId !== null &&
            event.pointerId !== this.pointerId
        ) {
            return;
        }

        this.active = false;
        this.pointerId = null;

        this.x = 0;
        this.y = 0;

        if (this.knob) {
            this.knob.style.transform = "translate(0, 0)";
        }
    }

    getInput() {
        return {
            x: this.x,
            y: this.y
        };
    }
}

window.joystick = new Joystick();

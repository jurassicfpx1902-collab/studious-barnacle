export class Joystick {

    constructor(zoneElement, stickElement) {

        this.zone = zoneElement;
        this.stick = stickElement;

        this.active = false;

        this.x = 0;
        this.y = 0;

        this.maxDistance = 38;

        this.bindEvents();
    }

    bindEvents() {

        this.zone.addEventListener(
            "pointerdown",
            (event) => {

                event.preventDefault();

                this.active = true;

                this.zone.setPointerCapture(
                    event.pointerId
                );

                this.updatePosition(event);
            }
        );

        this.zone.addEventListener(
            "pointermove",
            (event) => {

                if (!this.active) {
                    return;
                }

                event.preventDefault();

                this.updatePosition(event);
            }
        );

        this.zone.addEventListener(
            "pointerup",
            (event) => {

                event.preventDefault();

                this.reset();
            }
        );

        this.zone.addEventListener(
            "pointercancel",
            () => {

                this.reset();
            }
        );
    }

    updatePosition(event) {

        const rect =
            this.zone.getBoundingClientRect();

        const centerX =
            rect.left + rect.width / 2;

        const centerY =
            rect.top + rect.height / 2;

        let deltaX =
            event.clientX - centerX;

        let deltaY =
            event.clientY - centerY;

        const distance =
            Math.hypot(
                deltaX,
                deltaY
            );

        if (
            distance >
            this.maxDistance
        ) {

            const ratio =
                this.maxDistance / distance;

            deltaX *= ratio;
            deltaY *= ratio;
        }

        this.x =
            deltaX / this.maxDistance;

        this.y =
            deltaY / this.maxDistance;

        this.stick.style.transform =
            `translate(${deltaX}px, ${deltaY}px)`;
    }

    reset() {

        this.active = false;

        this.x = 0;
        this.y = 0;

        this.stick.style.transform =
            "translate(0px, 0px)";
    }

    getDirection() {

        return {
            x: this.x,
            y: this.y
        };
    }
}

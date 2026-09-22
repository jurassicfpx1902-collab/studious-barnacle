export class MapSystem {

    constructor() {

        this.width = 960;
        this.height = 540;

        this.walls = [
            {
                x: 0,
                y: 0,
                width: 960,
                height: 18
            },
            {
                x: 0,
                y: 522,
                width: 960,
                height: 18
            },
            {
                x: 0,
                y: 0,
                width: 18,
                height: 540
            },
            {
                x: 942,
                y: 0,
                width: 18,
                height: 540
            },

            {
                x: 260,
                y: 18,
                width: 18,
                height: 150
            },
            {
                x: 260,
                y: 260,
                width: 18,
                height: 180
            },

            {
                x: 500,
                y: 18,
                width: 18,
                height: 130
            },
            {
                x: 500,
                y: 250,
                width: 18,
                height: 272
            },

            {
                x: 680,
                y: 180,
                width: 150,
                height: 18
            }
        ];

        this.objects = [
            {
                x: 150,
                y: 100,
                width: 42,
                height: 42
            },
            {
                x: 390,
                y: 70,
                width: 46,
                height: 36
            },
            {
                x: 730,
                y: 360,
                width: 40,
                height: 40
            }
        ];

        this.objective = {
            x: 820,
            y: 110,
            radius: 18
        };

        this.extraction = {
            x: 850,
            y: 470,
            width: 55,
            height: 35
        };
    }

    getCollisionRects() {

        return [
            ...this.walls,
            ...this.objects
        ];
    }

    isInsideExtraction(x, y) {

        const area = this.extraction;

        return (
            x >= area.x &&
            x <= area.x + area.width &&
            y >= area.y &&
            y <= area.y + area.height
        );
    }

    draw(context) {

        context.fillStyle = "#101820";

        context.fillRect(
            0,
            0,
            this.width,
            this.height
        );

        this.drawFloor(context);
        this.drawWalls(context);
        this.drawObjects(context);
        this.drawObjective(context);
        this.drawExtraction(context);
    }

    drawFloor(context) {

        context.strokeStyle =
            "rgba(120, 145, 165, 0.07)";

        context.lineWidth = 1;

        const size = 40;

        for (
            let x = 18;
            x < this.width - 18;
            x += size
        ) {

            context.beginPath();
            context.moveTo(x, 18);
            context.lineTo(x, this.height - 18);
            context.stroke();
        }

        for (
            let y = 18;
            y < this.height - 18;
            y += size
        ) {

            context.beginPath();
            context.moveTo(18, y);
            context.lineTo(this.width - 18, y);
            context.stroke();
        }
    }

    drawWalls(context) {

        for (const wall of this.walls) {

            context.fillStyle = "#252d34";

            context.fillRect(
                wall.x,
                wall.y,
                wall.width,
                wall.height
            );

            context.strokeStyle = "#6c747b";

            context.strokeRect(
                wall.x,
                wall.y,
                wall.width,
                wall.height
            );
        }
    }

    drawObjects(context) {

        for (const object of this.objects) {

            context.fillStyle = "#171e24";

            context.fillRect(
                object.x,
                object.y,
                object.width,
                object.height
            );

            context.strokeStyle = "#4d5962";

            context.strokeRect(
                object.x,
                object.y,
                object.width,
                object.height
            );
        }
    }

    drawObjective(context) {

        const pulse =
            1 + Math.sin(performance.now() * 0.005) * 0.1;

        context.save();

        context.translate(
            this.objective.x,
            this.objective.y
        );

        context.scale(pulse, pulse);

        context.fillStyle =
            "rgba(70, 150, 220, 0.18)";

        context.beginPath();

        context.arc(
            0,
            0,
            25,
            0,
            Math.PI * 2
        );

        context.fill();

        context.strokeStyle = "#66aee6";

        context.strokeRect(
            -9,
            -9,
            18,
            18
        );

        context.restore();
    }

    drawExtraction(context) {

        const area = this.extraction;

        context.fillStyle =
            "rgba(50, 130, 190, 0.16)";

        context.fillRect(
            area.x,
            area.y,
            area.width,
            area.height
        );

        context.strokeStyle = "#4b91c4";

        context.strokeRect(
            area.x,
            area.y,
            area.width,
            area.height
        );

        context.fillStyle = "#8ebfe0";

        context.font = "10px monospace";

        context.fillText(
            "EXTRACTION",
            area.x - 2,
            area.y - 8
        );
    }
}

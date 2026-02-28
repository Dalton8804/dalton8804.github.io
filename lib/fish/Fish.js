import { Spine } from "./Spine";
import { Joint } from "./Joint";

export class Fish {
    constructor(context, origin) {
        this.context = context;
        this.spine = new Spine(origin, [34, 40, 42, 41, 38, 32, 25, 19, 16, 10], 32);
        this._target = this.#newTarget;

        this.bodycolor = "#1d4863";
        this.fincolor = "#219e9a";

        this.speed = 4;
        this.speedTarget = 4;
        this.speedIncrement = .01;
        this.timeSinceLastTargetHit = 0;
    }

    get strokeColor() {
        let root = document.documentElement;
        let fg = getComputedStyle(root)
            .getPropertyValue("--foreground-color")
            .trim();
        return `rgb(${fg})`;
    }

    draw() {
        if (this._target.radius == 12.1) {
            this._target.draw(this.context);
        }
        this.drawPectoralFins();
        this.drawFishBody();
        this.drawCaudalFin();
        this.drawEyes();
        this.drawDorsalFin();
        this.drawKoiSpots();
        // this.spine.draw(this.context);
    }

    drawKoiSpots() {
        let ctx = this.context;

        // TODO: implement if ever care to
    }

    drawDorsalFin() {
        let ctx = this.context;

        let backVertices = [
            { x: this.spine.joints[2].x, y: this.spine.joints[2].y },
            { x: this.spine.joints[3].x, y: this.spine.joints[3].y },
            { x: this.spine.joints[4].x, y: this.spine.joints[4].y },
            { x: this.spine.joints[5].x, y: this.spine.joints[5].y }
        ]

        ctx.fillStyle = this.fincolor;
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = 2;

        this.curveVertexFromPoints(ctx, backVertices);
    }

    drawEyes() {
        let ctx = this.context;

        let eyeholes = this.spine.joints[0].eyeVertices;

        ctx.fillStyle = this.strokeColor;
        // ctx.strokeStyle = this.strokeColor;

        ctx.beginPath();
        ctx.ellipse(eyeholes[0].x, eyeholes[0].y, 5, 5, 0, 0, 2 * Math.PI);
        ctx.fill();
        // ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(eyeholes[1].x, eyeholes[1].y, 5, 5, 0, 0, 2 * Math.PI);
        ctx.fill();
        // ctx.stroke();
    }

    drawPectoralFins() {
        let ctx = this.context;

        let pectoralJoint = this.spine.joints[3]

        ctx.fillStyle = this.fincolor;
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.ellipse(pectoralJoint.leftVertex.x, pectoralJoint.leftVertex.y, 30, 15, pectoralJoint.angle + Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(pectoralJoint.rightVertex.x, pectoralJoint.rightVertex.y, 30, 15, pectoralJoint.angle - Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    drawCaudalFin() {
        // TODO: Update this to flow with the fish movement
        // see fish source: https://youtu.be/qlfh_rv6khY?si=8BR6fG_NTHnMTgfE
        // first implementation looked goofy af without using p5.js (i should have just used p5 :( )

        let d = this.spine.joints[this.spine.joints.length - 1]
        let ctx = this.context;

        ctx.fillStyle = this.fincolor;
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.ellipse(d.caudalPos[1].x, d.caudalPos[1].y, 30, 5, d.angle, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    drawFishBody() {
        let points = [];

        for (let i = 0; i < 10; ++i) {
            if (i > 0) points.push(
                {
                    x: (this.spine.joints[i].leftVertex.x + this.spine.joints[i - 1].leftVertex.x) / 2,
                    y: (this.spine.joints[i].leftVertex.y + this.spine.joints[i - 1].leftVertex.y) / 2
                }
            )
            points.push(this.spine.joints[i].leftVertex);
        }

        points.push(...this.spine.joints[9].bottomVertex);

        for (let i = 9; i >= 0; --i) {
            if (i < 9) points.push(
                {
                    x: (this.spine.joints[i].rightVertex.x + this.spine.joints[i + 1].rightVertex.x) / 2,
                    y: (this.spine.joints[i].rightVertex.y + this.spine.joints[i + 1].rightVertex.y) / 2
                }
            )
            points.push(this.spine.joints[i].rightVertex);
        }

        points.push(...this.spine.joints[0].headVertices)
        points.push(this.spine.joints[0].leftVertex);

        this.curveVertexFromPoints(this.context, points);
    }

    curveVertexFromPoints(ctx, points, tension = 0.1) {
        if (points.length < 2) {
            console.error("At least 2 points are required");
            return;
        }

        // Calculate extrapolated points for start and end for smooth wrapping
        const startPoint = {
            x: points[0].x - (points[1].x - points[0].x),
            y: points[0].y - (points[1].y - points[0].y),
        };
        const endPoint = {
            x: points[points.length - 1].x + (points[points.length - 1].x - points[points.length - 2].x),
            y: points[points.length - 1].y + (points[points.length - 1].y - points[points.length - 2].y),
        };

        // Extend the array with these "phantom" points
        const extendedPoints = [startPoint, ...points, endPoint];

        // Begin path
        ctx.beginPath();
        ctx.fillStyle = this.bodycolor;
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = 2;
        ctx.moveTo(points[0].x, points[0].y);

        // Loop through points and draw smooth segments
        for (let i = 1; i < extendedPoints.length - 2; i++) {
            const p0 = extendedPoints[i - 1];
            const p1 = extendedPoints[i];
            const p2 = extendedPoints[i + 1];
            const p3 = extendedPoints[i + 2];

            // Calculate control points with adjustable tension for smoother curves
            const cp1x = p1.x + (p2.x - p0.x) * tension;
            const cp1y = p1.y + (p2.y - p0.y) * tension;
            const cp2x = p2.x - (p3.x - p1.x) * tension;
            const cp2y = p2.y - (p3.y - p1.y) * tension;

            // Draw bezier curve between p1 and p2
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        }

        // Optional: Stroke the path
        ctx.fill()
        ctx.stroke();
    }

    resolve() {
        let headPos = this.spine.joints[0];
        if (Joint.dist(this._target, headPos) < 40 || this.timeSinceLastTargetHit > 400) {
            this._target = this.#newTarget;
            this.timeSinceLastTargetHit = 0;
        }

        if (this.speedTarget !== this.speed) {
            if (this.speedTarget > this.speed) {
                this.speed = Math.round((this.speed + this.speedIncrement) * 100) / 100;
            } else if (this.speedTarget < this.speed) {
                this.speed = Math.round((this.speed - this.speedIncrement) * 100) / 100;
            }
        }

        this.spine.resolveAngle(this._target, this.speed);
        this.timeSinceLastTargetHit++;
    }

    get #newTarget() {
        this.speedTarget = Math.random() * 4 + 4;
        let temp = new Joint(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 5);
        while (Joint.dist(temp, this.spine.joints[0]) < 400) {
            temp = new Joint(Math.random() * Math.max(1000, window.innerWidth), Math.random() * window.innerHeight, 5);
        }
        return temp;
    }

    forceSetTarget(joint) {
        this._target = joint;
    }
}
import { Joint } from "./Joint";

export class Spine {
    constructor(origin, jointRadii, linksize) {
        this.linksize = linksize;
        this.jointRadii = jointRadii;

        this.joints = [];

        if (!(this.jointRadii.length > 2)) throw "Assertion Failed: Spine must have at least 3 joints";

        for (let i = 0; i < this.jointRadii.length; ++i) {
            this.joints[i] = new Joint(origin.x - i * this.linksize, origin.y, this.jointRadii[i]);
        }
    }

    resolveAngle(target, speed) {
        this.joints[0].update(target, speed)

        for (let i = 1; i < this.joints.length; i++) {
            const prev = this.joints[i - 1];
            const curr = this.joints[i];

            const distance = Joint.dist(prev, curr);
            if (distance > this.linksize) {
                curr.x = prev.x - ((prev.x - curr.x) / distance) * this.linksize;
                curr.y = prev.y - ((prev.y - curr.y) / distance) * this.linksize;
            }

            curr.angle = Joint.diffHeading(prev, curr);
        }
    }

    draw(context) {
        for (let i = 0; i < this.joints.length - 1; ++i) {
            // this.#line(context, this.joints[i], this.joints[i+1]);
        }

        for (let i = 0; i < this.joints.length; ++i) {
            this.joints[i].draw(context);
            // this.joints[i].drawSidecircles(context);
        }
    }

    line(context, startJoint, endJoint) {
        const fg = getComputedStyle(document.documentElement).getPropertyValue('--foreground-color').trim();
        context.beginPath();
        context.strokeStyle = `rgb(${fg})`;
        context.lineWidth = 2;
        context.moveTo(startJoint.x, startJoint.y);
        context.lineTo(endJoint.x, endJoint.y);
        context.stroke();
        context.closePath();
    }
}
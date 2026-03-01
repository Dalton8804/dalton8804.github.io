const TAO = Math.PI * 2;

export class Target {
    constructor(x, y, forced=false) {
        this.x = x;
        this.y = y;
        this._forced = forced;
        this.radius = 12;
        this._hit = false;
    }
    
    draw(context) {
        const fg = getComputedStyle(document.documentElement).getPropertyValue('--foreground-color').trim();
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, TAO);
        context.lineWidth = 2;
        context.strokeStyle = `rgb(${fg})`;
        context.stroke();
        context.closePath();
    }

    hit() {
        this._hit = true;
    }

    isActive() {
        return !this._hit;
    }

    isForced() {
        return this._forced;
    }

    static dist(vec1, vec2) {
        Target.assertVector(vec1, "static dist.1");
        Target.assertVector(vec2, "static dist.2");

        return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
    }

    static assertVector(vec, methodName) {
        if (vec === undefined) throw "Assertion Failed: " + methodName + ": Vector is undefined";
        if (vec === null) throw "Assertion Failed: " + methodName + ": Vector is null";
        if (!(Object.hasOwn(vec, 'x') && Object.hasOwn(vec, 'y'))) throw "Assertion Failed: " + methodName + ": Object is not a Vector (has no x or y property)";
    }
}
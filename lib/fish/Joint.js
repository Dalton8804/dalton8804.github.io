const TAO = Math.PI * 2;

export class Joint {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.radius = radius;
    }

    get heading() {
        return Math.atan2(this.y, this.x);
    }

    get rightVertex() {
        let vX = this.#getPosX(Math.PI / 2, 0);
        let vY = this.#getPosY(Math.PI / 2, 0);
        return { x: vX, y: vY }
    }

    get leftVertex() {
        let vX = this.#getPosX(-Math.PI / 2, 0);
        let vY = this.#getPosY(-Math.PI / 2, 0);
        return { x: vX, y: vY }
    }

    get bottomVertex() {
        return [
            { x: this.#getPosX(Math.PI + Math.PI / 6, 0), y: this.#getPosY(Math.PI + Math.PI / 6, 0) },
            { x: this.#getPosX(Math.PI, 0), y: this.#getPosY(Math.PI, 0) },
            { x: this.#getPosX(Math.PI - Math.PI / 6, 0), y: this.#getPosY(Math.PI - Math.PI / 6, 0) },
        ]
    }

    get caudalPos() {
        return [
            { x: this.#getPosX(Math.PI, 0), y: this.#getPosY(Math.PI, 0) },
            { x: this.#getPosX(Math.PI, 10), y: this.#getPosY(Math.PI, 10) },
            { x: this.#getPosX(Math.PI, 20), y: this.#getPosY(Math.PI, 20) },
        ]
    }

    get headVertices() {
        return [
            { x: this.#getPosX(Math.PI / 2, 0), y: this.#getPosY(Math.PI / 2, 0) },
            { x: this.#getPosX(Math.PI / 4, 0), y: this.#getPosY(Math.PI / 4, 0) },
            { x: this.#getPosX(Math.PI / 6, 4), y: this.#getPosY(Math.PI / 6, 4) },
            { x: this.#getPosX(Math.PI / 8, 4), y: this.#getPosY(Math.PI / 8, 4) },
            { x: this.#getPosX(0, 4), y: this.#getPosY(0, 4) },
            { x: this.#getPosX(-Math.PI / 8, 4), y: this.#getPosY(-Math.PI / 8, 4) },
            { x: this.#getPosX(-Math.PI / 6, 4), y: this.#getPosY(-Math.PI / 6, 4) },
            { x: this.#getPosX(-Math.PI / 4, 0), y: this.#getPosY(-Math.PI / 4, 0) },
            { x: this.#getPosX(-Math.PI / 2, 0), y: this.#getPosY(-Math.PI / 2, 0) },
        ]
    }

    get eyeVertices() {
        return [
            { x: this.#getPosX(Math.PI / 3, -10), y: this.#getPosY(Math.PI / 3, -10) },
            { x: this.#getPosX(-Math.PI / 3, -10), y: this.#getPosY(-Math.PI / 3, -10) }
        ]
    }

    static diffHeading(prev, curr) {
        return Math.atan2(prev.y - curr.y, prev.x - curr.x);
    }

    update(target, speed) {
        const desiredAngle = Joint.sub(target, this).heading;
        const angleDiff = desiredAngle - this.angle;

        const normalizedAngle = (angleDiff + Math.PI) % (2 * Math.PI) - Math.PI;
        this.angle += Math.sign(normalizedAngle) * Math.min(Math.abs(normalizedAngle), 0.05) // 0.05 is maxTurnRate

        this.x += Math.cos(this.angle) * speed;
        this.y += Math.sin(this.angle) * speed;
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

    drawSidecircles(context) {
        let x, y;

        x = this.#getPosX(Math.PI / 2, 0);
        y = this.#getPosY(Math.PI / 2, 0);
        this.littlecircle(context, x, y);

        x = this.#getPosX(-Math.PI / 2, 0);
        y = this.#getPosY(-Math.PI / 2, 0);
        this.littlecircle(context, x, y);

    }

    static dist(vec1, vec2) {
        Joint.assertVector(vec1, "static dist.1");
        Joint.assertVector(vec2, "static dist.2");

        return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
    }

    static sub(vec1, vec2) {
        Joint.assertVector(vec1, "static sub.1");
        Joint.assertVector(vec2, "static sub.2");

        return new Joint(vec1.x - vec2.x, vec1.y - vec2.y, 0);
    }

    static assertVector(vec, methodName) {
        if (vec === undefined) throw "Assertion Failed: " + methodName + ": Vector is undefined";
        if (vec === null) throw "Assertion Failed: " + methodName + ": Vector is null";
        if (!(Object.hasOwn(vec, 'x') && Object.hasOwn(vec, 'y'))) throw "Assertion Failed: " + methodName + ": Object is not a Vector (has no x or y property)";
    }

    littlecircle(context, x, y, color = "red") {
        context.beginPath();
        context.arc(x, y, 2, 0, TAO);
        context.lineWidth = 2; // Adjust the width of the outline
        context.strokeStyle = color;
        context.stroke();
        context.closePath();
    }

    #getPosX(angleOffset, lengthOffset) {
        return this.x + Math.cos(this.angle + angleOffset) * (this.radius + lengthOffset);
    }

    #getPosY(angleOffset, lengthOffset) {
        return this.y + Math.sin(this.angle + angleOffset) * (this.radius + lengthOffset);
    }
}
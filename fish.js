const TAO = Math.PI * 2;

class Spine {
    constructor(origin, jointRadii, linksize) {
        this.linksize = linksize;
        this.jointRadii = jointRadii;
        
        this.joints = [];

        if (!(this.jointRadii.length > 2)) throw "Assertion Failed: Spine must have at least 3 joints";

        for (let i=0; i<this.jointRadii.length; ++i) {
            this.joints[i] = new Joint(origin.x - i * this.linksize, origin.y, this.jointRadii[i]);
        } 
    }

    static reconstruct(origin, jointRadii, linksize, joints) {
        let spine = new Spine(origin, jointRadii, linksize);
        spine.linksize = linksize;
        spine.jointRadii = jointRadii;
    
        for (let i=0; i<spine.jointRadii.length; ++i) {
            spine.joints[i] = Joint.reconstruct(joints[i].x, joints[i].y, joints[i].angle, spine.jointRadii[i]);
        } 
        return spine;
    }

    resolveAngle(target, speed) {
        this.joints[0].update(target, speed)

        for (let i=1; i<this.joints.length; i++) {
            const prev = this.joints[i-1];
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
        for (let i=0; i<this.joints.length-1; ++i) {
            // this.#line(context, this.joints[i], this.joints[i+1]);
        }

        for (let i=0; i<this.joints.length; ++i) {
            this.joints[i].draw(context);
            // this.joints[i].drawSidecircles(context);
        }
    }

    line(context, startJoint, endJoint) {
        context.beginPath();
        context.strokeStyle = foregroundColor;
        context.lineWidth = 2;
        context.moveTo(startJoint.x, startJoint.y);
        context.lineTo(endJoint.x, endJoint.y);
        context.stroke();
        context.closePath();
    }
}

class Joint {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.radius = radius;
    }

    static reconstruct(x, y, angle, radius) {
        let joint = new Joint(x,y,radius);
        joint.angle = angle;
        return joint;
    }

    get heading() {
        return Math.atan2(this.y, this.x);
    }

    get rightVertex() {
        let vX = this.#getPosX(Math.PI/2, 0);
        let vY = this.#getPosY(Math.PI/2, 0);
        return {x: vX, y: vY}
    }

    get leftVertex() {
        let vX = this.#getPosX(-Math.PI/2, 0);
        let vY = this.#getPosY(-Math.PI/2, 0);
        return {x: vX, y: vY}
    }

    get bottomVertex() {
        return [
            {x: this.#getPosX(Math.PI + Math.PI/6, 0), y: this.#getPosY(Math.PI + Math.PI/6, 0)},
            {x: this.#getPosX(Math.PI, 0), y: this.#getPosY(Math.PI, 0)},
            {x: this.#getPosX(Math.PI - Math.PI/6, 0), y: this.#getPosY(Math.PI - Math.PI/6, 0)},
        ]
    }

    get caudalPos() {
        return [
            {x: this.#getPosX(Math.PI, 0), y: this.#getPosY(Math.PI, 0)},
            {x: this.#getPosX(Math.PI, 10), y: this.#getPosY(Math.PI, 10)},
            {x: this.#getPosX(Math.PI, 20), y: this.#getPosY(Math.PI, 20)},
        ]
    }

    get headVertices() {
        return [
            {x: this.#getPosX(Math.PI/2, 0), y: this.#getPosY(Math.PI/2, 0)},
            {x: this.#getPosX(Math.PI/4, 0), y: this.#getPosY(Math.PI/4, 0)},
            {x: this.#getPosX(Math.PI/6, 4), y: this.#getPosY(Math.PI/6, 4)},
            {x: this.#getPosX(Math.PI/8, 4), y: this.#getPosY(Math.PI/8, 4)},
            {x: this.#getPosX(0, 4), y: this.#getPosY(0, 4)},
            {x: this.#getPosX(-Math.PI/8, 4), y: this.#getPosY(-Math.PI/8, 4)},
            {x: this.#getPosX(-Math.PI/6, 4), y: this.#getPosY(-Math.PI/6, 4)},
            {x: this.#getPosX(-Math.PI/4, 0), y: this.#getPosY(-Math.PI/4, 0)},
            {x: this.#getPosX(-Math.PI/2, 0), y: this.#getPosY(-Math.PI/2, 0)},
        ]
    }

    get eyeVertices() {
        return [
            {x: this.#getPosX(Math.PI/3, -10), y: this.#getPosY(Math.PI/3, -10)},
            {x: this.#getPosX(-Math.PI/3, -10), y: this.#getPosY(-Math.PI/3, -10)}
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
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0,  TAO);
        context.lineWidth = 2; // Adjust the width of the outline
        context.strokeStyle = foregroundColor;
        context.stroke();
        context.closePath();
    }

    drawSidecircles(context) {
        let x, y;

        x = this.#getPosX(Math.PI/2, 0);
        y = this.#getPosY(Math.PI/2, 0);
        this.littlecircle(context, x, y);

        x = this.#getPosX(-Math.PI/2, 0);
        y = this.#getPosY(-Math.PI/2, 0);
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
        context.arc(x, y, 2, 0,  TAO);
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

class Fish {
    constructor(context, origin) {
        this.context = context;
        this.spine = new Spine(origin, [34, 40, 42, 41, 38, 32, 25, 19, 16, 10], 32);
        this._target = this.newTarget;

        this.bodycolor = "#1d4863";
        this.fincolor = "#219e9a";
        
        this.speed = 4;
        this.speedTarget = 4;
        this.speedIncrement = .05;
        this.timeSinceLastTargetHit = 0;
    }

    static reconstruct(context, origin, spine, speed, speedTarget, speedIncrement, timeSinceLastTargetHit) {
        let fish = new Fish(context, origin);
        fish.spine = Spine.reconstruct(origin, spine.jointRadii, spine.linksize, spine.joints);
        fish._target = fish.newTarget;
        
        fish.speed = speed;
        fish.speedTarget = speedTarget;
        fish.speedIncrement = speedIncrement;
        fish.timeSinceLastTargetHit = timeSinceLastTargetHit;
        return fish;
    }

    get strokeColor() {
        return backgroundColor == "255,255,255" ? "0,0,0" : "255,255,255"; 
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
            {x: this.spine.joints[2].x, y: this.spine.joints[2].y},
            {x: this.spine.joints[3].x, y: this.spine.joints[3].y},
            {x: this.spine.joints[4].x, y: this.spine.joints[4].y},
            {x: this.spine.joints[5].x, y: this.spine.joints[5].y}
        ]

        ctx.fillStyle = this.fincolor;
        ctx.strokeStyle = 'rgb(' + this.strokeColor + ')';

        this.curveVertexFromPoints(ctx, backVertices);
    }

    drawEyes() {
        let ctx = this.context;
        
        let eyeholes = this.spine.joints[0].eyeVertices;

        ctx.fillStyle = 'rgb(' + this.strokeColor + ')';
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

        let d = this.spine.joints[this.spine.joints.length-1]
        let ctx = this.context;
        
        ctx.fillStyle = this.fincolor;
        ctx.strokeStyle = this.strokeColor;
    
        ctx.beginPath();
        ctx.ellipse(d.caudalPos[1].x, d.caudalPos[1].y, 30, 5, d.angle, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    drawFishBody() {
        let points = [];

        for (let i=0; i<10; ++i) {
            if (i>0) points.push(
                {
                    x: (this.spine.joints[i].leftVertex.x + this.spine.joints[i-1].leftVertex.x) / 2,
                    y: (this.spine.joints[i].leftVertex.y + this.spine.joints[i-1].leftVertex.y) / 2
                }
            )
            points.push(this.spine.joints[i].leftVertex);
        }

        points.push(...this.spine.joints[9].bottomVertex);

        for (let i=9; i>=0; --i) {
            if (i<9) points.push(
                {
                    x: (this.spine.joints[i].rightVertex.x + this.spine.joints[i+1].rightVertex.x) / 2,
                    y: (this.spine.joints[i].rightVertex.y + this.spine.joints[i+1].rightVertex.y) / 2
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
        ctx.strokeStyle = foregroundColor;
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
            this._target = this.newTarget;
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
    
    get newTarget() {
        this.speedTarget = Math.random() * 7 + 4;
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

let backgroundColor = "255,255,255";
let foregroundColor = "0,0,0";

const height = window.innerHeight;
const width = window.innerWidth;
const midpoint_x = width / 2;
const midpoint_y = height / 2;
const canvas = document.getElementById("myCanvas");
canvas.style.background = backgroundColor;
const ctx = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return {x: x, y: y}
}
let target = new Joint(midpoint_x-500, midpoint_y-200, 0)

let prevFish = JSON.parse(localStorage.getItem("fish"));
console.log(prevFish);

let fishList;

if (prevFish === null) {
    fishList = [new Fish(ctx, {x: midpoint_x, y: midpoint_y})] 
    if (window.innerWidth > 500)
        fishList.push(...[new Fish(ctx, {x: midpoint_x, y: midpoint_y}),new Fish(ctx, {x: midpoint_x, y: midpoint_y})]);
} else {
    fishList = prevFish.map((fish) => Fish.reconstruct(
        ctx, 
        origin, 
        fish.spine, 
        fish.speed, 
        fish.speedTarget, 
        fish.speedIncrement, 
        fish.timeSinceLastTargetHit))
    console.log("fishList")
    console.log(fishList)
}

let paused = false;

let game = setInterval(() => {
    backgroundColor = getComputedStyle(root).getPropertyValue("--background-color");
    foregroundColor = getComputedStyle(root).getPropertyValue("--foreground-color");
    canvas.style.background = 'rgb('+backgroundColor+')';

    if (!paused) {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        fishList.forEach(fish => {
            fish.resolve();
            fish.draw();
        })
        localStorage.setItem("fish", JSON.stringify(fishList));
    }
}, 16)

canvas.addEventListener('click', event => { 
    if (playingWithFish) {
        let coords = getCursorPosition(canvas, event);
        target = new Joint(coords.x, coords.y, 12.1);
        let i = Math.floor(Math.random() * fishList.length)
        fishList[i].forceSetTarget(target);
    }
    // paused = !paused;
}, false);

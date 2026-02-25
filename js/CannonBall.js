class CannonBall {
    constructor(x,y) {
        let options = {
            isStatic: true
        }
        this.r = 30;
        this.body = Bodies.circle(x, y, this.r, options);
        this.image = loadImage("./assets/cannonball.png")
        World.add(world, this.body);
    }
    display() {
        let pos = this.body.position;
        push();
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.r, this.r);
        pop();
    }
    shoot() {
        let newAngle = cannon.angle -28;
        newAngle = newAngle * (3.14 / 180);
        let velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, {
            x: velocity.x * (180 / 3.14), y: velocity.y * (180 / 3.14)});

    }
    remove(index) {
        Matter.body.setVelocity(this.body, {x:0, y:0});
        setTimeout(()=> {
            Matter.World.remove(world, this.body);
            delete balls[index];
        },1000);
    }
}
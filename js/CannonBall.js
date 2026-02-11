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
}
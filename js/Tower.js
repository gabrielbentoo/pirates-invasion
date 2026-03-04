class Tower {
    constructor(x,y,width,height) {
        let options = {
            isStatic: true,

        }
        this.ballImage = loadImage("./assets/tower.png");
        this.width = width;
        this.height = height;
        this.body = Bodies.rectangle(x, y, this.width, this.height, options);
        World.add(world, this.body);
    }
    display() {
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.ballImage, 0, 0, this.width, this.height);
        pop();
    }
}
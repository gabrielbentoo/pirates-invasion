const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;
let engine;
let world;
let backgroundImg;
let towerImg;
let canvas;
let tower;
let ground;
let cannon;
let angle;
let balls = [];
let boat;
let boats = [];
let boatAnimation = [];
let boatSpritedata;
let boatSpriteSheet;


function preload() {

    backgroundImg = loadImage("./assets/background.gif");
    towerImg = loadImage("./assets/tower.png");
    boatSpritedata = loadJSON("./assets/boat.json");
    boatSpriteSheet = loadImage("./assets/boat1.png");

}

function setup() {
    createCanvas(1200, 600);
    
    engine = Engine.create();
    world = engine.world;

    let options = {
        isStatic: true
    }
    
    ground = Bodies.rectangle(0, height -1, width *2, 1, options);
    World.add(world, ground);

    tower = Bodies.rectangle(160, 350, 160, 310, options);
    World.add(world, tower);

    angleMode(DEGREES);
    angle = 15  ;
    cannon = new Cannon(180, 110, 130, 100, angle);

    cannonBall = new CannonBall(cannon.x, cannon.y);

    boat = new Boat(width -79, height -60, 170, 170, -80);

    let boatFrames = boatSpritedata.frames;
    for(let i = 0; i < boatFrames.length; i++) {
        let pos = boatFrames[i].position;
        let img = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
        boatAnimation.push(img);
    }
}

function draw() {

    image(backgroundImg, 0, 0, 1200, 600);
    Engine.update(engine);
    rect(ground.position.x, ground.position.y, width *2, 1);
    push();
    imageMode(CENTER);
    image(towerImg, tower.position.x, tower.position.y, 160, 310);
    pop();
    showBoats();
    for(let i = 0; i < balls.length; i++) {
        showCannonBalls(balls [i]);
        collisionWithBoat(i);
    }
    cannon.display();
    // Matter.Body.setVelocity(boat.body, {x: -0.9, y: 0});
    // boat.display();
    
    
}

function keyReleased() {
    if(keyCode === DOWN_ARROW) {    
        balls[balls.length -1].shoot();

    }
}

function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        let cannonBall = new CannonBall(cannon.x, cannon.y);
        balls.push(cannonBall);
    }
}

function showCannonBalls(ball, index) {
    if(ball) {
        ball.display();
        if(ball.body.position.x >= width || ball.body.position.y >= height -50) {
            ball.remove(index);
        }
    }

}

function showBoats() {
    if(boats.length > 0) {
        if(boats[boats.length -1] === undefined || boats[boats.length -1].body.position.x < width -300) {   
            let positions = [-40, -60, -70, -20];
            let position = random(positions);
            let boat = new Boat(width, height -100, 170, 170, position);
            boats.push(boat);


        }
        for(let i = 0; i < boats.length; i++) {
            if(boats[i]) {
                Matter.Body.setVelocity(boats [i].body, {x: -0.9, y: 0});
                boats[i].display();
            }
            
            
        }
        
     }
     else {
        let boat = new Boat(width, height -100, 170, 170, -60);
        boats.push(boat);
     }
} 

function collisionWithBoat (index) {
    for(let i = 0; i < boats.length; i++) {
        if(balls[index] !== undefined && boats[i] !== undefined) {
            let collision = Matter.SAT.collides(balls[index].body, boats[i].body);
            if(collision.collided ) {
                boats[i].remove(i);
                Matter.World.remove(world, balls[index].body);
                delete balls[index];
            
            }
        }
    }
}
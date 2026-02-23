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


function preload() {

    backgroundImg = loadImage("./assets/background.gif");
    towerImg = loadImage("./assets/tower.png");

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
    
}

function draw() {

    image(backgroundImg, 0, 0, 1200, 600);
    Engine.update(engine);
    rect(ground.position.x, ground.position.y, width *2, 1);
    push();
    imageMode(CENTER);
    image(towerImg, tower.position.x, tower.position.y, 160, 310);
    pop();
    for(let i = 0; i < balls.length; i++) {
        showCannonBalls(balls [i]);
    }
    cannon.display();


    
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

function showCannonBalls(ball) {
    if(ball) {
        ball.display();
    }

}
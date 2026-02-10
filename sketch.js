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


function preload() {

    backgroundImg = loadImage("./assets/background.gif");
}

function setup() {
    createCanvas(1200, 600);
    
    engine = Engine.create();
    world = engine.world;
}

function draw() {

    image(backgroundImg, 0, 0, 1200, 600);
}
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var ghost1,ghost;
var backgroundImg,platform;
var cross, slingshot;

var bg = "images/background.PNG";

var gameState = "onSling";

var score = 0;

var shot = 0;

function preload() 
{
    getTime();
}

function setup()
{
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,40);
    platform = new Ground(150, 305, 300, 170);

    ghost1 = new Ghost(810, 350);

    ghost2 = new Ghost(810, 220);

    cross = new Cross(200,50);

    slingshot = new Slingshot(cross.body,{x:200, y:50});

}

function draw()
{
    if(backgroundImg)
    {
        background(backgroundImg);
    }
    Engine.update(engine);
    
    ground.display();
    ghost1.display();

    ghost2.display();
    
    cross.display();
    platform.display();

    slingshot.display();    

    ghost1.score();
    ghost2.score();

    textSize(24);
    fill("white");
    text("SCORE :"+ score,1000,50);
    if(shot == 3){
        cross.image = loadImage("");
    }

}

function mouseDragged()
{
    if (gameState!=="launched")
    {
        Matter.Body.setPosition(cross.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased()
{
    slingshot.fly();
    gameState = "launched";
    shot = shot+1;
}

function keyPressed()
{
    if(keyCode === 32 && cross.body.speed < 1 || cross.body.speed > 25){
        cross.trajectory = [];
        Matter.Body.setPosition(cross.body,{x:200,y:50});
        slingshot.attach(cross.body);
        gameState = "onSling"
    }
}

async function getTime()
{
   var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
   var responseJSN = await response.json()
   var datetime = responseJSN.datetime;
   var hour = datetime.slice(11,13)
   console.log(hour)
   if(hour >= 6 && hour <= 19)
   {
     bg = "images/background.PNG"
   }
   else
   {
     bg = "images/background.PNG" 
   }
   backgroundImg = loadImage(bg);
}
var plane;
var bg;
var bgs;
var plane_img;
var Asteroids,a1,a2;
var gameState = "START"
var startButton,start_img;
var click;
var b1,b2,bimg;
var bulletGrp, asteroidGrp;
var life = 3
var bulletCount = 30  ;
function preload()
{
bg = loadImage("KJJ.png")
plane_img = loadImage("plane.png")
air = loadImage("track.png")
a1 = loadImage("a1.png")
a2 = loadImage("a2.png")
start_img = loadImage("start.png")
click = loadSound("click.wav")
bgs = loadSound("bgs.mp3")
bimg = loadImage("buletn.png")

}

function setup() {
  createCanvas(windowWidth,windowHeight);
 

  plane = createSprite(width/2,height/2+100,50,50);
  plane.addImage(plane_img)
  plane.scale = 0.35
 
 bulletGrp = new Group()
 asteroidGrp = new Group()
  bgs.play()
  
 
}

function draw() {
  background(bg);
  console.log(gameState)
 
  image(air, 0, -height * 5, width, height * 10);
 
 

  if(gameState === "START")
  {
    startButton = createSprite(500,height-50,20,20)
    startButton.addImage(start_img)
    startButton.scale = 1.5
   if(keyIsDown(DOWN_ARROW))
   {
     gameState = "SHOOT"
     click.play()
   }
  }
  if(gameState === "SHOOT")
 {
 
  handleBulletASTcollision()
 
 plane.velocityY = -2

  if(plane.positionY > -height*5)
  {
  gameState = "END"
  
  }

    camera.position.y = plane.position.y - 300

  /*if(keyIsDown(UP_ARROW))
  {
   plane.y -= 5
   
  }*/
 
 if(keyWentUp(32)&& bulletCount > 0)
 {
  bangbullet()

 } 
  if(keyIsDown(RIGHT_ARROW))
  {
   plane.x += 20
  }

  if(keyIsDown(LEFT_ARROW))
  {
   plane.x -= 20
  }
  handlePlaneASTcollision()
  spawnRocks()  
 }
 drawSprites();
 textFont("impact")
 textSize(20)
 fill("PURPLE")
 text("Lives :" + life,plane.x,plane.y + 70)
 
 textFont("impact")
 textSize(20)
 fill("PURPLE")
 text("bC :" + bulletCount,plane.x - 60,plane.y + 70)

 if(gameState === "END")
 {
  plane.velocityY = 0
   
 }
}


function spawnRocks()
{
  if(frameCount % 60 === 0)
 { 
  Asteroids = createSprite(random(width*0.25,width*0.75),plane.y-650,20,20)
  
  Asteroids.velocityY = 5
  var rand = Math.round(random(1,2));
  switch(rand)
  {
    case 1: Asteroids.addImage(a1)
    break;

    case 2:Asteroids.addImage(a2)
    break;

    default : break
  }
  Asteroids.scale = 0.45
  asteroidGrp.add(Asteroids)
 }
}

function bangbullet()
{
bulletCount -=1
  b1 = createSprite(plane.x-50,plane.y,10,10) 
 b2 = createSprite(plane.x+50,plane.y,10,10)
b1.velocityY = -15
b2.velocityY = -15
b1.addImage(bimg)
b2.addImage(bimg) 
b1.scale = 0.15
b2.scale = 0.15
 bulletGrp.add(b1)
 bulletGrp.add(b2)

}

function handleBulletASTcollision()
{
 for(i = 0;i < bulletGrp.length;i++)
 {
  for(x = 0;x < asteroidGrp.length;x++)
  {
   if(bulletGrp[i].isTouching(asteroidGrp[x])||asteroidGrp[x].isTouching(bulletGrp[i]))
   {
     asteroidGrp[x].destroy()
     bulletGrp.destroyEach()
   }
  }
 }
}
function handlePlaneASTcollision()
{
  
 
 
  for(x = 0;x < asteroidGrp.length;x++)
  {
   if(plane.isTouching(asteroidGrp[x])||asteroidGrp[x].isTouching(plane))
   {
     asteroidGrp[x].destroy()
     life -= 1
   }
  }
 

}

function handleAmmo()
{
 for(i = 0;i < ammo_grp.length;i++)
 {
  player.overlap(ammo_grp[i], function (collector,collected){
   bulletCount = 50
   collected.remove()
  })
 }

}
var birdImg, bird
var ground,groundImg, invisibleGround;
var gameOverImg,ground,restartImg,restart;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstaclesImg,obstacles, clouds, cloudsImg;
var count = 0;
var die, checkPoint, jump;
var CloudsGroup, ObstaclesGroup;

function preload(){
  birdImg = loadImage("images/bird2.png");
  cloudsImg = loadImage("images/clouds.png");
  groundImg = loadImage("images/ground.png");
  //obstaclesImg  = loadAnimation("images/o1.png,o2.png,o3.png,o4.png,o5.png,o6.png");
  gameOverImg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/restart.png");
  checkPoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
}

function setup() {
  createCanvas(800,400);
  bird = createSprite(140,320,20,50);
  bird.addImage(birdImg);
  bird.scale = 0.25;
  ground = createSprite(400,395,400,20);
  ground.addImage(groundImg);
  ground.x = ground.width /2;
  gameOver = createSprite(200,300);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  restart = createSprite(200,340);
  restart.addImage(restartImg);
  restart.visible = false;
  restart.scale = 0.5;
  ObstaclesGroup = new Group();
  CloudsGroup = new Group();
  invisibleGround = createSprite(400,385,800,5);
   invisibleGround.visible = false;
   textSize(18);
  textFont("Georgia");
  textStyle(BOLD);

}

function draw() {
  background(245,245,245); 
  text("Score: "+ count, 250, 100);


  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count = count+Math.round(World.frameRate/60);
    
    if (count>0 && count%100 === 0){
      soundName.play(checkPoint);
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && bird.y >= 359){
      bird.velocityY = -12 ;
      soundName.play(jump);
    }
  
    //add gravity
    bird.velocityY = bird.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when bird is touching the obstacle
    if(ObstaclesGroup.isTouching(bird)){
      soundName.play(jump);
      gameState = END;
      soundName.play(die);
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    bird.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    

    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  //console.log(bird.y);
  
  //stop bird from falling down
  bird.collide(invisibleGround);
  
  drawSprites();
}
//resetting the game
function reset(){
  gameState = PLAY;
  bird.addImage(birdImg);
  gameOver.visible = false;
  restart.visible = false;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  count = 0;
  
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = - (6 + 3*count/100);
    
    //generate random obstacles
    var rand = randomNumber(1,6);
    obstacle.setAnimation("obstacle" + rand);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y = randomNumber(280,320);
    cloud.setAnimation("cloud");
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = bird.depth;
    bird.depth = bird.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  drawSprites();
}













 

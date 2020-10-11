var bananaImage, obstacleImage, obstacle_group, backgroundimg, score, player_running, obstacle_img, ground, player, bg;

var obstacleGroup
var foodGroup, banana;

var score = 0

function preload() {
  backgroundimg = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png");
  
}

function setup() {
  createCanvas(400, 400);
  bg = createSprite(200,200,400,800);
  ground = createSprite(100,360,10,10);
  player = createSprite(100,330,10,10);
  
  ground.visible = false;
  
  bg.addImage("background",backgroundimg);
  bg.velocityX = -4;
  
  player.addAnimation("player_running",player_running);
  player.scale = 0.075;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background(220);
  
  score = score + Math.round(getFrameRate()/60)
  text("Score: "+ score,50,50);
  
  if (bg.x < 0){
    bg.x = bg.width/2;
  }
    
  if (foodGroup.isTouching(player)){
  foodGroup.destroyEach(banana);
  score = score + 2;
  }
  
  if (keyDown ("space")){
    player.velocityY = -10;
  
  }
  player.velocityY = player.velocityY+0.8;
  player.collide(ground);
  
  switch(score){
    case 10: player.scale = 0.12;
      break;
     case 20: player.scale = 0.14;
      break;
    case 30: player.scale = 0.16;
      break;
    case 40: player.scale = 0.18;
      break;
  }
  
  if (player.isTouching(obstacleGroup)){
    player.scale = 0.075;
  }
  spawnBananas();
  spawnObstacles();
  drawSprites();
  
}

function spawnBananas(){
  if (frameCount % 60 === 0){
    var banana = createSprite(200,50,200,100);
  banana.y = Math.round(random(150,220));
  banana.addImage(bananaImage);
  banana.scale = 0.08;
  banana.velocityX = -3;
  
  banana.lifetime = 200;
  foodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 120 === 0){
    var obstacle = createSprite(400,340,50,50);
  obstacle.addImage(obstacle_img);
  obstacle.scale = 0.2;
  obstacle.velocityX = -3;
  
  obstacle.lifetime = 200;
  obstacleGroup.add(obstacle);
  }
}
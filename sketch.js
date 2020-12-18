//game states
var PLAY = 1;
var END = 0;
var gameState=1;

var sword , swordImage

var score

var fruitGroup,fruit1Image,fruit2Image,fruit3Image,fruit4Image

var gameoverImage

var enemyGroup,alien1Image,monster

var knifeSwooshSound,gameoverSound

function preload(){
  swordImage=loadImage("sword.png")
 
  fruit1Image=loadImage("fruit1.png")
  fruit2Image=loadImage("fruit2.png")
  fruit3Image=loadImage("fruit3.png")
  fruit4Image=loadImage("fruit4.png")
  
  gameoverImage=loadImage("gameover.png")
  
  alien1Image=loadImage("alien1.png","alien2.png")
   
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3")
  gameoverSound=loadSound("gameover.mp3")
  
}

function setup () {
  createCanvas(600,500);
  
  //create the sword
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
    
 // gameover=createSprite(300,100);
 // gameover.addImage(gameoverImage);
  
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
 sword.setCollider("rectangle",0,0,40,40);
  
  score =0;
  
}

function draw(){
background("white");
  
  fill("black")
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){
       fruits();
      enemy();

      sword.y=World.mouseY;
      sword.x=World.mouseX;
    
      if(fruitGroup.isTouching(sword)){
        fruitGroup.destroyEach();
        score=score+2;
        knifeSwooshSound.play();
      }
    
    else{
 
  
    if(sword.isTouching(enemyGroup)){
       gameState=END
       gameoverSound.play();
       fruitGroup.destroyEach();
       enemyGroup.destroyEach();
       fruitGroup.setVelocityXEach=0;
       enemyGroup.setVelocityXEach=0;
       
       sword.addImage(gameoverImage);
       sword.x=200;
       sword.y=200;
     }
  }
  }
  drawSprites();
  
}

function fruits(){
  if (World.frameCount%80===0){
     var fruit=createSprite(400,200,20,20);
      fruit.scale=0.2;
      
      r=Math.round(random(1,4));
      if(r == 1){ 
       fruit.addImage(fruit1Image);
         } else if (r==2){
           fruit.addImage(fruit2Image);
         } else if (r==3){
           fruit.addImage(fruit3Image);
         } else {
           fruit.addImage(fruit4Image);
         }
    
      
  fruit.y=Math.round(random(50,340));
  
  fruit.velocityX=-(8+score/4);
  fruit.setLifetime=100;
  
    fruitGroup.add(fruit);
    
    
      }
}

function enemy(){
  
  if(World.frameCount%200===0){
     monster=createSprite(400,200,20,20);
     monster.addImage(alien1Image);
     monster.y=Math.round(random(100,300));
     monster.velocityX=-(7+score/4);
     monster.setLifetime=50;
    
    enemyGroup.add(monster);
     
     
     }
  
  
}










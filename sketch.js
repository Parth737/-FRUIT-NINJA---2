
var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,monster,fruitGroup,enemyGroup, score;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage

var swordSound, gameOverSound;


function preload(){
  
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  swordSound = loadSound("knifeSwooshSound.mp3")
  gameOverSound = loadSound("gameover.mp3")
  
  
}



function setup() {
  createCanvas(500, 500);
  
  
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7
   
  
  
  

  
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    
    fruits();
    Enemy();
    
    
    sword.y=mouseY;
    sword.x=mouseX;
  
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      swordSound.play();
      score=score+2;
      
    }
    else
    {
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        gameOverSound.play();
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        fruitGroup.setLifetimeEach(-1);
        enemyGroup.setLifetimeEach(-1);
        
        
        sword.addImage(gameOverImage);
        sword.scale = 2.5
        sword.x=250;
        sword.y=200;
      }
    }
  }
  
  drawSprites();
  
  textSize (20);
  text("Score : "+ score,400,30);
}


function Enemy(){
  if(World.frameCount%150===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
   position = Math.round(random(1,2))
   fruit=createSprite(400,200,20,20);
    if(position == 1)
    {
      fruit.x = 400;
      fruit.velocityX = -(7 + (score / 4));
    }
    else
    {
      if(position == 2){
        fruit.x = 0;
        
        fruit.velocityX = (7 + (score / 4));
      }
    }
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    if (position==1){
     fruit.x =400
     fruit.velocityX = -(8+ (score/4))
    }
    else
    
    if(position==2){
    fruit.x = 0
    fruit.velocityX = (8+(score/4))
    }
    fruit.y=Math.round(random(50,340));
   
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
    
  }
}

document.write("USE MOUSE TO MOVE THE KNIFE AND CUT THE FRUITS BUT BE CAREFUL DON'T TOUCH THE ENEMY !");

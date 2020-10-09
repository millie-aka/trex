var play=1;
var end=0;
var gameState=play;
var score=0;

var trex ,trex_running,ground;


function preload(){
  
  
      trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
      trex_collided = loadAnimation("trex_collided.png");

      groundImage = loadImage("ground2.png");
      cloudImage = loadImage("cloud.png");
      over = loadImage("gameOver.png");
      restart_icon = loadImage("restart.png");
      obstacle1 = loadImage("obstacle1.png");
      obstacle2 = loadImage("obstacle2.png");
      obstacle3 = loadImage("obstacle3.png");
      obstacle4 = loadImage("obstacle4.png");
      obstacle5 = loadImage("obstacle5.png");
      obstacle6 = loadImage("obstacle6.png");

}

function setup(){
  
  
      createCanvas(600,200);

      trex = createSprite(50,150,20,50);
      trex.addAnimation("running", trex_running);
      trex.addAnimation("collided", trex_collided);

      ground = createSprite(200,160,400,20);
      ground.addImage("ground",groundImage);
      ground.x=ground.width/2;

      invisibleGround = createSprite(200,180,400,20);
      invisibleGround.visible=false;
  
      gameOver=createSprite(290,50,40,10);
      gameOver.addImage("game over",over);
      gameOver.scale=0.5;
      gameOver.visible=false;
  
      restart=createSprite(300,80,40,10);
      restart.addImage("restart",restart_icon);
      restart.scale=0.5;
      restart.visible=false;

      obstaclesGroup = new Group();
      cloudsGroup = new Group();

      trex.scale=0.5;
      trex.x = 50;

      trex.setCollider("circle",0,0,35);
      trex.debug=true;
 
}
function spawnClouds(){
  
      if(frameCount % 60 === 0 ){

          cloud=createSprite(700,100,40,10);
          cloud.addImage("cloud",cloudImage);  
          cloud.y=Math.round(random(10,60)); 
          cloud.velocityX=-3;
          cloud.scale=0.8;  

          cloud.depth=trex.depth; 
          trex.depth=trex.depth+1; 

          cloud.lifetime=250; 
          

          cloudsGroup.add(cloud);    

    }
}

function spawnObstacles(){
  
       if(frameCount % 60 === 0 ){

           var obstacle = createSprite(700,150,40,10);
           var rand = Math.round(random(1,6));

           switch(rand){

               case 1:     obstacle.addImage("obstacle",obstacle1);
                 break;

               case 2:
                 obstacle.addImage("obstacle",obstacle2);
                 break;

               case 3:
                 obstacle.addImage("obstacle",obstacle3);
                 break;

               case 4:
                 obstacle.addImage("obstacle",obstacle4);
                 break;

               case 5:
                 obstacle.addImage("obstacle",obstacle5);
                 break;

               case 6:
                 obstacle.addImage("obstacle",obstacle6);
                 break;

                 default: break;  
         }

         obstacle.velocityX=-5;
         obstacle.scale=0.5;
         obstacle.lifetime=350;
         

         obstaclesGroup.add(obstacle);


       }
  
}

function draw(){
  
    //background("#66FF66");
    background("purple");
  
   
    text("Score: "+score,500,50);
    
    if(gameState == play){

      ground.velocityX=-5;
      
      console.log("frame count:"+frameCount);
      console.log("frame rate:"+getFrameRate());
      score=score+Math.round((getFrameRate()/60));
       console.log("score:"+score);
      
     if(ground.x<0){
          ground.x=ground.width/2;
      }//if//if

      
     if(keyDown("space") && trex.y>=152){
          trex.velocityY = -12;
      }//if
      
     
     trex.velocityY=trex.velocityY+0.8;

     spawnClouds();
     spawnObstacles(); 

    if(obstaclesGroup.isTouching(trex)){

       gameState=end;

        }//if

    }
    else if(gameState == end){

//trex.changeAnimation("collided",trex_collided);
      
      gameOver.visible=true;
      restart.visible=true;
      
      ground.velocityX=0;
      trex.velocityY=0;
      
      trex.changeAnimation("collided", trex_collided);
     
      
      obstaclesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);
      
      obstaclesGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
      
      
    if(mousePressedOver(restart)){
      
      //console.log("restart the game");
      
      reset();
       
       }

    }  
    trex.collide(invisibleGround);


    drawSprites();
    
}

function reset(){
  
  gameState =  play;
  
  restart.visible=false;
  gameOver.visible=false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score=0;
  
  
}

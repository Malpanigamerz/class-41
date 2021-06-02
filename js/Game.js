class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1_Image);
    car2 = createSprite(300,200);
    car2.addImage(car2_Image);
    car3 = createSprite(500,200);
    car3.addImage(car3_Image);
    car4 = createSprite(700,200);
    car4.addImage(car4_Image);

    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
       background(rgb(198,135,103));
       image(trackImage,0,-displayHeight*4,displayWidth,displayHeight*5);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175
      ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        x = 200+(index*200)+ allPlayers[plr].xPos;
        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(38) && player.index !== null){
      
     yVel+=0.9;

      if(keyIsDown(37)){
        xVel -= 0.2;
      }
      if(keyIsDown(39)){
        xVel += 0.2;
      }
      
    }
    //if(player.distance>3860){
      //gameState = 2;
    //}
    
    player.distance += yVel
    yVel *= 0.98;
    player.xPos += xVel;
    xVel *= 0.98;
    player.update();

    drawSprites();
  }
    
  end(){
    console.log("The Game Has Ended");
  }
}



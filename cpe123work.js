function setup(){};

var s = function( p ) { // p could be any variable name


  /**
  Final Project
  Section: 05
  Group #: 5

  Names: Alisha Cherian, Roshni Vakil, Shosei Anegawa, Hamza Deif

  */

  //Game Variables:

  var selection = false; 

  var p1flag = 0; //tracks which car player 1 selects
  var p2flag = 0; //tracks which car player 2 selects
  var race = false; //tracks whether the actual race part of the code is executing
  var redfill, yellowfill, greenfill, bluefill;
  var redfill2, yellowfill2, greenfill2, bluefill2;

  var trackW = 150; 
  var trackH = 200;
  var laneWidth = 20;
  var outerTrackCirc; //to store distance around the outer track
  var innerTrackCirc; //to store distance around the inner track
  var trackDifference; //to store the difference between the distance around the outer track and distance around the inner track 
  var numOfTrackLines = 12; //the number of center division lines on the track

  var car1X; //to store the x-coord of car 1
  var car1Y; //to store the y-coord of car 1
  var car2X; //to store the x-coord of car 2
  var car2Y; //to store the y-coord of car 2

  var car1Progress = 0; //stores the distance car 1 has traveled along the track; initially set to 0
  var car1Speed; //to store car 1's natural speed at any point in the game

  var car2Progress; //stores the distance car 2 has traveled along the track; initially set to 0
  var car2Speed; //to store car 2's natural speed at any point in the game

  var refreshEvery1; //to store how often car 1's boost cycle should refresh
  var refreshEvery2; //to store how often car 2's boost cycle should refresh

  var car1Refresh; //to store car 1's current point in its boost cycle
  var car2Refresh; //to store car 2's current point in its boost cycle

  var originalCar1Speed; //to store car 1's given natural speed (before the user might reduce it)
  var originalCar2Speed; //to store car 2's given natural speed (before the user might reduce it)

  //to store the primary body color of each car:
  var redColor; 
  var orangeColor; 
  var greenColor; 
  var blueColor; 

  //to store the outline color of each car in their top profile graphics:
  var redStrokeColor; 
  var greenStrokeColor; 
  var blueStrokeColor; 

  //to store the strokeWeights of each car's outlines in thier top profile graphics:
  var redStrokeWeight; 
  var greenStrokeWeight;
  var blueStrokeWeight;
  var orangeStrokeWeight;

  var winningStatement = ""; //winning statement is blank if no car has won yet
  var rematchColor, newGameColor;

  //stores whether or not the players pressed/activated their turbos on time
  var pressedOnTime1 = false;
  var pressedOnTime2 = false;

  var count = 0;

  p.setup = function() {
     p.createCanvas(500, 500);
     outerTrackCirc = 2 * PI * p.sqrt((p.pow(trackW + laneWidth / 2, 2) + p.pow(trackH + laneWidth / 2, 2)) / 2) //calculates distance around outer track
     innerTrackCirc = 2 * PI * p.sqrt((p.pow(trackW, 2) + p.pow(trackH, 2)) / 2); //calculates distance around inner track
     trackDifference = outerTrackCirc - innerTrackCirc;
     car2Progress = -trackDifference;

     redColor = p.color(240, 45, 45);
     orangeColor = p.color(240, 169, 0);
     greenColor = p.color(31, 237, 24);
     blueColor = p.color(47, 193, 237);

     redStrokeColor = p.color(169, 29, 0);
     orangeStrokeColor = p.color(168, 108, 15);
     greenStrokeColor = p.color(12, 166, 7);
     blueStrokeColor = p.color(25, 69, 247);

     redStrokeWeight = 0.5;
     greenStrokeWeight = 0.5;
     blueStrokeWeight = 0.5;
     orangeStrokeWeight = 0.5;

     redfill = p.color(180,180,180);
     yellowfill =  p.color(180,180,180);
     greenfill =  p.color(180,180,180);
     bluefill =  p.color(180,180,180);
     redfill2 = p.color(180,180,180);
     yellowfill2 =  p.color(180,180,180);
     greenfill2 =  p.color(180,180,180);
     bluefill2 =  p.color(180,180,180);

     rematchColor = p.color(255, 180, 0);
     newGameColor = p.color(255, 180, 0);
  } 

  p.carOneTopProfile = function() {
    p.push();
      p.strokeWeight(redStrokeWeight);
      p.stroke(redStrokeColor);
      p.fill(redColor);
      p.rect(-4,-5-5/9, 8, 5+5/9);
      p.rect(-5, -20, 10, 14+4/9);
    p.pop();
  }

  p.carTwoTopProfile = function() {
    p.push();
      p.strokeWeight(orangeStrokeWeight);
      p.stroke(orangeStrokeColor);
      p.fill(orangeColor);
      p.ellipse(0, -10, 10, 20);
      p.circle(0, -11.5, 10);
    p.pop();
  }

  p.carThreeTopProfile = function() {
    p.push();
      p.strokeWeight(greenStrokeWeight);
      p.stroke(greenStrokeColor);
      p.fill(greenColor);
      p.rect(-4, -2-2/9, 8, 2+2/9);
      p.rect(-5, -10-4/9, 10, 8+2/9);
      p.rect(-4, -20, 8, 9+5/9);
    p.pop();
  }

  p.carFourTopProfile = function() {
    p.push();
      p.strokeWeight(blueStrokeWeight);
      p.stroke(blueStrokeColor);
      p.fill(blueColor);
      p.rect(-4, -3-5/9, 8, 3+5/9);
      p.rect(-5, -18-2/3, 10, 15+1/9);
      p.rect(-4, -20, 8, 1+1/3);
    p.pop();
  }

  p.carOneSideProfile = function(xCoord, yCoord, scal) {
     p.push();
        p.translate(xCoord, yCoord);
        p.scale(scal)

        p.noStroke();
        p.fill(redColor);

        //body:
        p.rect(-100, -35, 200, 70, 5);
        p.rect(-100, -120, 130, 110, 5);
        p.triangle(29.8, -120, 29.8, -20, 50,-20);

        //windows:
        p.fill(255);
        p.rect(-90, -110, 50, 70, 3);
        p.rect(-30, -110, 50, 70, 3);
        p.triangle(19.8, -110, 19.8, -40, 35, -40);

        //wheels:
        p.fill(0);
        p.circle(-50, 35, 55);
        p.circle(50, 35, 55);
     p.pop();
  }

  p.carTwoSideProfile = function(xCoord, yCoord, scal){
     p.push();
        p.translate(xCoord, yCoord);
        p.scale(scal);

        p.noStroke();
        p.fill(orangeColor); 

        //body:
        p.rect(-100, -30, 200, 60, 50);
        p.arc(-5, -30, 120, 115, PI, 2*PI);

        //windows:
        p.fill(255);
        p.arc(0, -30, 95, 95, 3*PI/2, 2*PI);
        p.arc(-10, -30, 95, 95, PI, 3*PI/2);

        //wheels:
        p.fill(0);
        p.circle(-50, 30, 55);
        p.circle(50, 30, 55);
     p.pop();
  }

  p.carThreeSideProfile = function(xCoord, yCoord, scal){
     p.push();
        p.translate(xCoord, yCoord);
        p.scale(scal);

        p.noStroke();
        p.fill(greenColor);

        //body:
        p.rect(-100, -30, 200, 60, 5);
        p.rect(-10, -80, 65, 110, 5);
        p.triangle(53, -80, 53, 30, 100, 30)

        //windows:
        p.fill(255);
        p.rect(0, -70, 50, 40, 5);
        p.triangle(48, -70, 48, -30, 65, -30);

        //wheels:
        p.fill(0);
        p.circle(-50, 30, 55);
        p.circle(50, 30, 55);
     p.pop();
  }


  p.carFourSideProfile = function(xCoord, yCoord, scal) {
     p.push();
        p.translate(xCoord, yCoord);
        p.scale(scal);

        p.noStroke();
        p.fill(blueColor);

        //body:
        p.rect(-100, -35, 200, 70, 5);
        p.rect(-60, -100, 100, 100, 5);
        p.triangle(38, -100, 38, 0, 80, 0);
        p.triangle(-58, -100, -58, 0, -100, 0)

        //windows:
        p.fill(255);
        p.rect(-5, -90, 40, 55, 5);
        p.triangle(33, -90, 33, -35, 55, -35);
        p.rect(-50, -90, 40, 55, 5);
        p.triangle(-48, -90, -48, -35, -72, -35)


        //wheels:
        p.fill(0);
        p.circle(-50, 35, 55);
        p.circle(50, 35, 55);
     p.pop();
  }

  p.drawCar1 = function(carX, carY)
  {
     p.push();
        p.translate(carX, carY);
        p.rotate(p.atan2(carY - p.height / 2, carX - p.width / 2));

        p.fill(200, 200, 200);
        p.noStroke();

        if(p1flag == 1){
           p.carOneTopProfile();
        }
        if(p1flag == 2) {
           p.carTwoTopProfile();
        }
        if(p1flag == 3){
          p.carThreeTopProfile();
        }
        if(p1flag == 4){
          p.carFourTopProfile();
        }
     p.pop();
  }

  p.drawCar2 = function(carX, carY)
  {
     p.push();
        p.translate(carX, carY);
        p.rotate(p.atan2(carY - p.height / 2, carX - p.width / 2));

        p.fill(200, 200, 200);
        p.noStroke();
        
        if(p2flag == 1){
           p.carOneTopProfile();
        }
        if(p2flag == 2) {
           p.carTwoTopProfile();
        }
        if(p2flag == 3){
          p.carThreeTopProfile();
        }
        if(p2flag == 4){
          p.carFourTopProfile();
        }
     p.pop();
  }

  p.drawFlag = function(yLoc)
  {
     p.fill(255);
     p.noStroke();
     p.rect(0, yLoc, p.width, 100);

     for(var i = 0; i < p.width; i+=10)
     {
        for(j = yLoc; j < 100 + yLoc; j += 20)
        {
           if((i / 10) % 2 == 0)
           {
              p.fill(0);
              p.rect(i, j, 10, 10);
           }
           else
           {
              p.fill(0);
              p.rect(i, j + 10, 10, 10);
           }  
        }  
     }
  }

  p.boxes = function(){
     p.push();
        p.background(6, 153, 50);

        p.drawFlag(25);

        //TITLE
        p.textSize(60);
        p.stroke(0);
        p.strokeWeight(5);
        p.textStyle(BOLD);
        p.textStyle(ITALIC);
        p.textFont('Impact');
        p.fill(255, 180, 0);
        p.textAlign(LEFT);
        p.text('RACE  AWAY', 100, 100);

        //Directions
        p.noStroke();
        p.textFont(NORMAL);
        p.textSize(20);
        p.textStyle(BOLD);
        p.fill(255, 250, 0);
        // text('Directions:', 20, 160);
        p.fill(200, 250, 100);
        p.text('P1:\nA to move the car\nS to activate turbo', 15, 160);
        p.text('P2:\nK to move the car\nL to activate turbo',250,160)
        p.fill(0)
        p.text('If you mistime your turbo boost, your car will overheat \nand slow down. Use with care!',15,270)

        p.stroke(0)
        p.strokeWeight(1);
        p.fill(180,180,180)
        p.rect(60,350,360,100)
        p.strokeWeight(4);
        p.fill(255,0,0);
        p.textSize(40);
        p.text('Choose Your Cars!',75,410);
     p.pop();
     
  }

  //65: Key A
  //75: Key K
  p.keyPressed = function() {
     if(count>180)
     {
    if (keyCode == 65 & winningStatement == "") {
      car1Progress += car1Speed;
      
    }
    if (keyCode == 75 && winningStatement == ""){
      car2Progress += car2Speed;
    }
  }
  }

  p.updateCar1 = function()
  {
     var progressRatio = (car1Progress / outerTrackCirc);
     var carAngle = p.atan(progressRatio) * 8;

     car1X = (trackW + laneWidth / 2) * p.cos(carAngle) + p.width / 2;
     car1Y = (trackH + laneWidth / 2) * p.sin(carAngle) + p.height / 2;
  }

  p.updateCar2 = function()
  {
     var progressRatio = (car2Progress / innerTrackCirc);
     var carAngle = p.atan(progressRatio) * 8;

     car2X = (trackW - laneWidth / 2) * p.cos(carAngle) + p.width / 2;
     car2Y = (trackH - laneWidth / 2) * p.sin(carAngle) + p.height / 2;
  }

  /*
  declares which car wins the game and prints that to the screen
  */
  p.endGame = function() {
    if(car1Progress >= outerTrackCirc && car2Progress >= innerTrackCirc) {
      winningStatement = "Tie!!";
    }
    else if(car1Progress >= outerTrackCirc) {
      winningStatement = "Car 1 Wins!!";
    }
    else if(car2Progress >= innerTrackCirc) {
      winningStatement = "Car 2 Wins!!";
    }

    if(winningStatement != "")
    {
      p.background(6, 153, 50);
      p.drawFlag(150);

      p.stroke(0);
      p.strokeWeight(10);
      p.textSize(60);
      p.textStyle(BOLD);
      p.textStyle(ITALIC);
      p.textFont('Impact');
      p.fill(255, 180, 0);
      p.textAlign(CENTER);
      p.text(winningStatement, p.width / 2, 225);
      p.strokeWeight(3);
      p.fill(rematchColor);
      p.rect(90, 300, 130, 40);
      p.fill(newGameColor);
      p.rect(290, 300, 130, 40);
      p.fill(255);
      p.strokeWeight(3);
      p.stroke(0);
      p.textSize(25);
      p.textStyle(NORMAL);
      p.text("REMATCH", 155, 330);
      p.text("NEW GAME", 355, 330);
      p.strokeWeight(1);
    }
  }

  p.drawBackground = function()
  {
     p.background(6, 153, 50);
     p.strokeWeight(laneWidth * 2);
     p.stroke(0);
     p.noFill();

     p.ellipse(p.width / 2, p.height / 2, trackW * 2, trackH * 2);

     p.stroke(255);
     p.strokeWeight(2);
     p.strokeCap(SQUARE);
     for(var i = 0; i < numOfTrackLines * 2; i += 2)
     {
        p.arc(p.width / 2, p.height / 2, trackW * 2, trackH * 2, ((i * PI) / (numOfTrackLines)), ((i + 1) * PI) / (numOfTrackLines));
     }

     p.fill(255);
     p.line(p.width/2 + trackW - laneWidth, p.height / 2, p.width/2 + trackW + laneWidth, p.height / 2); //finish line

     var progressRatio = (-trackDifference / innerTrackCirc);
     var carAngle = p.atan(progressRatio) * 8;

     car2X = (trackW - laneWidth / 2) * p.cos(carAngle) + p.width / 2;
     car2Y = (trackH - laneWidth / 2) * p.sin(carAngle) + p.height / 2;

     p.line(car2X - 10*p.cos(carAngle), car2Y - 10*p.sin(carAngle), car2X + 10*p.cos(carAngle), car2Y + 10*p.sin(carAngle));
     p.noStroke();
  }

  p.playerLocation = function(car1X, car1Y, car2X, car2Y)
  {
     if(car1Progress == 0 && car2Progress <= 0)
     {
        p.push();
           p.stroke(255)
           p.translate(car1X - 10, car1Y - 27);
           p.textSize(12);
           p.fill(255, 0, 0)
           p.text('P 1', 0, 0);
        p.pop();
        p.push();
           p.stroke(255)
           p.translate(car2X - 20, car2Y - 23);
           p.textSize(12);
           p.fill(0, 0, 255);
           p.text('P 2', 0, 0);
        p.pop();
     }
  }

  //76: Key S
  //83: Key L
  p.turbo = function()
  { 
     if(count>200)
     {

     //the turbo speed:
     var newCar1Speed = 20;
     var newCar2Speed = 20; 

     //prints each car's speed in the center of the track
     p.noStroke();
     p.textSize(20);
     p.noStroke();
     p.fill(0);
     p.textSize(15);
     p.textStyle(BOLD);
     p.textAlign(CENTER);
     p.text('P1 Regular Speed : ' + round(originalCar1Speed, 3), p.width/2, 200);
     p.text('P2 Regular Speed : ' + round(originalCar2Speed, 3), p.width/2, 250);
     p.textAlign(LEFT); //sets the texAlign back to normal

     //prints the turbo messages for both cars in the top corners of the screen at certain intervals of Car1Refresh and Car2Refresh
     if(car1Refresh <= 0 && car1Refresh > -150)
     {
        p.textSize(20);
        p.fill(255, 0, 0);
        p.text('TURBO', 20, 50);
        p.noStroke();
        p.fill(0);
        p.textSize(15);
        p.textStyle(BOLD);
        p.text('Press S', 17, 70);
     }
     if(car2Refresh <= 0 && car2Refresh > -150)
     {
        p.textSize(20);
        p.fill(0, 0, 255);
        p.text('TURBO', 382, 50);
        p.noStroke();
        p.fill(0);
        p.textSize(15);
        p.textStyle(BOLD);
        p.text('Press L', 377, 70);
     }

     //stores if the boost is activated for each car in the correct time interval
     if((car1Refresh <= 0 && car1Refresh > -150) && (p.keyIsDown(83))) {
        pressedOnTime1 = true;
     }
     if((car2Refresh <= 0 && car2Refresh > -150) && (p.keyIsDown(76))) {
        pressedOnTime2 = true;
     }

     //if players try to activate the boost in the incorrect time interval, their car's natural speed is reduced by 0.005
     if((car1Refresh > 0 || car1Refresh <= -150) && p.keyIsDown(83) && (pressedOnTime1 != true)) {
        originalCar1Speed-=0.005*(originalCar1Speed);
     }
     if((car2Refresh > 0 || car2Refresh <= -150) && p.keyIsDown(76) && (pressedOnTime2 != true)) {
        originalCar2Speed-=0.005*(originalCar2Speed);
     }

     //if boost is activated in the correct time interval, the boost cycle is reset (a new refreshEvery val is set):
     if(car1Refresh <= 0 && car1Refresh > -150 && p.keyIsDown(83))
     {
        car1Speed = newCar1Speed;
        if(p1flag == 1) {
          refreshEvery1 = 1000000000000;   
        }
        else if(p1flag == 2) {
          refreshEvery1 = p.random(500, 600);
        }
        else if(p1flag == 3) {
          refreshEvery1 = p.random(300, 400);
        }
        else if(p1flag == 4) {
          refreshEvery1 = p.random(225, 275);
        }
        car1Refresh = refreshEvery1;
     }
     if(car2Refresh <= 0 && car2Refresh > -150 && p.keyIsDown(76))
     {
        car2Speed = newCar2Speed;
        if(p2flag == 1) {
          refreshEvery2 = 1000000000000;  
        }
        else if(p2flag == 2) {
          refreshEvery2 = p.random(500, 600);
        }
        else if(p2flag == 3) {
          refreshEvery2 = p.random(300, 400);
        }
        else if(p2flag == 4) {
          refreshEvery2 = p.random(225, 275);
        }
        car2Refresh = refreshEvery2;
     }
     //if the boost is missed, the boost cycle is reset:
     else if(p.floor(car1Refresh) <= -150) {
        pressedOnTime1 = false;
        if(p1flag == 1) {
          refreshEvery1 = 1000000000000;   
        }
        else if(p1flag == 2) {
          refreshEvery1 = p.random(500, 600);
        }
        else if(p1flag == 3) {
          refreshEvery1 = p.random(300, 400);
        }
        else if(p1flag == 4) {
          refreshEvery1 = p.random(225, 275);
        }
        car1Refresh = refreshEvery1;      
     }
     else if(p.floor(car2Refresh) <= -150) {
        pressedOnTime2 = false;
        if(p2flag == 1) {
          refreshEvery2 = 1000000000000;  
        }
        else if(p2flag == 2) {
          refreshEvery2 = p.random(500, 600);
        }
        else if(p2flag == 3) {
          refreshEvery2 = p.random(300, 400);
        }
        else if(p2flag == 4) {
          refreshEvery2 = p.random(225, 275);
        }
        car2Refresh = refreshEvery2;    
     }
     //after 100 time units from boost being activated, the car's speed reverts from boost speed to regular speed
     if(car1Refresh <= refreshEvery1 - 100)
     {
        car1Speed = originalCar1Speed;
     }
     if(car2Refresh <= refreshEvery2 - 100)
     {
        car2Speed = originalCar2Speed;
     }

     //resets the pressedOnTime a little after the last boost is clicked:
     if((car1Refresh + 100) < refreshEvery1) {
        pressedOnTime1 = false;
     }

     if((car2Refresh + 100) < refreshEvery2) {
        pressedOnTime2 = false;
     }   

     //decrements car1Refresh & car2Refresh to count time
     car1Refresh--;
     car2Refresh--;
     }
  }

  /*
  creates the "3, 2, 1, GO" at the beginning of each race
  */
  p.go = function()
  {
     p.textAlign(LEFT);
     if(count > 1 && count < 50)
        {
           p.fill(255, 100, 30);
           p.textSize(100);
           p.stroke(255);
           p.text('3', 225, 290);
        }
        if(count > 51 && count < 100)
        {
           p.fill(255, 100, 30);
           p.textSize(100);
           p.stroke(255);
           p.text('2', 225, 290);
        }
        if(count > 101 && count < 150)
        {
           p.fill(255, 100, 30);
           p.textSize(100);
           p.stroke(255);
           p.text('1', 230, 290);
        }
        if(count > 151 && count < 200)
        {
           p.fill(255, 100, 30);
           p.textSize(100);
           p.stroke(255);
           p.text('GO!', 160, 275);
        }
  }

  /*
  creates the "Select Your Car" screen
  */
  p.choose = function(xLoc,red, yellow, green, blue){
        p.push();
          p.noStroke();
          p.textStyle(BOLD);
          p.textSize(30)
          p.textFont('Impact');
          p.textStyle(ITALIC);
          p.fill(0, 20, 120);
          p.text('Select Your Car:', 150, 50);
          p.text('P1',100,100);
          p.text('P2',350,100);
        p.pop();
        p.push();
          p.translate(120,130)
          p.textSize(20);
          p.fill(0);
          p.textFont(ITALIC);
          p.text('10 speed but no turbo boosts',0,-5);
        p.pop();
        p.push();
          p.translate(120,230)
          p.textSize(20);
          p.fill(0);
          p.textFont(ITALIC);
          p.text('9 speed but has few turbo boosts',0,-5);
        p.pop();
        p.push();
          p.translate(120,330)
          p.textSize(20);
          p.fill(0);
          p.textFont(ITALIC);
          p.text('8 speed and has more turbo boosts',0,-5);
        p.pop();
        p.push();
          p.translate(100,430)
          p.textSize(20);
          p.fill(0);
          p.textFont(ITALIC);
          p.text('6 speed and has frequent turbo boosts',0,-5);
        p.pop();

        //Red Car:
        p.push();
          p.translate(xLoc,0)
          p.fill(red);
          p.noStroke();
          p.translate(60,130);
          p.rect(0,0,120,60);
          p.carOneSideProfile(55,40,0.28);
          p.noStroke();
        p.pop();
        //Orange Car:
        p.push();
          p.noStroke();
          p.translate(xLoc,0);
          p.fill(yellow);
          p.translate(60, 230);
          p.rect(0,0,120,60);
          p.carTwoSideProfile(55,40,0.28);
          p.noStroke();
        p.pop();
        //Green Car:
        p.push();
          p.noStroke();
          p.translate(xLoc,0)
          p.translate(60, 330);
          p.fill(green);
          p.rect(0,0,120,60);
          p.carThreeSideProfile(55,40,0.28);
          p.noStroke()
        p.pop();
        //Blue Car:
        p.push();
          p.noStroke();
          p.translate(xLoc,0)
          p.translate(60, 430);
          p.fill(blue);
          p.rect(0,0,120,60);
          p.carFourSideProfile(55,40,0.28)
          p.noStroke();
        p.pop();  
  }

  p.buttonHoverHighlights = function()
  {
    if(winningStatement != "" && p.mouseX > 90 && p.mouseX < 220 && p.mouseY > 300 && p.mouseY < 340)
    {
      rematchColor = p.color(205, 130, 0);
    }
    else
    {
      rematchColor = p.color(255, 180, 0);
    }

    if(winningStatement != "" && p.mouseX > 290 && p.mouseX < 420 && p.mouseY > 300 && p.mouseY < 340)
    {
      newGameColor = p.color(205, 130, 0);
    }
    else
    {
      newGameColor = p.color(255, 180, 0);
    }
  }

  /*
  presets all speed related vars before each race
  */
  p.presettingAllSpeedVars = function() {
     if(p1flag == 1){ //if player 1 selects car 1
      originalCar1Speed = 10;
      refreshEvery1 = 1000000000000;
     }
     else if(p1flag == 2) { //if player 1 selects car 2
      originalCar1Speed = 9;
      refreshEvery1 = p.random(500, 600);
     }
     else if(p1flag == 3) { //if player 1 selects car 3
      originalCar1Speed = 8;
      refreshEvery1 = p.random(300, 400);
     }
     else if(p1flag == 4) { //if player 1 selects car 4
      originalCar1Speed = 6;
      refreshEvery1 = p.random(225, 275);
     }
     car1Refresh = refreshEvery1;
     car1Speed = originalCar1Speed;

     if(p2flag == p1flag) { //if player 2 selects the same car as player 1
      originalCar2Speed = originalCar1Speed;
      refreshEvery2 = refreshEvery1;
     }
     else if(p2flag == 1){ //else if player 2 selects car 1
      originalCar2Speed = 10;
      refreshEvery2 = 1000000000000;
     }
     else if(p2flag == 2) { //else if player 2 selects car 2
      originalCar2Speed = 9;
      refreshEvery2 = p.random(500, 600);
     }
     else if(p2flag == 3) { //else if player 2 selects car 3
      originalCar2Speed = 8;
      refreshEvery2 = p.random(300, 400);
     }
     else if(p2flag == 4) { //else if player 2 selects car 2
      originalCar2Speed = 6;
      refreshEvery2 = p.random(225, 275);
     }
     car2Refresh = refreshEvery2;
     car2Speed = originalCar2Speed;
  }

  p.mouseClicked = function(){
    if (p.mouseX > 60 && p.mouseX < 420 && p.mouseY > 360 && p.mouseY < 460 && !race){
      selection = true;
    }

     if (p.mouseX > 60 && p.mouseX < 180 && p.mouseY > 130 && p.mouseY < 190 && selection == true){
        p1flag = 1;
        redfill = p.color(180,255,180);
        yellowfill = p.color(180,180,180);
        greenfill = p.color(180,180,180);
        bluefill = p.color(180,180,180);
     }

     else if(p.mouseX > 60 && p.mouseX < 180 && p.mouseY > 230 && p.mouseY < 290 && selection == true){
        p1flag = 2;
        yellowfill = p.color(180,255,180);
        redfill = p.color(180,180,180);
        greenfill = p.color(180,180,180);
        bluefill = p.color(180,180,180);
     }

     else if(p.mouseX > 60 && p.mouseX < 180 && p.mouseY > 330 && p.mouseY < 390 && selection == true){
        p1flag = 3;
        greenfill = p.color(180,255,180);
        bluefill = p.color(180,180,180);
        redfill = p.color(180,180,180);
        yellowfill = p.color(180,180,180);
     }

     else if(p.mouseX > 60 && p.mouseX < 180 && p.mouseY > 430 && p.mouseY < 490 && selection == true){
        p1flag = 4;
        bluefill = p.color(180,255,180);
        greenfill = p.color(180,180,180);
        redfill = p.color(180,180,180);
        yellowfill = p.color(180,180,180);
     }

      if (p.mouseX > 310 && p.mouseX < 430 && p.mouseY > 130 && p.mouseY < 190 && selection == true){
        p2flag = 1;
        redfill2 = p.color(180,255,180);
        yellowfill2 = p.color(180,180,180);
        greenfill2 = p.color(180,180,180);
        bluefill2 = p.color(180,180,180);
     }

     else if(p.mouseX > 310 && p.mouseX < 430 && p.mouseY > 230 && p.mouseY < 290 && selection == true){
        p2flag = 2;
        yellowfill2 = p.color(180,255,180);
        redfill2 = p.color(180,180,180);
        greenfill2 = p.color(180,180,180);
        bluefill2 = p.color(180,180,180);
     }

     else if(p.mouseX > 310 && p.mouseX < 430 && p.mouseY > 330 && p.mouseY < 390 && selection == true){
        p2flag = 3;
        greenfill2 = p.color(180,255,180);
        bluefill2 = p.color(180,180,180);
        redfill2 = p.color(180,180,180);
        yellowfill2 = p.color(180,180,180);
     }

     else if(p.mouseX > 310 && p.mouseX < 430 && p.mouseY > 430 && p.mouseY < 490 && selection == true){
        p2flag = 4;
        bluefill2 = p.color(180,255,180);
        greenfill2 = p.color(180,180,180);
        redfill2 = p.color(180,180,180);
        yellowfill2 = p.color(180,180,180);
     }


     else if(p1flag != 0 && p2flag != 0 && p.mouseX >185 && p.mouseX < 300  && p.mouseY > 200 && p.mouseY < 275){
        race = true;
     }

     if(race == false) {
      p.presettingAllSpeedVars();
     }

     //if player(s) choose rematch at the end of the race:
     if(winningStatement != "" && p.mouseX > 90 && p.mouseX < 220 && p.mouseY > 300 && p.mouseY < 340)
     {
        winningStatement = "";
        car1Progress = 0;
        car2Progress = -trackDifference;
        count = 0;
        p.presettingAllSpeedVars();
     }

     //if player(s) choose new game at the end of the race:
     if(winningStatement != "" && p.mouseX > 290 && p.mouseX < 420 && p.mouseY > 300 && p.mouseY < 340)
     {
        p1flag = 0;
        p2flag = 0;
        race = false;
        selection = false;
        winningStatement = "";
        car1Progress = 0;
        car2Progress = -trackDifference;
        redfill = p.color(180);
        yellowfill = p.color(180);
        greenfill = p.color(180);
        bluefill = p.color(180);
        count = 0;
        redfill2 = p.color(180);
        yellowfill2 = p.color(180);
        greenfill2 = p.color(180);
        bluefill2 = p.color(180);
        p.presettingAllSpeedVars();
     }
  }

  p.draw = function() 
  {
     p.boxes();
     if (selection == true){
      p.background(6, 153, 50);
      p.choose(0,redfill,yellowfill,greenfill,bluefill)
      p.choose(250,redfill2,yellowfill2,greenfill2, bluefill2)

       if (p1flag != 0 && p2flag != 0){
          p.push();
            p.fill(180,180,180);
            p.rect(185,200,115,75)
            p.textStyle(BOLD);
            p.textFont('Impact');
            p.fill(255,0,0);
            p.textSize(40);
            p.strokeWeight(3);
            p.text('RACE!', 195, 250);
          p.pop();

       }
       if (race == true){
        p.drawBackground();
        p.playerLocation(car1X, car1Y, car2X, car2Y);
        p.go();
        p.updateCar1();
        p.updateCar2();
        p.drawCar1(car1X, car1Y);
        p.drawCar2(car2X, car2Y);
        if(winningStatement=="") {
          p.turbo();
        }
        p.push();
          p.endGame();
          count++;
          p.buttonHoverHighlights();
        p.pop();
      }  
    }
  }


};
var myp5 = new p5(s, 'c1');

// Sketch Two
var t = function( p ) { 


  var currentTimeInProg; //the time value dictating the frog's position
  var clickCount = 0; //how many times the user has clicked in the correct area to interact with the program
  var add = 0; //time value that should be added when altering currentTimeInProg

  var upperRightLegRotateVal; 
  var lowerRightLegRotateVal;

  var upperLeftLegRotateVal;
  var lowerLeftLegRotateVal;

  var xCoord; //of frog
  var originalYCoord; //y-coordinate of frog in its original seated position
  var changingYCoord; //y-coordinate of frog at any point in time (as it moves)

  var horizontalDifference = 7; //horizontal distance between the base of the frog's foot and the hip joint
  var verticalDifference; //vertical distance between the base of the frog's foot and the hip joint
  var hypot; //the hypotenuse of the triange constructed -- legs of the triangle set by the above two variables
  var topAnglePt1; //part of the angle that the hip joint needs to rotate (given by the previously constructed triangle)
  var distance = 0.05; //distance that the frog is above the ground

  var topLegSegmentLength = 43;
  var bottomLegSegmentLength = 54;


  p.setup = function() 
  {
     p.createCanvas(400, 400);
     upperRightLegRotateVal = -18*PI/24;
     lowerRightLegRotateVal = 25*PI/28;
     upperLeftLegRotateVal = 18*PI/24;
     lowerLeftLegRotateVal = 25*PI/28;
     xCoord = p.width/2;
     originalYCoord = p.height - 110;
  }

  p.draw = function() 
  {
     p.drawBackground();

     p.determineTimeInProg();

     p.distanceFormulaForJump(400, -800);

     p.calculatingRegularlyChangingNecessaryVals()

     p.drawFrog(xCoord, changingYCoord, upperRightLegRotateVal, lowerRightLegRotateVal, upperLeftLegRotateVal, lowerLeftLegRotateVal, 0.5);
     p.moveFrog();
  }

  p.drawBackground = function(){
    p.background(205, 223, 240); //sky color
    p.noStroke();
    p.fill(74, 176, 79); //hills color
    //hill shape:
    p.beginShape();
      p.curveVertex(-50, p.height + 50);
      p.curveVertex(-50, 250);
      p.curveVertex(-10, 100);
      p.curveVertex(p.width/2, 220);
      p.curveVertex(p.width + 10, 100);
      p.curveVertex(p.width + 50, 250);
      p.curveVertex(p.width + 50, p.height + 50);
    p.endShape(CLOSE);
    p.fill(79, 126, 171); //blue pond color
    p.ellipse(p.width/2, 450, 800, 400); //pond
    p.fill(90, 214, 96); //lily pad color
    p.ellipse(p.width/2, 310, 100, 60); //lily pad
  }

  p.determineTimeInProg = function() {
    p.textAlign(CENTER);
    p.fill(47, 112, 50);
    if(clickCount%2 == 0){
      if(clickCount == 0) {
        p.text("Click Here to Make Frog Jump!", p.width/2, 100);
      }
      else {
        p.text("Click Here to Continue Frog's Jump!", p.width/2, 100);   
      }
      currentTimeInProg = p.millis()/1000 - p.millis()/1000 + add; //add value set in mousePressed()
    }
    else if(clickCount%2 != 0){
      p.text("Click Here to Pause Frog's Jump!", p.width/2, 100);
      currentTimeInProg = p.millis()/1000 - sub + add; //add and sub values set in mousePressed
    }
  }

  p.distanceFormulaForJump = function(initialVelocity, gravity) {
    if(distance == 0) {
      sub = p.millis()/1000;
      add = 0;
    }

    //makes the frog move;
    if(distance <= 0.1) {
      distance = (-1)*(initialVelocity*currentTimeInProg + (1/2)*(gravity)*currentTimeInProg*currentTimeInProg); //kinematics distance formula
    }  
    //rests the frog's position to zero if it stops too low
    if(distance > 0.05) {
      distance = 0;
    }
  }

  p.calculatingRegularlyChangingNecessaryVals = function() {
    changingYCoord = originalYCoord + distance; //decreases y-coord according to the distance formula to move the frog up
    verticalDifference = 18 - distance; //calculates changing vertical distance between hip joint and foot joint

    hypot = p.sqrt(verticalDifference * verticalDifference + horizontalDifference * horizontalDifference) //calculates the hypot the the triangle (the line that connects the hip joint to the foot joint)

    topAnglePt1 = p.atan(horizontalDifference/verticalDifference); //calculates part of the angle needed to rotate the hip joint correctly
  }

  p.drawFrog = function(locX, locY, rotUpperJointR, rotLowerJointR, rotUpperJointL, rotLowerJointL, scal) 
  {
    p.push();
        //move the entire frog
        p.translate(xCoord, changingYCoord);
        p.scale(scal); //scale the entire frog
        // draw body
        p.fill(47, 112, 50);
        p.stroke(0);
        p.ellipse(0, 0, 50, 60); 
        //right leg:
        p.push();
          p.translate(10, 25); //move into PIvot position
          p.rotate(rotUpperJointR); //rotate by rotUpperJointR parameter
          p.ellipse(0, 25, 15, 50);
          //bottom joint of right leg:
          p.push();
            p.translate(0, 43); //move into PIvot position
            p.rotate(rotLowerJointR); //rotate by rotLowerJointR parameter
            p.ellipse(0, 30, 15, 55); 
            //right foot:
            p.push();
              p.translate(0, 54); //move into PIvot position
              p.rotate(-15*PI/24); //rotate right foot    
              p.beginShape();
                p.curveVertex(0, 0);
                p.curveVertex(3, 0);
                p.curveVertex(-3, 20);
                p.curveVertex(-3, 0);
              p.endShape(CLOSE);       
            p.pop();
          p.pop();
        p.pop();
        //left leg:
        p.push();
          p.translate(-10, 25); //move into PIvot position
          p.rotate(rotUpperJointL); //rotate by rotUpperJointL parameter
          p.ellipse(0, 25, 15, 50);
          //bottom joint of left leg:
          p.push();
            p.translate(0, 43); //move into PIvot position
            p.rotate(rotLowerJointL); //rotate by rotLowerJointL parameter
            p.ellipse(0, 30, 15, 55); 
            //left foot:
            p.push();
              p.translate(0, 54); //move into PIvot position
              p.rotate(15*PI/24); //rotate left foot  
              p.beginShape();
                p.curveVertex(0, 0);
                p.curveVertex(-3, 0);
                p.curveVertex(3, 20);
                p.curveVertex(3, 0);
              p.endShape(CLOSE);       
            p.pop();
          p.pop();
        p.pop();
        //head:
        p.push();
          p.translate(0, -20); //move into PIvot position
          p.rotate(0); //rotate head
          p.ellipse(0, -20, 60, 40);
          //right eye:
          p.circle(15, -37, 20);
          p.strokeWeight(0.5);
          p.fill(255);
          p.circle(15, -37, 15);
          p.fill(0);
          p.circle(15, -37, 8);
          //left eye:
          p.strokeWeight(1);
          p.fill(47, 112, 50);
          p.circle(-15, -37, 20);
          p.fill(255);
          p.strokeWeight(0.5);
          p.circle(-15, -37, 15);
          p.fill(0);
          p.circle(-15, -37, 8);
          p.strokeWeight(1);
        p.pop();
        //right arm:
        p.push();
          p.translate(20, -15); //move into PIvot position
          p.rotate(PI/18);
          p.scale(1, 1); //rotate by changing y-scale
          p.ellipse(0, 30, 12.5, 60);
          //right hand:
          p.beginShape();
            p.curveVertex(-10, 70);
            p.curveVertex(0, 58);
            p.curveVertex(7.5, 70);
            p.curveVertex(2.5, 65);
            p.curveVertex(0, 70);
            p.curveVertex(-2.5, 65);
            p.curveVertex(-7.5, 70);
          p.endShape(CLOSE);
        p.pop();
        //left arm:
        p.push();
          p.translate(-20, -15); //move into PIvot position
          p.rotate(-PI/18);
          p.scale(1, 1); //rotate by changing y-sclae
          p.ellipse(0, 30, 12.5, 60);
          //left hand:
          p.beginShape();
            p.curveVertex(10, 70);
            p.curveVertex(0, 58);
            p.curveVertex(-7.5, 70);
            p.curveVertex(-2.5, 65);
            p.curveVertex(0, 70);
            p.curveVertex(2.5, 65);
            p.curveVertex(7.5, 70);
          p.endShape(CLOSE);
        p.pop();
        p.noStroke();
     p.pop();
  }

  p.moveFrog = function() {
    var topAnglePt2 = p.acos((bottomLegSegmentLength*bottomLegSegmentLength - topLegSegmentLength*topLegSegmentLength - hypot*hypot)/((-2)*topLegSegmentLength*hypot)); //law of cosines
    upperRightLegRotateVal = (-1)*(topAnglePt1 + topAnglePt2);
    upperLeftLegRotateVal = topAnglePt1 + topAnglePt2;

    var centerAngle = p.acos((hypot*hypot - topLegSegmentLength*topLegSegmentLength - bottomLegSegmentLength*bottomLegSegmentLength)/((-2)*topLegSegmentLength*bottomLegSegmentLength)); //law of cosines
    lowerRightLegRotateVal = PI - centerAngle;
    lowerLeftLegRotateVal = (-1)*(PI - centerAngle);
  }

  p.mousePressed = function() 
  {
    if(p.mouseX > 100 && p.mouseX < 300 && p.mouseY > 80 && p.mouseY < 110) { //bounding box around text
       clickCount++;
       if(clickCount%2 != 0) {
        //to start/resume jump
        sub = p.millis()/1000;
       }
       else if(clickCount > 1 && clickCount%2 == 0) {
        //to pause jump
        add = currentTimeInProg;
       }
    }
  }



};
var myp5 = new p5(t, 'c2');


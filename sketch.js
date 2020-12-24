const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var gameState = "play";


function preload(){

	iron = loadAnimation("images/Tony Stark-0.png","images/Tony Stark-1.png","images/Tony Stark-2.png",
	"images/Tony Stark-3.png","images/Tony Stark-4.png","images/Tony Stark-5.png","images/Tony Stark-6.png","images/Tony Stark-7.png");

	iron1 = loadImage("images/Tony Stark-Faint.png");

	backgroundImg = loadImage("images/dc.png");
	g = loadImage("images/ground.png");

	pipe1 = loadImage("images/pillar1.png");

	pipe2 = loadImage("images/pillar2.png");

	reset1 = loadImage("images/reset.png");

	gameoverr = loadImage("images/gameover.png");
}


function setup() {
	createCanvas(800,380);
	drawSprites();
	ground = createSprite(400,350,800,60);
	ground.addImage(g);
	ground.scale = 0.8;

	

	bg  = createSprite(400,160);
	bg.addImage(backgroundImg);
	bg.scale = 1.5;

	gameover = createSprite(400,120);
	gameover.addImage(gameoverr);

	reseet = createSprite(400,150);
	reseet.addImage(reset1);
	reseet.scale = 0.2;


	ts =  createSprite(200,100);
	ts.addAnimation("fly",iron);
	ts.addImage(iron1);
	ts.scale = 0.1;

	polesGroup = new Group();
    poleGroup2 = new Group();  

	
	engine = Engine.create();
	world = engine.world;

	
	Engine.run(engine);
	
	
	ts.setCollider("circle",0,0,30);
}


function draw() {
  rectMode(CENTER);
  background(5);
  drawSprites();
  
  if(gameState === "play"){
	if(bg.x < 0){
		bg.x = 400;

	}

	bg.velocityX = -5

	if(ground.x < 0){
		ground.x = 400;

	}

	ground.velocityX = -5

	if(keyDown("space")){
        ts.velocityY = -1; 
     }

	 ts.velocityY += 0.1 
	
	 spawnPoles();
	 if(poleGroup2.isTouching(ts) || polesGroup.isTouching(ts) || ground.isTouching(ts)){
		gameState = "end"; 
  }
  gameover.visible = false;
		reseet.visible = false;
  }
    else if(gameState === "end"){
		ground.velocityX = 0;

		// stopping the background
		bg.velocityX = 0;
	
		ts.changeAnimation("fly",iron);
	
		// stopping the bird 
		ts.velocityY = 0;
		
		polesGroup.setVelocityXEach(0);
		poleGroup2.setVelocityXEach(0);
		
		gameover.visible = true;
		reseet.visible = true;
	
		polesGroup.destroyEach();
		poleGroup2.destroyEach();
	
		if(mousePressedOver(reseet)){
	
			reset();
	
			ts.y = 200;
			ts.changeAnimation("iron",iron);
		}
		
	}


	

 

  
}

function  spawnPoles(){
	if(frameCount% 180 === 0){
	 pole = createSprite(400,random(10,90),20,120);
	 pole.velocityX = -2;
	 pole.addImage(pipe1);
	pole.scale = 0.6;

	 pole2 = createSprite(400,random(270,350),20,120);
	pole2.velocityX = -2;
	pole2.addImage(pipe2);
	pole2.scale = 0.6;

	ground.depth = pole.depth;
	ground.depth += 11;
	
	polesGroup.add(pole);
	poleGroup2.add(pole2);
	}
	
	}
	function reset(){

		gameState = "play"
		
		}
	
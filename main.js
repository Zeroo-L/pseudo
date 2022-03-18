//Global constants
//Resolution
const ScreenX = 800;
const ScreenY = 600;

//Centerpoint of resolution
const ScreenCenterX = ScreenX/2;
const ScreenCenterY = ScreenY/2;


//States
const StateInit = 1;
const StateRest = 2;
const StatePlay = 3;
const StateOver = 4;

//Current state 
let state = StateInit;

//Main Scene
class MainSc extends Phaser.Scene //Create a child class
{
	constructor(){
		super({key: 'ScMain'});
	}
	
	//Load
	prelode(){
		this.load.image('ImageBackground', 'assets/ '); //Make Image
	}
	
	//Create
	create(){
		//Create Background Image
		this.sprBack = this.add.image(ScreenCenterX, ScreenCenterY, 'ImageBackground');
		
		//Trigger Pause scene if p is pressed
		this.input.keyboard.on('keydown-P', function(){
			console.log("Pause game. Press P to resume.");
			this.scene.pause();
			this.scene.launch('ScPause');
		}, this); 
		
		//Resume event if p is pressed
		this.events.on('resume', function(){
			console.log("Game is resumed.");
		}, this);
	}
	
	//Main loop
	update(time, delta){
		switch(state){
			case StateInit:
				console.log("Init");
				state = StateRest;
				break;
			
			case StateRest:
				console.log("Restart");
				state = StatePlay;
				break;
			
			case StatePlay:
				console.log("Play");
				state = StateOver;
				break;
			
			case StateOver:
				console.log("Over");
				break;
		}	
	}
}
//Pause scene
class PauseSc extends Phaser.Scene //Create a child class
{
	constructor(){
		super({key: 'ScPause'});
	}
	
	//If p is pressed, resume game
	create(){
		this.input.keyboard.on('keydown-P', function(){
			this.scene.resume('ScMain')
			this.scene.stop();
		}, this);
	}
}


//Game config
let config = {
	type: Phaser.AUTO,
	width: ScreenX,
	height: ScreenY,
	
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.Center_Both,
	},
	
	scene: [MainSc, PauseSc]
}

let game = new Phaser.Game(config);
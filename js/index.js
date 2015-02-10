// [ Canvas Control ]

var canvas = document.getElementById("game");
var context = canvas.getContext('2d');
var meters=0;


function excute() {
	renewScreen();
	playerManager();
	hurdleManager();
	showScore();
	judgeCrash();
	requestAnimationFrame(excute);
	//console.log(playerMoveStatus);
}

function renewScreen() {
	context.clearRect ( 0 , 0 , canvas.width, canvas.height );
}

function showScore() {
	context.font="20px Verdana";
	context.fillText("meters: "+meters+"m", 50, 50);
	meters++;
}

function restart() {
	window.location.reload();
}


// [ Event Control ]

document.onkeydown = function(event){
	switch (event.keyCode) {
		case 38: // up key
			if (playerJumpStatus != 1) {
				playerJumpStatus = 1;
				playerJumpGoingUp = true;
			}
	}
}




// [ Player Control ]  

var player = new Image();
var playerMove1 = 'img/player_1.png';
var playerMove2 = 'img/player_2.png';
var playerMoveStatus = 0;
var playerJumpStatus = 0;
var playerJumpGoingUp = false;
var playerX = 100;
var playerY = 500;
var playerMoveTime = 10;
player.src = playerMove1;

player.onload = function() {
	context.drawImage(player, playerX, playerY);
}

function playerManager(){
	playerShow();
	playerMove();
	playerJump();

	function playerShow(){
		context.drawImage(player, playerX, playerY);
	}

	function playerMove(){
		if (playerMoveStatus >= 0 && playerMoveStatus <= playerMoveTime) {
			player.src = playerMove2;
			playerMoveStatus = playerMoveStatus + 1;	
		} 
		else if (playerMoveStatus > playerMoveTime) {
			player.src = playerMove1;
			playerMoveStatus = playerMoveStatus + 1;
		}
		if (playerMoveStatus > playerMoveTime * 2) {
			playerMoveStatus = 0;
		}
	}

	function playerJump() {
		if (playerJumpStatus == 1 ) {
			if ( playerJumpGoingUp == true){
				if (playerY <= 500 && playerY > 300) {
					playerY -= 10;
				}
				if (playerY <= 300) {
					playerJumpGoingUp = false;
				}
			} else {
				if (playerY <= 500 && playerY >= 300) {
					playerY += 10;
				}
				if (playerY >=500) {
					playerJumpStatus = 0;
				}
			}
		}
	}
}



// [ Hurdle Control ]

var hurdle1 = new Image();
var hurdle2 = new Image();
var hurdle3 = new Image();
var hurdle1Url = 'img/hurdle_1.png';
var hurdle2Url = 'img/hurdle_2.png';
var hurdle3Url = 'img/hurdle_3.png';
hurdle1.src = hurdle1Url;
hurdle2.src = hurdle2Url;
hurdle3.src = hurdle3Url;
var hurdles = new Array();
var hurdlesX = new Array();
var hurdleFrequency = 80;
var frequencyCount = 0;

function hurdleManager(){

	if(frequencyCount%hurdleFrequency == 0) {
		makeHurdle();
		makeHurdleX();
	}
	locateHurdle();
	moveHurdle();
	removeHurdle();
	frequencyCount++;

	function makeHurdle(){
		var randomNumForHurdleType = Math.floor((Math.random() * 3) + 1);
		switch (randomNumForHurdleType) {
			case 1: 
				hurdles.push(hurdle1);
				break;
			case 2: 
				hurdles.push(hurdle2);
				break;
			case 3: 
				hurdles.push(hurdle3);
				break;
			default:
				break;
		}
	}

	function makeHurdleX() {
		var randomNumForHurdleX = Math.floor(Math.random() * 21);
		hurdlesX.push(2000 + (randomNumForHurdleX * 100) );
	}


	function locateHurdle(){
		for (var i = 0; i < hurdles.length ; i++) {
			context.drawImage(hurdles[i], hurdlesX[i], 450);
		}
	}

	function moveHurdle() {
		for (var i = 0; i < hurdlesX.length ; i++) {
			hurdlesX[i] -= 20;
		}
	}

	function removeHurdle() {
		for (var i = 0; i < hurdlesX.length ; i++) {
			if (hurdlesX[i] < -1500){
				hurdles.splice(i, 1);
				hurdlesX.splice(i, 1);
			}

		}
	}

}



// [ Crash Control ]

function judgeCrash() {
	for (var i = 0; i < hurdlesX.length ; i++) {
		if (hurdlesX[i] == 100) {
			if (hurdles[i] == hurdle1){
				if (playerY > 450 ) { gameover(); }
			} else if (hurdles[i] == hurdle2){
				if (playerY > 400 ) { gameover(); }
			} else {
				if (playerY > 350 ) { gameover(); }
			}	
		}
	}

	function gameover() {
	context.font="50px Verdana"; 
	context.fillText("GAME OVER", 450, 200);
	makeErrorToStop();  // fake function to stop
	console.log("anything");
	}
}



excute();
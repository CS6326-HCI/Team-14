var canvas;
var context;
var keyPressed = {};
var score = 0;
var movingSpeed = 5;
var lives = 3;
var dead;
var candySprite;
var veggieSprite;
var tomatoSprite;
var pastaSprite;
var appleSprite;
var cheeseSprite;
var cherrySprite;
var bagSprite;
var bkgSprite;
var music;
var ding;
var error;
var highScore = localStorage.getItem('highscore') || 0;
var selected = [];


var bag = {
	posX: 200,
	posY: 370,
	disWidth: 100,
	disHeight: 130,
};

var veggie = {
	posX: 150,
	posY: -25,
	disWidth: 60,
	disHeight: 60,
};

var apple = {
	posX: 180,
	posY: -25,
	disWidth: 60,
	disHeight: 60,
};

var cherry = {
	posX: 220,
	posY: -25,
	disWidth: 60,
	disHeight: 60,
};

var cheese = {
	posX: 390,
	posY: -25,
	disWidth: 60,
	disHeight: 60,
};


var candy = {
	posX: 330,
	posY: -25,
	disWidth: 50,
	disHeight: 80,
}

var tomato = {
	posX: 260,
	posY: -25,
	disWidth: 80,
	disHeight: 40,
}

var pasta = {
	posX: 80,
	posY: -25,
	disWidth: 60,
	disHeight: 90,
}

window.onload = init;

function init() {
	canvas = document.getElementById("myCanvas");
	context = canvas.getContext("2d");
	var x = canvas.width / 2;
	var y = canvas.height / 2;
	context.font = "20px Verdana";
	context.fillStyle = 'black';
	context.textAlign = 'center';
	context.fillText('In this game, you need to catch the food you like', x, 200);
	context.fillText('collect the veggies, fruits and snacks!', x, 244);
	context.fillText('Use the arrow keys to move the bag.', x, 276);
	context.fillText('Click anywhere inside the box to start.', x, 320);
	canvas.addEventListener('mousedown', chooseDifficulty, false);
	candySprite = document.getElementById('candy');
	appleSprite = document.getElementById('apple');
	cheeseSprite = document.getElementById('cheese');
	cherrySprite = document.getElementById('cherry');
	veggieSprite = document.getElementById('veggie');
	tomatoSprite = document.getElementById('tomato');
	pastaSprite = document.getElementById('pasta');
	bagSprite = document.getElementById('bag');
	bkgSprite = document.getElementById('background');
	error = document.getElementById('error');
	window.onkeydown = keydown;
	window.onkeyup = keyup;
}

function chooseDifficulty() {
	context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.width, canvas.height);
	$('.myButtonE').css('display', 'inline-block');
	$('.myButtonH').css('display', 'inline-block');
	context.font = "30px Verdana";
	context.fillStyle = 'black';
	context.textAlign = 'center';
	context.fillText('Click the button below to start', 250, 250);
}

function drawEasy() {
	$('.myButtonE').css('display', 'none');
	$('.myButtonH').css('display', 'none');
	canvas.removeEventListener('mousedown', chooseDifficulty, false);
	if (!dead) {
		context.drawImage(bkgSprite, 0, 0, 500, 500);
		context.drawImage(bagSprite, bag.posX, bag.posY, bag.disWidth, bag.disHeight);
		context.drawImage(veggieSprite, veggie.posX, veggie.posY, veggie.disWidth, veggie.disHeight);
		context.drawImage(candySprite, candy.posX, candy.posY, candy.disWidth, candy.disHeight);
		context.drawImage(appleSprite, apple.posX, apple.posY, apple.disWidth, apple.disHeight);
		context.drawImage(cheeseSprite, cheese.posX, cheese.posY, cheese.disWidth, cheese.disHeight);
		context.drawImage(cherrySprite, cherry.posX, cherry.posY, cherry.disWidth, cherry.disHeight);
		context.font = "17px Verdana";
		context.fillStyle = 'red';
		context.fillText('Score: ' + score, 40, 20);
		context.fillText('Lives: ' + lives, 40, 37);

		veggie.posY = veggie.posY + movingSpeed;
		candy.posY = candy.posY + movingSpeed;

		if (keyPressed[39]) {
			bag.posX = bag.posX + movingSpeed;
		}
		if (keyPressed[37]) {
			bag.posX = bag.posX - movingSpeed;
		}
		checkCollision();
		requestAnimationFrame(drawEasy);
	}
}

function drawHard() {
	$('.myButtonE').css('display', 'none');
	$('.myButtonH').css('display', 'none');
	canvas.removeEventListener('mousedown', chooseDifficulty, false);
	if (!dead) {
		context.drawImage(bkgSprite, 0, 0, 500, 500);
		context.drawImage(bagSprite, bag.posX, bag.posY, bag.disWidth, bag.disHeight);
		context.drawImage(veggieSprite, veggie.posX, veggie.posY, veggie.disWidth, veggie.disHeight);
		context.drawImage(candySprite, candy.posX, candy.posY, candy.disWidth, candy.disHeight);
		context.drawImage(tomatoSprite, tomato.posX, tomato.posY, tomato.disWidth, tomato.disHeight);
		context.drawImage(pastaSprite, pasta.posX, pasta.posY, pasta.disWidth, pasta.disHeight);
		context.drawImage(appleSprite, apple.posX, apple.posY, apple.disWidth, apple.disHeight);
		context.drawImage(cheeseSprite, cheese.posX, cheese.posY, cheese.disWidth, cheese.disHeight);
		context.drawImage(cherrySprite, cherry.posX, cherry.posY, cherry.disWidth, cherry.disHeight);
		context.font = "17px Verdana";
		context.fillStyle = 'red';
		context.fillText('Score: ' + score, 40, 20);
		context.fillText('Lives: ' + lives, 40, 37);

		veggie.posY = veggie.posY + movingSpeed;
		candy.posY = candy.posY + movingSpeed;
		tomato.posY = tomato.posY + movingSpeed;
		pasta.posY = pasta.posY + movingSpeed;
		cheese.posY = cheese.posY + movingSpeed;
		apple.posY = apple.posY + movingSpeed;
		cherry.posY = cherry.posY + movingSpeed;

		if (keyPressed[39]) {
			bag.posX = bag.posX + movingSpeed;
		}
		if (keyPressed[37]) {
			bag.posX = bag.posX - movingSpeed;
		}
		checkCollision();
		requestAnimationFrame(drawHard);
	}
}

function checkCollision() {
	if (bag.posX + bag.disWidth == canvas.width) {
		bag.posX = bag.posX - 5;
	}
	if (bag.posX == 0) {
		bag.posX = bag.posX + 5;
	}
	if (veggie.posY + veggie.disHeight == bag.posY && bag.posX < veggie.posX + veggie.disWidth && veggie.posX < bag.posX + bag.disWidth) {
		var randVegX = Math.floor((Math.random() * 440) + 1);
		veggie.posX = randVegX;
		veggie.posY = -25;
		selected.push('Broccoli');
		score++;

	}
	if (veggie.posY + veggie.disHeight == canvas.height) {
		var randVegX = Math.floor((Math.random() * 440) + 1);
		veggie.posX = randVegX;
		veggie.posY = -25;
		lives--;
		if (lives == -1) {
			dead = true;
			gameOver();
		}
	}


	if (candy.posY + candy.disHeight == bag.posY && bag.posX < candy.posX && candy.posX + candy.disWidth < bag.posX + bag.disWidth) {
		var randCanX = Math.floor((Math.random() * 440) + 1);
		candy.posX = randCanX;
		candy.posY = -25;
		lives--;
		if (lives == -1) {
			dead = true;
			gameOver();
		}
	}
	if (candy.posY + candy.disHeight == canvas.height) {
		var randCanX = Math.floor((Math.random() * 440) + 1);
		candy.posX = randCanX;
		candy.posY = -25;
	}

	if (tomato.posY + tomato.disHeight == bag.posY && bag.posX < tomato.posX && tomato.posX + tomato.disWidth < bag.posX + bag.disWidth) {
		var randCanX2 = Math.floor((Math.random() * 440) + 1);
		tomato.posX = randCanX2;
		tomato.posY = -25;
		selected.push('Tomato');

		if (lives == -1) {
			dead = true;
			gameOver();
		}
	}
	if (tomato.posY + tomato.disHeight == canvas.height) {
		var randCanX2 = Math.floor((Math.random() * 440) + 1);
		tomato.posX = randCanX2;
		tomato.posY = -25;

	}


	if (apple.posY + apple.disHeight == bag.posY && bag.posX < apple.posX && apple.posX + apple.disWidth < bag.posX + bag.disWidth) {
		var randCanX2 = Math.floor((Math.random() * 440) + 1);
		apple.posX = randCanX2;
		apple.posY = -25;
		selected.push('Apple');

		if (lives == -1) {
			dead = true;
			gameOver();
		}
	}
	if (apple.posY + apple.disHeight == canvas.height) {
		var randCanX2 = Math.floor((Math.random() * 440) + 1);
		apple.posX = randCanX2;
		apple.posY = -25;

	}


	if (cheese.posY + cheese.disHeight == bag.posY && bag.posX < cheese.posX && cheese.posX + cheese.disWidth < bag.posX + bag.disWidth) {
		var randCanX2 = Math.floor((Math.random() * 440) + 1);
		cheese.posX = randCanX2;
		cheese.posY = -25;
		selected.push('Cheese');

		if (lives == -1) {
			dead = true;
			gameOver();
		}
	}
	if (cheese.posY + cheese.disHeight == canvas.height) {
		var randCanX2 = Math.floor((Math.random() * 440) + 1);
		cheese.posX = randCanX2;
		cheese.posY = -25;

	}


	if (cherry.posY + cherry.disHeight == bag.posY && bag.posX < cherry.posX && cherry.posX + cherry.disWidth < bag.posX + bag.disWidth) {
		var randCanX2 = Math.floor((Math.random() * 440) + 1);
		cherry.posX = randCanX2;
		cherry.posY = -25;
		selected.push('Cherry');

		if (lives == -1) {
			dead = true;
			gameOver();
		}
	}
	if (cherry.posY + cherry.disHeight == canvas.height) {
		var randCanX2 = Math.floor((Math.random() * 440) + 1);
		cherry.posX = randCanX2;
		cherry.posY = -25;

	}




	if (pasta.posY + pasta.disHeight == bag.posY && bag.posX < pasta.posX && pasta.posX + pasta.disWidth < bag.posX + bag.disWidth) {
		var randCanX3 = Math.floor((Math.random() * 440) + 1);
		pasta.posX = randCanX3;
		pasta.posY = -25;
		selected.push('Pasta');

		if (lives == -1) {
			dead = true;
			gameOver();
		}
	}
	if (pasta.posY + pasta.disHeight == canvas.height) {
		var randCanX3 = Math.floor((Math.random() * 440) + 1);
		pasta.posX = randCanX3;
		pasta.posY = -25;

	}
}


function gameOver() {
	const letters = new Set(selected);
	console.log(selected)
	const newArr = [...letters];
	var x = canvas.width / 2;
	var y = canvas.height / 2;
	context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.font = "20px Verdana";
	context.fillStyle = 'red';
	context.fillText('GAME OVER', x, 200);
	context.fillStyle = 'black';
	context.fillText('Favoured Ingredients: ' + newArr, x, 300);
	$('.myButtonR').css('display', 'inline-block');

	var obj = new player(localStorage.getItem("player"), newArr);
	var array = [];
	array.push(obj);
	var temp = localStorage.getItem("playerInfo");
	if (temp != "") {
		parsedData = JSON.parse(localStorage.getItem("playerInfo"));
		for (let i = 0; i < parsedData.length; i++) {
			tempPlayer = new player(parsedData[i].name, parsedData[i].result);
			array.push(tempPlayer);
		}
	}

	localStorage.setItem("playerInfo", JSON.stringify(array));



}

var name;
var result;

function player(name, result) {
	this.name = name;
	this.result = result;
	return this;
}

function replay() {
	location.reload();
}

function keydown(e) {
	keyPressed[e.keyCode] = true;
}

function keyup(e) {
	keyPressed[e.keyCode] = false;
}

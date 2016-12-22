// contains the load state along with global variables an functions for use in the game.


var lastY = 300;
var lastPlatform;
var scrollSpeed = -50;
var eating = false;
var currentCarrot;
var squashedSnowman;
var jumpCount = 0;
var score = 0;
var timer = 0;
var lives = 3;
var volume = {
	music: 0.8,
	sfx: 0.2
};
var sounds = {
	music: "",
	jump: "",
	carrot_nom: "",
	snow_on_cement: ""
};
var music;
var format = Phaser.AUTO;
var highScore = 0;

if(navigator.userAgent.includes("Chrome")) {
	music = "./sounds/The_Secret_Garden.mp3";
} else if (navigator.userAgent.includes("Firefox")) {
	format = Phaser.CANVAS;
	music = "./sounds/The_Secret_Garden.mp3";
} else {
	music = "./sounds/The_Secret_Garden1.wav";
}

var game = new Phaser.Game(800, 600, format, '#gwen');

var loadState = {
	preload: function() {
		game.load.image('background', '/stuff/sky1.png');
		game.load.image('ledge', '/stuff/snow-ledge.png');
		game.load.image('ice-ledge', '/stuff/ice-platform1.png');
		game.load.image('carrot', '/stuff/carrot.png');
		game.load.image('carrot-top', '/stuff/carrot-top.png');
		game.load.image('snowman', '/stuff/snowman.png');
		game.load.image('snowflake', 'stuff/snowflake.png');
		game.load.image('bigBunny', 'stuff/bunny-big.png');
		game.load.audio('jump', './sounds/jumping.wav', true);
		game.load.audio('snow-on-cement', './sounds/snow-on-cement.wav', true);
		game.load.audio('carrot-nom', './sounds/carrot-nom.wav', true);
		game.load.audio('music', music, true);

		game.load.spritesheet('bunny', '/stuff/bunny-bow.png', 32, 48);
	},
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.state.start('menu');
		sounds = {
			music: game.sound.add('music', volume.music, true),
			jump: game.sound.add('jump', volume.sfx),
			carrot_nom: game.sound.add('carrot-nom', volume.sfx, false),
			snow_on_cement: game.sound.add('snow-on-cement', volume.sfx, false)
		};
	}
};

function setScrollSpeed(x) {
	if (x) scrollSpeed -= x;
	carrots.setAll('body.velocity.x', scrollSpeed);
	platforms.setAll('body.velocity.x', scrollSpeed);
	emitter.maxParticleSpeed.x = scrollSpeed - 25;
	emitter.minParticleSpeed.x = scrollSpeed - 75;
}

function setCarrot(play, car) {
	currentCarrot = car;
}

function placeCarrot(x, y) {
	x += Math.random() * 112;
	carrots.create(x, y - 34, 'carrot-top');
	carrots.setAll('body.velocity.x', scrollSpeed);
	carrots.setAll('body.allowGravity', false);
}

function eatCarrot() {
	eating = true;
	player.body.velocity.x = 0;
	var y = currentCarrot.body.position.y;
	var x = player.body.position.x;
	currentCarrot.kill();
	currentCarrot = eaten.create(x, y-95, 'carrot');
	currentCarrot.body.velocity.x = scrollSpeed;
	sounds.carrot_nom.play();
	setTimeout(function() {
		currentCarrot.kill();
		currentCarrot = eaten.create(x - 15, y - 25, 'carrot-top');
		currentCarrot.body.angularVelocity = -180;
		currentCarrot.body.velocity.y = -200;
		currentCarrot.body.velocity.x = scrollSpeed - 10;
		score += 100;
		setScrollSpeed(10);
		scoreText.text = 'Score: ' + score;
		eating = false;
		sounds.carrot_nom.play();
	}, 300);
}

function placeSnowman(x, y) {
	snowmen.create(x + 10, y - 50, 'snowman');
	snowmen.setAll('body.velocity.x', scrollSpeed - 25);
}

function moveSnowman(snowman, platform) {
	// flip snowman velocity when hitting edges of platform
	if (snowman.body.position.x >= platform.body.position.x + platform.body.width - snowman.body.halfWidth) {
		snowman.body.velocity.x = scrollSpeed - 25;
	} else if (snowman.body.position.x <= platform.body.position.x - snowman.body.halfWidth) {
		snowman.body.velocity.x = -scrollSpeed + 25;
	}
}

function fightSnowman(player, snowman) {

	if (player.body.position.y < snowman.body.position.y - 47) {
		jumpCount = 1;
		// squash snowman to half scale
		if (snowman.scale.y === 1) {
			snowman.scale.y = 0.5;
			sounds.snow_on_cement.play();
			snowman.body.position.y += snowman.body.halfHeight;
			snowman.body.velocity.x = scrollSpeed;
			explodeSnowman(snowman);
			player.body.velocity.y = -150;
		} else {
			// finish killing snowman
			explodeSnowman(snowman);
			sounds.snow_on_cement.play();
			snowman.kill();
			player.body.velocity.y = -150;
			setScrollSpeed(-2);
			score += 150;
			scoreText.text = 'Score: ' + score;
		}
	} else {
		if (player.body.position.x > snowman.body.position.x + snowman.body.halfWidth) {
			// if player is right of snowman, increase snowman velocity to shove player
			snowman.body.velocity.x = 600;
		} else {
			// if player is left of snowman, decrease snowman velocity to shove player
			snowman.body.velocity.x = -600;
		}
	}
}

function explodeSnowman(snowman) {
	squashedSnowman = game.add.emitter(snowman.body.position.x + snowman.body.halfWidth, snowman.body.position.y + snowman.body.height, 20);
	squashedSnowman.width = snowman.body.width;
	squashedSnowman.minParticleScale = 2;
	squashedSnowman.maxParticleScale = 3;
	squashedSnowman.makeParticles('snowflake', 0, 10, true, false);

	squashedSnowman.start(true, 0, 50, 20, 20);
	squashedSnowman.setAllChildren('enableBody', true);
	squashedSnowman.setAllChildren('body.velocity.y', -100);
	squashedSnowman.bounce.y = 0.3;
}


function setFriction(player, platform) {

	if (platform.key === "ledge") {
		if (player.body.velocity.x > 10) {
			player.body.velocity.x -= 10;
		} else if (player.body.velocity.x < -10) {
			player.body.velocity.x += 10;
		} else {
			player.body.velocity.x = 0;
		}
	} else if (platform.key === "ice-ledge") {
		// platform.body.friction.x = 0;
		if (player.body.velocity.x >= 0) {
			player.body.acceleration.x = 0;
		} else if (player.body.velocity.x < 0) {
			player.body.acceleration.x = 0;
		} else {
			player.body.velocity.x = 0;
		}
	}
	lastPlatform = platform;
}

function airFriction() {
	if(player.body.velocity.x > 0) {
		player.body.acceleration.x = -100;
	} else if (player.body.velocity.x < 0) {
		player.body.acceleration.x = 100;
	}
}

function setNextLedge() {
	var rando = Math.random();
	var newLedge;
	var y = Math.max(Math.min(lastY + (rando * 400 - 150), 550), 60);
	var x = 800 + Math.random() * 50;

	platforms.forEachAlive(function(each) {
		if (lastY === 550) y = 425;
		if(each.position.x < -160 && each.alive) {
			each.kill();
			if(rando > 0.49) {
				newLedge = platforms.create(x, y, 'ice-ledge');
				newLedge.body.setSize(150, 33, 2, 0);
				if (rando > 0.84) placeSnowman(x, y);
			} else {
				newLedge = platforms.create(x, y, 'ledge');
				newLedge.body.setSize(149, 44, 3, 0);
				if (rando > 0.33) {
					placeCarrot(x, y);
				}
			}
			lastY = y;
		}
	});
	platforms.setAll('body.allowGravity', false);
	platforms.setAll('body.immovable', true);
	platforms.setAll('body.velocity.x', scrollSpeed);
}

function playerFall() {
	lives--;
	if (!lastPlatform.alive) {
		lastPlatform = platforms.getFirstAlive();
	}
	if (lives > 0) {
		// player.body.position.x = lastPlatform.body.position.x + 100;
		// player.body.position.y = lastPlatform.body.position.y - 50;
		// livesText.text = "Lives: " + lives;
		game.state.start('dead');
	} else {
		game.state.start('gameover');
	}
}

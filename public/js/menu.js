var menuState = {
	create: function() {
		var bg = game.add.tileSprite(0, 0, 800, 600, 'background');
		bg.scale.setTo(3, 2);
		var nameLabel = game.add.text(80, 80, 'Gwendolyn the Rabbit', {font: '50px Fantasy', fill: '#dd5599'});
		var menuLabel = game.add.text(80, 380, 'Press "Enter" to start', {font: '30px Arial', fill: '#dd5599'});
		game.add.text(80, 180, 'Use arrow keys to move', {font: '30px Arial', fill: '#dd5599'});
		game.add.text(80, 230, 'Press "UP" to jump, press again to DoubleJump', {font: '30px Arial', fill: '#dd5599'});
		game.add.text(80, 280, 'Press "DOWN" to eat carrots', {font: '30px Arial', fill: '#dd5599'});
		game.add.text(80, 330, 'Press "SPACE" to pause', {font: '30px Arial', fill: '#dd5599'});
		// sounds.music.play();
	}
};

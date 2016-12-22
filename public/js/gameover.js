var gameoverState = {
	bunny: "",
	create: function() {

		if (score > highScore) {
			highScore = score;
			window.localStorage.highScore = highScore;
		}

		var nameLabel = game.add.text(270, 80, 'Game Over', {font: '50px Arial', fill: '#dd5599'});
		game.add.text(80, 450, 'Your Score: ' + score, {font: '30px Arial', fill: '#dd5599'});
		game.add.text(80, 500, 'Your Highest Score: ' + highScore, {font: '30px Arial', fill: '#dd5599'});
		game.add.text(80, 550, 'Press "Enter" to play again!', {font: '30px Arial', fill: '#dd5599'});
		this.bunny = game.add.sprite(0, 0, 'bigBunny');
		game.physics.arcade.enable(this.bunny);
		this.bunny.body.allowGravity = false;
		this.bunny.body.setSize(140, 232, 140, 232);
		this.bunny.body.angularVelocity = 360;
		this.bunny.body.velocity.x = 200;
		this.bunny.body.velocity.y = 200;
		console.log(this.bunny);
	},
	update: function() {
		if (this.bunny.scale.x > 0) {
			this.bunny.scale.x -= 0.01;
			this.bunny.scale.y -= 0.01;
		}

	}
};

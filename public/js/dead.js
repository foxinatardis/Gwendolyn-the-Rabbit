var deadState = {
	create: function() {
		var bg = game.add.tileSprite(0, 0, 800, 600, 'background');
		bg.scale.setTo(3, 2);
		var nameLabel = game.add.text(80, 80, 'You fell down the rabbit hole', {font: '50px Arial', fill: '#dd5599'});
		var menuLabel = game.add.text(80, 380, 'Press "SPACE" to use your next life', {font: '30px Arial', fill: '#dd5599'});
	}
};

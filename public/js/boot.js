var bootState = {
	preload: function() {

	},
	create: function() {
		game.add.text(300, 300, 'Loading...', {font: '50px Fantasy', fill: '#dd5599'});
		game.state.start('load');
	}
};

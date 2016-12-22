game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('gameover', gameoverState);
game.state.add('dead', deadState);
game.state.start('boot');

window.onkeyup = function(e) {
	var key = e.keyCode;

	if (key == 32) {
		if(game.state.current === "play") {
			game.paused = !game.paused;
		} else {
			game.state.start('play');
		}
	} else if (key == 13 && (game.state.current === "menu" || game.state.current === "gameover")) {
		score = 0;
		lives = 3;
		game.state.start('play');
	} else if (key == 27) {
		if (!game.scale.isFullScreen) {
			game.scale.startFullScreen();
		} else {
			game.scale.stopFullScreen();
		}

	}
};

function setMusicVol(value) {
	volume.music = value / 10;
	sounds.music.volume = volume.music;
}

function setSFXVol(value) {
	volume.sfx = value / 10;
	sounds.jump.volume = volume.sfx;
	sounds.carrot_nom.volume = volume.sfx;
	sounds.snow_on_cement.volume = volume.sfx;
}

if (!window.localStorage.highScore) {
	window.localStorage.highScore = 0;
} else {
	highScore = window.localStorage.highScore;
}

game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('gameover', gameoverState);
game.state.add('dead', deadState);
game.state.start('load');

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
	if(music) music.volume = volume.music;
}

function setSFXVol(value) {
	volume.sfx = value / 10;
}

if (!window.localStorage.highScore) {
	window.localStorage.highScore = 0;
} else {
	highScore = window.localStorage.highScore;
}

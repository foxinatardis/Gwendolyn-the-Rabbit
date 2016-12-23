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
		} else if (lives > 0){
			game.state.start('play');
		}
	} else if (key == 13 && (game.state.current === "menu" || game.state.current === "gameover")) {
		score = 0;
		lives = 3;
		nextLife = 5000;
		game.state.start('play');
	}
};

document.getElementById('in').addEventListener('click', zoomIn);
document.getElementById('out').addEventListener('click', zoomOut);

function zoomIn() {
	zoom = Math.min((zoom + 0.1), 1.8);
	document.getElementById('gwen').style.zoom = zoom;
}

function zoomOut() {
	zoom = Math.max((zoom - 0.1), 0.2);
	document.getElementById('gwen').style.zoom = zoom;
}

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

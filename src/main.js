import Boot from './states/Boot';
import Preload from './states/Preload';
import Menu from './states/Menu';
import Play from './states/Play';
import GameOver from './states/GameOver';

class Game extends Phaser.Game {

	constructor () {

		super(700, 600, Phaser.AUTO, 'game', null);

		this.state.add('boot', Boot);
		this.state.add('preload', Preload);
		this.state.add('menu', Menu);
		this.state.add('play', Play);
		this.state.add('gameover', GameOver);

		this.state.start('boot');

	}

}

var game = new Game();
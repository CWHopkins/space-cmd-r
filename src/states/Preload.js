export default class Preload extends Phaser.State {

	constructor () {

		this.images =  [
			{ title : 'starfield', src : 'starfield.png' },
			{ title : 'bullet', src : 'bullet.png' },
			{ title : 'ember', src : 'ember.png' },
			{ title : 'enemy-purple', src : 'enemy.png' },
			{ title : 'enemy-orange', src : 'enemy-orange.png' },
			{ title : 'overlay', src : 'overlay.png' },
			{ title : 'particle-purple', src : 'particle-purple.png' },
			{ title : 'particle-orange', src : 'particle-orange.png' },
			{ title : 'player', src : 'player.png' },
			{ title : 'press-any-key', src : 'press-any-key.png' },
			{ title : 'gameover', src : 'gameover.png' },
			{ title : 'shield', src : 'shield.png' },
			{ title : 'star', src : 'star.png' },
			{ title : 'title', src : 'title.png' }
		];

	}

	preload () {

		this.images.forEach(image => {
			this.game.load.image(image.title, 'assets/' + image.src);
		});

	};

	create () {

		this.game.state.start('menu');

	};

};
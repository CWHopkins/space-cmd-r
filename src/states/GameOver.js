export default class GameOver extends Phaser.State {

	preload () { };

	create () { 

		this.title = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'gameover');
		this.title.anchor.setTo(0.5, 0.5);

		this.spaceBar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	};

	update () {

		if (this.spaceBar.isDown) {
			this.game.state.start('menu');
		}

	}

}
export default class Menu extends Phaser.State {

	create () {

		this.starfield = this.game.add.tileSprite(0, 0, 700, 600, 'starfield');
		this.starfield.alpha = 0;

		this.overlay = this.game.add.tileSprite(0, 0, 700, 600, 'overlay');
		this.star = this.add.sprite(0, 0, 'star');


		this.title = this.game.add.sprite(this.game.world.centerX, -300, 'title');
		this.title.anchor.setTo(0.5, 0.5);

		this.add.tween(this.starfield).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
		this.add.tween(this.title).to({ y: this.game.world.centerY }, 2000, Phaser.Easing.Elastic.Out, true, 1000);

		this.pressAnyKey = this.add.sprite(this.world.centerX, this.world.height - 50, 'press-any-key');
		this.pressAnyKey.anchor.setTo(0.5, 0);

		this.spaceBar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	};

	fadeOut () {

		this.add.tween(this.starfield).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
		this.add.tween(this.pressAnyKey).to({ y : this.game.world.height + this.pressAnyKey.height }, 1000, Phaser.Easing.Linear.None, true);
		this.add.tween(this.title)
			.to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true)
			.onComplete.add(this.start, this);

	};

	start () {

		this.game.state.start('play', true);

	};

	update () {

		if (this.spaceBar.isDown) {
			this.fadeOut()
		}

	};

}
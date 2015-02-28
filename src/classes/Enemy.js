export default class Enemy extends Phaser.Sprite {

	constructor (game, x, y, sprite) {

		super(game, x, y, sprite);

		this.anchor.setTo(0.5, 0.5);

		// Is the enemy alive?
		this.alive = false;
		this.exists = false;
		this.enableBody = true;

		this.maxHP = 1;
		this.score = 10;
		this.speed = 1;
		this.speedModifier = 1;

		// Enabled arcade physics and add to the game.
		game.physics.enable(this, Phaser.Physics.ARCADE);
		game.add.existing(this);


	}

	spawn (x, y) {

		this.reset(x, y, this.maxHP);

	}

	kill () {

		super.kill();

	}

	update (baseSpeed) {

		this.body.velocity.y = 200 * this.speedModifier;
		this.angle += 3;

	}

};
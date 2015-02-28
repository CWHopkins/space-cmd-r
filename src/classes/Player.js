export default class Player extends Phaser.Sprite {

	constructor (game, bullets) {

		super(game, game.world.width/2 - 15, game.world.height + 35, 'player');

		this.game = game;
		this.anchor.setTo(0.5, 0.5);

		this.bullets = bullets;
		this.bulletTime = 0;

		game.physics.enable(this, Phaser.Physics.ARCADE);
		
		game.add.existing(this);

		// Create inputs for the keyboard.
		this.cursors = game.input.keyboard.createCursorKeys();
		this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		game.add.tween(this)
			.to({ y : game.world.height - 50 }, 1000, Phaser.Easing.Linear.None, true)
			.onComplete.add(function () {
				this.body.collideWorldBounds = true;
			}, this)

	}

	update () {

		var friction = 0.9,
			velocity = 400;

		if (this.alive) {

			this.body.velocity.x = this.body.velocity.x * friction;

			if (this.cursors.left.isDown) {

				this.body.velocity.x = -velocity;
				this.game.add.tween(this).to({ angle: -15 }, 100, null, true, 0);

			} else if (this.cursors.right.isDown) {

				this.body.velocity.x = velocity;
				this.game.add.tween(this).to({ angle: 15 }, 100, null, true, 0);

			} else {

				this.game.add.tween(this).to({ angle: 0 }, 100, null, true, 0);

			}

			if (this.fireButton.isDown) {
				this.fire();
			}

		}


	};

	fire () {

		var bullet = this.bullets.getFirstExists(false);

		if (this.game.time.now > this.bulletTime) {

			if (bullet) {

				bullet.reset(this.x, this.y - this.body.halfHeight);
				bullet.body.velocity.y = -500;

				this.bulletTime = this.game.time.now + 350;

			}

		}

	};

};
import Player from '../classes/Player';
import Enemy from '../classes/Enemy';
import EnemyOrange from '../classes/EnemyOrange';
import EnemyPurple from '../classes/EnemyPurple';

export default class Play extends Phaser.State {

	constructor () {

		this.enemyTime = 0;
		this.enemyLimit = 5;

		this.baseSpeed = 1;
		this.scoreString = 'Score: ';

	};

	preload () {

		this.stage.backgroundColor = '#000000';

	};

	create () {

		var bullets,
			explosionEmitter,
			i;

		this.starfield = this.game.add.tileSprite(0, 0, 700, 600, 'starfield');
		this.starfield.alpha = 0;

		this.overlay = this.game.add.tileSprite(0, 0, 700, 600, 'overlay');

		bullets = this.game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(30, 'bullet');
		bullets.setAll('anchor.x', 0.5);
		bullets.setAll('anchor.y', 1);
		bullets.setAll('outOfBoundsKill', true);
		bullets.setAll('checkWorldBounds', true);

		this.bullets = bullets;

		explosionEmitter = this.game.add.emitter(0, 0, 1000);

		explosionEmitter.makeParticles('particle-orange');
		explosionEmitter.minParticleSpeed.setTo(-200, -200);
		explosionEmitter.maxParticleSpeed.setTo(200, 200);
		explosionEmitter.minParticleScale = 0.2;
		explosionEmitter.maxParticleScale = 1;
		explosionEmitter.gravity = 0;

		this.explosionEmitter = explosionEmitter;

		this.score = 0;
		this.scoreLabel = this.game.add.text(this.game.world.width - 200, 10, this.scoreString + this.score, { 
			font : '34px Helvetica', 
			fill : '#FFFFFF' 
		});

		this.player = new Player(this.game, this.bullets);

		this.setupEnemies();
		
		//enemies.enableBody = true;
		//enemies.physicsBodyType = Phaser.Physics.ARCADE;
		//enemies.createMultiple(30, 'enemy');
		//enemies.setAll('anchor.x', 0.5);
		//enemies.setAll('anchor.y', 0.5);
		//this.enemies = enemies;

		this.add.tween(this.starfield).to({ alpha: 1 }, 1000, Phaser.Easing.Bounce.InOut, true);

		this.cursors = this.game.input.keyboard.createCursorKeys();

		// Add two seconds to the enemy spawn timer.
		this.enemyTime = this.game.time.now + 2000; 

	};

	setupEnemies () {

		var i;

		this.enemies = { 
			orange : this.game.add.group(),
			purple : this.game.add.group()
		};

		for (i = 0; i < this.enemyLimit; i += 1) {
			this.enemies.orange.addChild(new EnemyOrange(this.game, this.player, 0, 0));
			this.enemies.purple.addChild(new EnemyPurple(this.game, this.player, 0, 0));
		}

	}

	update () {

		var enemy = this.enemies.orange.getFirstExists(false);
		//var enemy, i;

		// Adjust the base speed as needed.

		if (this.cursors.up.isDown) {
			this.baseSpeed = 1.5;
		} else if (this.cursors.down.isDown) {
			this.baseSpeed = 0.5;
		} else {
			this.baseSpeed = 1;
		}

		//this.baseSpeed = this.cursors.up.isDown ? 1.5 : 1;

		if (this.game.time.now > this.enemyTime) {

			this.enemyTime = this.game.time.now + ((Math.random() * 5000/this.baseSpeed) + 500);

			if (enemy) {

				enemy.spawn((Math.random() * (this.game.width - enemy.body.width) + enemy.body.halfWidth), 0);

			}

		}

		// Adjust the enemy velocity based on the base speed.
		//this.enemies.setAll('body.velocity.y', 200 * this.baseSpeed);

		this.enemies.orange.forEachAlive(enemy => {

			enemy.speedModifier = this.baseSpeed;

			if (enemy.body.y > this.game.world.height) {
				enemy.kill();
			}

		}, this);

		this.checkCollisions();

		//  Scroll the background
		this.starfield.tilePosition.y += (2 * this.baseSpeed);
		this.overlay.tilePosition.y += (1 * this.baseSpeed);

		// update the score...
		this.scoreLabel.text = this.scoreString + this.score;

		if (this.score > 500) {
			this.add.tween(this.starfield).to({ alpha: 0 }, 1000, Phaser.Easing.Bounce.InOut, true);
		}

	};

	checkCollisions () {

		this.game.physics.arcade.overlap(this.bullets, this.enemies.orange, this.collisionHandler, null, this);
		this.game.physics.arcade.overlap(this.enemies.orange, this.player, this.gameover, null, this);

	};

	render () {

		if (window.debug) {
			this.game.debug.body(this.player);
		}

	};

	gameover (player, enemy) {

		player.kill();
		enemy.kill();

		this.explosion(enemy.body.x, enemy.body.y);

		setTimeout(() => {
			this.game.state.start('gameover');
		}, 1000);

	};

	explosion (x, y, particle) {

		var quantity = (Math.random() * 80) + 20;

		this.explosionEmitter.x = x;
		this.explosionEmitter.y = y;
		this.explosionEmitter.start(true, 300, null, quantity);

	};

	collisionHandler (bullet, enemy) {

		//  When a bullet hits an enemy we kill them both
		bullet.kill();
		
		enemy.damage(1);

		if (!enemy.alive) {
			this.explosion(enemy.x, enemy.y, enemy.particle);
			this.score += enemy.score;
		}

	};

};
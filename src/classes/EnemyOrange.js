import Enemy from './Enemy';

export default class EnemyOrange extends Enemy {

	constructor (game, player, x, y) {

		super(game, x, y, 'enemy-orange');

		this.player = player;
		this.maxHP = 2;
		this.score = 50;

	}

	update () {

		super.update();

		// Additional functionality here....

	}

}
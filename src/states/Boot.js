export default class Boot extends Phaser.State {
	
	create () {

		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.refresh();

		this.game.state.start('preload');

	}
}
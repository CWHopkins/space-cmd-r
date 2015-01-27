module.exports = {
	build : {
		files : [
			{ 
				expand : true, 
				src    : ['assets/*.wav'], 
				dest   : '<%= target %>' 
			}, {
				src    : 'index.html',
				dest   : '<%= target %>'
			}, {

				src    : './bower_components/phaser/build/custom/phaser-arcade-physics.min.js',
				dest   : '<%= target %>/lib/phaser.min.js'
			}
		]
	}
}
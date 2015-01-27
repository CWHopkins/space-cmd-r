module.exports = {
	options: {
		browserifyOptions: {
			debug : true
		}
	},
	dev : {
		src     : ['src/main.js'],
		dest    : '<%= target %>/bundle.js',
		options : {
			exclude   : ['nw.gui'],
			transform : ['es6ify']
		}
	}
}
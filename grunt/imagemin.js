module.exports = {
	build : {
		files : [{
			expand : true,
			cwd    : 'assets/',
			src    : ['*.png'],
			dest   : '<%= target %>/assets'
		}]
	}
};
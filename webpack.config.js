let webpack = require('webpack');
let path = require('path');

let SRC_DIR  = path.resolve(__dirname, 'src');
let DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = {
	entry: path.join(SRC_DIR, '/index.jsx'),
	watch: true,
	output: {
		path: DIST_DIR + '/app',
		filename: 'bundle.js',
		publicPath: '/assets/'
	},

	module: {
		rules: [
			{ test: /\.jsx*?/, include: SRC_DIR, loader: "babel-loader", query: { presets: ['react', 'es2015', 'stage-2'] } },
			{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
		]
	}
}
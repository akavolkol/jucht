var webpack = require('webpack')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
	devtool: 'source-map',
	devServer: {
    host: '0.0.0.0',
    port: 8080
  },
	entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
  	'./app/client/index.js'
	],
	output: {
		path: './public',
		filename: 'build.js',
		publicPath: 'http://localhost:8080/public'
	},
	plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
			{test: /\.scss$/, exclude: /node_modules/, loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'},
			{test: /\.(png|jpg|otf|ttf)$/, exclude: /node_modules/, loader: 'url-loader?limit=10000'}
		]
	}
}

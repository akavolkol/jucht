var webpack = require('webpack')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
		path: './public/build',
		filename: 'build.js',
    // Base path for builds, compiled in memory
		publicPath: '/build'
	},
	plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("style.css")
  ],

	module: {
		loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader'),
        exclude: /node_modules/,
      },
			{test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
			{test: /\.(png|jpg|otf|ttf)$/, exclude: /node_modules/, loader: 'url-loader?limit=10000'}
		]
	}
}

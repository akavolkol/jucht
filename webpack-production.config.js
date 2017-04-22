var webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	devtool: false,
	entry: [
  	'./app/client/index.js'
	],
	output: {
		path: './public/build',
		filename: 'build.js',
    // Base path for builds, compiled in memory
		publicPath: '/build'
	},
	plugins: [
    new webpack.DefinePlugin({
      'process.env': {
         NODE_ENV: JSON.stringify('production')
       }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin("style.css"),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compressor: {
        warnings: false
      }
    }),
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

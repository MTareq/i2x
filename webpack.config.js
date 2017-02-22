var path = require('path')
var webpack = require('webpack')

module.exports = {
    context: __dirname,
    entry: './frontend/js/index.jsx', 
    
    plugins: [
        new webpack.ProvidePlugin({ 
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery' 
        })
    ],
    
	module: {
		loaders: [
		  {
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader',
			query: {
			  presets: ['react', 'es2015'],
			  plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
			}
		  }
		]
	  },
    output: {
        path: path.resolve('./frontend/bundles/'), 
        filename: 'app.js', 
    }
}

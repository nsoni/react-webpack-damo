var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin  = require('extract-text-webpack-plugin')
var precss = require('precss')
var autoprefixer = require('autoprefixer')

const LAUNCH_COMMAND = process.env.npm_lifecycle_event
const target  = 'https://test.myramed.in'

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist'),
  scss : path.join(__dirname, 'app'),
}

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: PATHS.app + '/index.html',
  filename: 'index.html',
  inject: 'body',
})
let extractTextPluginConfig  = new ExtractTextPlugin( { filename: '[hash].style.css', allChunks: true })

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

const commonsMainChunk = new webpack.optimize.CommonsChunkPlugin({
  name: 'Main',
  minChunks: Infinity,
  filename: '[hash].Main.commons.js'
})

const base = {
  entry : {
    bundle : PATHS.app,
    Main : [ 'react', 'react-dom', 'react-redux', 'react-router', 'redux', 'redux-thunk']
  },
  output: {
    path     : PATHS.build,
    filename : '[id].[hash].[name].js'
  },
  module: {
    rules: [
      {
        test    : /\.jsx$|\.js$/,
        exclude : /node_modules/,
        loader  : 'babel-loader'
      },
      {
        test   : /\.json$/,
        loader : 'json-loader'
      },
      {
        test   : /\.(scss|css)$/,
        loader : ExtractTextPlugin.extract('css-loader?localIdentName=[hash:base64:5]&modules&importLoaders=1!postcss-loader!autoprefixer-loader!sass-loader?outputStyle=expanded')
      }
    ]
  },
  resolve: {
      modules: [path.resolve('./app'), 'node_modules'],
      extensions: ['.js', '.jsx', '.css', '.scss', '.json'],
  },

}

const developmentConfig = {
  devtool: 'source-map',
  devServer: {
    contentBase: PATHS.build,
    port : 6862,
    hot: true,
    host: "0.0.0.0",
    inline: true,
    proxy : {
      '**' : {
        target : target,
        secure : false
      }
    }
  },
  plugins: [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin(), extractTextPluginConfig, commonsMainChunk]
}

const productionConfig = {
  devtool: 'cheap-module-source-map',
  entry : {
    bundle : PATHS.app,
    Main : ['react', 'react-dom', 'react-redux', 'react-router', 'redux', 'redux-thunk']
  },
  devServer: {
    inline: true,
    proxy : {
      '**' : {
        target : target,
      }
    }
  },
  plugins: [HTMLWebpackPluginConfig, productionPlugin, extractTextPluginConfig, commonsMainChunk]
}

module.exports = Object.assign({}, base, isProduction === true ? productionConfig : developmentConfig)

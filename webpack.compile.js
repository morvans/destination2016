var path = require("path");
var webpack = require("webpack");

var node_modules_dir = path.join(__dirname, 'node_modules');

var AppCachePlugin = require('appcache-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var autoprefixer = require('autoprefixer');


var options = {
  /* -------------------------------- *\
   Optimization
   \* -------------------------------- */
  imagemin: {
    progressive: true,
    optimizationLevel: 5,
    interlaced: false,
    pngquant: {
      quality: '65-90',
      speed: 4
    }
  }
};

module.exports = {
  devtool: 'source-map',
  context: __dirname + "/app",
  entry: {
    app: "./index.js"
  },
  output: {
    path: "dist",
    publicPath:"/",
    filename: "scripts/[name]-[hash:6].js"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: function (module, count) {
          return module.resource && module.resource.indexOf(node_modules_dir) === 0;
        }
      }
    ),
    new ExtractTextPlugin("[name].css"),
    new webpack.HotModuleReplacementPlugin(),
    //new AppCachePlugin({
    //  cache: [],
    //  network: ['*'],  // No network access allowed!
    //  fallback: [],
    //  settings: ['prefer-online'],
    //  exclude: [],  // Exclude file.txt and all .js files
    //  output: 'destination2016.appcache'
    //}),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/index.html',
      inject: 'body' // Inject all scripts into the body
    })
  ],
  module: {
    loaders: [
      {
        test: /angular\.js$/, loader: 'exports?angular'
      },
      {
        test: /angular-localForage\.js$/, loader: 'imports?this=>{angular: angular}'
      },
      {
        test: /\.html$/,
        loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './app')) + '/!html'
      },
      {
        test: /\.scss/,
        loader: 'style!css!postcss!sass?includePaths[]=' + (path.resolve(__dirname, "./node_modules"))
      },
      {
        test: /\.css/,
        loader: 'style!css'
      },
      {
        test: /fonts\/.*\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=.]+)?$/,
        loader: 'file-loader?name=assets/fonts/[name].[hash:6].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /(images|icons)\/.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader?name=assets/images/[name].[hash:6].[ext]',
          'image-webpack?'+JSON.stringify(options.imagemin)
        ]
      },
      {
        test: /scripts\/.*\.js$/,
        loaders: [
          "ng-annotate"
        ]
      },
      {
        test: /scripts\/core\/.*\.js$/,
        loaders: [
          "ng-annotate",
          "babel-loader?" + JSON.stringify({
            presets: ['es2015'],
            plugins: ["syntax-async-functions", "transform-regenerator"]
          })
        ]
      }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
};

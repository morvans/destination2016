module.exports = {
  // webpack-dev-server options

  host: '0.0.0.0',
  port: 9998,

  contentBase: "app/",
  // or: contentBase: "http://localhost/",

  hot: true,

  historyApiFallback: true,

  //proxy: {
  //  "*": "http://localhost:9090"
  //},
  publicPath: "/",

  // webpack-dev-middleware options
  quiet: false,
  noInfo: false,
  lazy: false,
  inline: true,
  //filename: "bundle.js",
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  stats: {colors: true}
};

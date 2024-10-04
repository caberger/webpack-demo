const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = env => {
  const baseHref = env.baseHref ? env.baseHref : "/"
  console.log("build with", env)
  return {
  entry: './src/index.ts',
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  devtool: "cheap-source-map",
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      Model: path.resolve(__dirname, "src/model")
    }
  },
  output: {
    filename: 'bundle-[fullhash].js',
    path: path.resolve(__dirname, '../target/frontend'),
    publicPath: baseHref
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: "index.html",
        scriptLoading: "module",
        hash: true
      }),
      new webpack.EnvironmentPlugin({
        BASE_HREF: baseHref
      })
    ],
    devServer: {
        static: {
          directory: path.join(__dirname, '/'),
        },
        compress: true,
        port: 4200,
        proxy: {
          '/api': `http://localhost:8080`,
        },
        historyApiFallback: true        
    }   
  }
}


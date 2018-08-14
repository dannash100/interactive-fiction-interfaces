const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./index.js",
    devtool: 'cheap-module-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    context: path.resolve(__dirname, 'src'),
    devServer: {
        port: 3000,
        host: 'localhost',
        //Be possible go back pressing the "back" button at chrome
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal',
        publicPath: 'public',
        contentBase: path.join(__dirname, 'public'),
        hot: true
      },
      
    module: {
        
        rules: [
            {
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        },
             {
               test: /\.(png|svg|jpg|gif)$/,
               use: ['file-loader']
             },
             {
               test: /\.js|.jsx?$/,
               exclude: /(node_modules)/,
               loaders: ["babel-loader"]
             }]
    },
};
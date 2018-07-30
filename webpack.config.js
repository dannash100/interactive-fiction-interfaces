const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
    filename: './style.css'
});

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    mode: isDev? 'development' : 'production',
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    entry: "./index.js",
    output: {        
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    context: path.resolve(__dirname, 'src'),
    devServer: {
        contentBase: path.resolve(__dirname, 'public/assets'),
        stats: 'errors-only',
        open: true,
        proxy: [ // allows redirect of requests to webpack-dev-server to another destination
            {
              context: ['/api', '/auth'],  // can have multiple
              target: 'http://localhost:8080', // server and port to redirect to
              secure: false,
            }],
        port: 8080,
        compress: true
    },
    plugins: [
        new CleanWebpackPlugin(['public']),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        extractPlugin,
    ],
    module: {
        rules: [{
            test: /\.(jpg|png|gif|svg)$/,
            use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: './assets/',
                }
            }]
        }, {
            test: /\.scss$/,
            use: extractPlugin.extract({
             use: ["css-loader", "sass-loader", "postcss-loader"],
             fallback: 'style-loader'
            })
        }, {
         test: /\.js$/,
         exclude: /(node_modules|bower_compontents)/,
         use: {
          loader: 'babel-loader',
          options: {
           presets: ['env', 'stage-0', 'react'],
           plugins: ["transform-es3-member-expression-literals"],
          }
         }
        },{
            test: /\.ttf$/,
            use: [
              {
                loader: 'ttf-loader',
                options: {
                  name: './font/[hash].[ext]',
                },
              },]
            }]
    
    }
}
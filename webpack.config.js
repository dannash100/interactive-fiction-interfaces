const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
    filename: './style.css'
});


module.exports = {
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
        contentBase: path.resolve(__dirname, 'assets/'),
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
             use: ["css-loader", "sass-loader?sourceMap"],
             fallback: 'style-loader'
            })
        }, {
         test: /\.js$/,
         exclude: /(node_modules)/,
         use: {
          loader: 'babel-loader',
          options: {
           presets: ['env', 'stage-0', 'react'],
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
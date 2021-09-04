const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: {
        index: [
            './src/styles/main.css',
            './src/index.js'
        ],
    },
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            { 
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 8080
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'SnakeJS',
            template: './src/index.html'
        }),
        new CopyPlugin({
            patterns: [
              { from: "public", to: "." },
            ],
        }),
    ]
}
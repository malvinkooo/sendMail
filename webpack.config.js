const webpack = require('webpack');
const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    mode: NODE_ENV,
    devtool: isDev && 'eval-source-map',
    module: {
        rules: [
            // {
            //     enforce: 'pre',
            //     test: /\.js$|\.jsx$/,
            //     exclude: /(node_modules|bower_components)/,
            //     use: {
            //         loader: 'eslint-loader',
            //     },
            // },
            {
                test: /\.js$|\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    },
                },
            },
            {
                test: /\.less$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    'less-loader',
                ],
            },
        ],
    },
    plugins: [
        new copyWebpackPlugin([{
            from: path.resolve(__dirname, 'src', 'static'),
            to: path.resolve(__dirname, 'dist'),
        }]),
        new webpack.DefinePlugin({
            _DEV_: isDev,
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ],
}
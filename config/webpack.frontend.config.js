const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    entry: {
        'polyfills': './frontend/polyfills.ts',
        'vendor': './frontend/vendor.ts',
        'app': './frontend/main.ts'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    output: {
        path: helpers.root('build'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./frontend'),
            {}
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'frontend/index.html'
        }),

        new ExtractTextPlugin('[name].css')
    ],

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'ts-loader'
                    },
                    'angular2-template-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('frontend', 'app'),
                loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap'})
            },
            {
                test: /\.css$/,
                include: helpers.root('frontend', 'app'),
                loader: 'raw-loader'
            }
        ]
    },

    devServer: {
        proxy: {
            '/api/*': {
                target: 'https://localhost:3000',
                secure: false
            }
        },
        historyApiFallback: true,
        stats: 'minimal'
    }
};

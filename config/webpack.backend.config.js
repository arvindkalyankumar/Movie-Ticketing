const webpack = require('webpack');
const helpers = require('./helpers');

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    entry: {
        'server': './backend/server.ts'
    },

    target: 'node',

    externals: [
        /^[a-z\-0-9]+$/
    ],

    output: {
        filename: 'server.js', // output file
        path: helpers.root('build'),
        libraryTarget: "commonjs"
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            exclude: helpers.root('node_modules'),
            loader: 'ts-loader'
        }]
    }
};
const RestOptimizePlugin = require('rest-optimize-webpack-plugin');

module.exports = {
    entry: './src/Main.ts',
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    //devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new RestOptimizePlugin()
    ]
};

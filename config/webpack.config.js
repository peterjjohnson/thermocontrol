const webpack = require('webpack');

module.exports = {
    entry: './src/main.jsx',
    output: { filename: './public/build/bundle.js' },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.HOST': JSON.stringify(process.env.HOST),
            'process.env.WS_PORT': JSON.stringify(process.env.WS_PORT || 3001)
        })
    ]
};

var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                // No fallback, it should fail for a proper error message
                // fallback: "style-loader",
                use: [{
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]'
                    }
                }]
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin("./style/styles-scoped.css")
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
};

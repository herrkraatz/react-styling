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
            use: [{
                loader: 'style-loader/style',
            },
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[path][name]__[local]--[hash:base64:5]'
                }
            }]
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
};

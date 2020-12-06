const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths');


module.exports = {
    stats: {
        warnings: true,
        assets: true,
        children: false
    },
    entry: paths.appIndexJs,
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts']
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts|js|jsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader', "eslint-loader"]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader'
                ],
            },
            {
                test: /\.mp3$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ]
};
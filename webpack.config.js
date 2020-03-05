const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevServer = process.env.WEBPACK_DEV_SERVER;

module.exports = {
    mode: 'production',
    entry: {
        app: './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    devServer: {
        hot: true,
    },
    devtool: 'source-map',
    plugins: [
        ...!isDevServer ? [] : [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './src/index.html'),
            }),
            new webpack.HotModuleReplacementPlugin(),
        ]
    ],
    module: {
        rules: [
            {
                test: /\.(js|tsx?)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'cache-loader',
                }, {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            ['@babel/plugin-transform-react-jsx']
                        ],
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript'
                        ],
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions:  ['.js', '.ts', '.tsx'],
    }
};

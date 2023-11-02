const path = require('path')
const HTMLWebPackPlugin = require('html-webpack-plugin')
const {CleanWebPackPlugin} = require('clean-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'public'),
    mode: 'development',
    entry: {
        main: './index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebPackPlugin({
            template: './index.html'
        }),
        new CleanWebPackPlugin(),
    ]
}

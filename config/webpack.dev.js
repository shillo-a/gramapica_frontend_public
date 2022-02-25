const commonConfig = require('./webpack.common')
const { merge } = require('webpack-merge')

const devConfig = {
    mode: 'development',
    devServer: {
        port: 3000,
        open: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|svg|gif|ico)$/,
                use: ['file-loader']
            },
        ]
    },
    output: {
        publicPath: '/'
    },
}

module.exports = merge(commonConfig, devConfig)
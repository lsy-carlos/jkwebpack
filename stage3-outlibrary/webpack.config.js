const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode:'none',//去掉压缩
    entry:{
        'large-number':'./src/index.js',
        'large-number.min':'./src/index.js',
    },
    output:{
        filename:'[name].js',
        library:'largeNumber',
        libraryTarget:'umd',
        libraryExport:'default'
    },
    optimization:{
        minimize:true,
        minimizer:[ 
            new TerserPlugin({
                include:/\.min\.js$/
            })
        ]
    }
}
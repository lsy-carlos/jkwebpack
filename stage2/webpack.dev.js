'use strict';

const path = require('path');
const Webpack = require('webpack');

module.exports={
    entry:{
        index:'./src/index.js',
        search:'./src/search.js'
    },
    output:{
        path:path.join(__dirname,'dist'),
        filename:'[name].js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:'babel-loader'
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },{
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },{
                test:/\.(jpg|png|gif|jpeg)$/,
                use:'file-loader'
            }
        ]
    },
    mode:'development',
    plugins:[
        new Webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase:'./dist',
        hot:true
    }
    // watch:true,
    // watchOptions:{
    //     //排除监听，支持正则
    //     ignored:/node_modules/,
    //     //监听到变化会等待300ms之后执行，默认300
    //     aggregateTimeout:300,
    //     //判断文件是否发生变化是通过不停的询问系统指定的文件是否有变化实现的，默认每秒询问1000次
    //     poll:1000,
    // }
}
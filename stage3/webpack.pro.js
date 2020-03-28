'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackPlugin= require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry:{
        index:'./src/index.js',
        search:'./src/search.js'
    },
    output:{
        path:path.join(__dirname,'dist'),
        filename:'[name]_[chunkhash:8].js'
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
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },{
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },{
                test:/\.(jpg|png|gif|jpeg)$/,
                use:{
                    loader:'file-loader',
                    options:{
                        name:'[name]_[hash:8].[ext]'
                    }
                }
            }
        ]
    },
    mode:'production',
    plugins:[
        //提取单独的css文件，与style-loader互斥
        new MiniCssExtractPlugin({
            filename:'[name]_[contenthash:8].css',
        }),
        //css压缩，
        new optimizeCssAssetsWebpackPlugin({
            assetNameRegExp:/.css$/g,
            cssProcessor:require('cssnano')
        }),
        //html压缩
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'/src/search.html'),//html所在位置
            filename:'search.html',//
            chunks:['search'],
            inject:true,
            minify:{
                html5:true,
                collapseWhitespace:true,
                preserveLineBreaks:false,
                minifyCSS:true,
                minifyJS:true,
                removeComments:false
            }
        })
    ]
   
}
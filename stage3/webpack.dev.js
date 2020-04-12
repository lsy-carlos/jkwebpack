'use strict';

const path = require('path');
const Webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const glob = require('glob')

const setMPA = ()=>{
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname,'./src/*/index.js')) 
    
    entryFiles.forEach((val,index)=>{
        const matchs = val.match(/src\/(.*)\/index\.js/);
        const pageName = matchs[1];
        entry[pageName] = val;
        htmlWebpackPlugins.push(//html压缩
            new HtmlWebpackPlugin({
                template:path.join(__dirname,`src/${pageName}/index.html`),//html所在位置
                filename:`${pageName}.html`,//
                chunks:[pageName],
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
        )
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}
const {entry,htmlWebpackPlugins} = setMPA();

module.exports={
    entry:entry,
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
        new Webpack.HotModuleReplacementPlugin(),
        // 自动清除dist
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin()
    ].concat(htmlWebpackPlugins),
    devtool:'eval',
    devServer:{
        contentBase:'./dist',
        hot:true,
        //构建是命令行的现实日志模式
        stats:'errors-only'
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
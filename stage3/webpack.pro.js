'use strict';

const path = require('path');
const glob = require('glob')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackPlugin= require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const htmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

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
        filename:'[name]_[chunkhash:8].js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    'babel-loader'
                ]
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
                    'less-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins:()=>[
                                require('autoprefixer')({
                                    Browserslist:['last 2 version','>1%','ios7']
                                })
                            ]
                        }
                    },{
                        loader:'px2rem-loader',
                        options:{
                            remUnit:75,//对应750的设计稿
                            remPrecision:8,//px小数点位数
                        }
                    }
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
    // mode:'production',
    mode:'none',
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
        // 自动清除dist
        new CleanWebpackPlugin(),
        //scopeHoisting 优化buildjs
        new webpack.optimize.ModuleConcatenationPlugin(),
        new FriendlyErrorsWebpackPlugin()
        //手动分离公共资源
       /*  new htmlWebpackExternalsPlugin({
            externals:[
                {
                    module: 'react',
                    entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
                    global: 'React',
                },
                {
                    module: 'react-dom',
                    entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
                    global: 'ReactDOM',
                },
            ]
        }) */
    ].concat(htmlWebpackPlugins),
    optimization: {
        splitChunks: {
            minSize: 1000,//文件最小大小，字节为单位
            cacheGroups: {
                vendor: {
                    test: /(react|react-dom)/, // 建议仅包括您的核心框架和实用程序，并动态加载其余依赖项。
                    name: 'vendors',
                    chunks: 'all'
                },
                commons: {
                    name: 'commons', // 打包文件名
                    chunks: 'all', // 所有引入的库进行分离（推荐）
                    minChunks: 2, // 只要引用两次就打包为一个文件
                }
            }
        }
    },
    //构建是命令行的现实日志模式
    stats:'errors-only'
}
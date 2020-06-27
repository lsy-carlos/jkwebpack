
const path = require('path');
const glob = require('glob');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// 当前程序所在目录 在test/smoke中执行时不能用__dirname
const projectRoot = process.cwd();
console.log(`rootpath:${projectRoot}`);

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

  entryFiles.forEach((val) => {
    const matchs = val.match(/src\/(.*)\/index\.js/);
    const pageName = matchs[1];
    entry[pageName] = val;
    htmlWebpackPlugins.push(// html压缩
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `src/${pageName}/index.html`), // html所在位置
        filename: `${pageName}.html`, //
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }),
    );
  });
  return {
    entry,
    htmlWebpackPlugins,
  };
};
const { entry, htmlWebpackPlugins } = setMPA();
module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      }, {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({
                  Browserslist: ['last 2 version', '>1%', 'ios7'],
                }),
              ],
            },
          }, {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 对应750的设计稿
              remPrecision: 8, // px小数点位数
            },
          },
        ],
      }, {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    // 提取单独的css文件，与style-loader互斥
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
  ].concat(htmlWebpackPlugins),
  // 构建是命令行的现实日志模式
  stats: 'errors-only',
};

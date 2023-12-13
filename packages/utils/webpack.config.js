const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  plugins: [
    new CleanWebpackPlugin() // 清理打包目录
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({ extractComments: false }) // 不将注释单独提取到单独的文件(xxx.LISENCE.txt类似这种文件)
    ]
  },
  externals: {
    moment: 'moment'
  }
}

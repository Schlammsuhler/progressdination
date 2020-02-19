const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WebpackNotifierPlugin = require('webpack-notifier')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
  var production = argv.mode === 'production'

  var config = {
    entry: __dirname + '/js/index.js',
    output: {
      publicPath: '/themes/progress/dist',
      path: __dirname + '/dist'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: file => (
            /node_modules/.test(file) &&
            !/\.vue\.js/.test(file)
          )
        },
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: !production } },
            { loader: 'postcss-loader', options: { sourceMap: !production } },
            { loader: 'sass-loader', options: { sourceMap: !production } }
          ]
        },
        {
          test: /\.(svg|png|jp(e*)g)$/,
          loader: 'file-loader',
          options: {
            outputPath: 'img/'
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue: 'vue/dist/vue.runtime.esm.js',
        '@': path.resolve(__dirname)
      }
    },
    optimization: {
      minimizer: [
        new TerserJSPlugin({}),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new CleanWebpackPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      new CopyWebpackPlugin([
        // { from: 'src/img/favicon.ico', flatten: true },
      ]),
      new ImageminPlugin({
        disable: !production,
        test: /\.(jpe?g|png|gif)$/i,
        jpegtran: null,
        plugins: [
          imageminMozjpeg({
            quality: 80,
            progressive: true
          }),
          imageminPngquant({
            speed: 1,
            quality: [0.6, 0.9]
          })
        ]
      }),
      new WebpackNotifierPlugin()
    ],
    devtool: production ? undefined : 'source-map',
    devServer: {
      overlay: true,
      compress: true
    }
  }

  if (argv.analyze) {
    config.plugins.push(new BundleAnalyzerPlugin())
  }

  return config
}

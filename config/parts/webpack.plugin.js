const commonPath = require('../common-path');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

exports.cleanDist = () => ({
  plugins: [new CleanWebpackPlugin()]
})

exports.copyFromPublicToDist = () => ({
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: `${commonPath.publicPath}/json`, to: `${commonPath.outputPath}` },
      ],
    })
  ]
})

exports.htmlWebpack = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Svelte App KMACODERS',
      filename: 'index.html',
      template: path.resolve(__dirname, commonPath.publicPath, 'templates/index.ejs'),
    })
  ]
})

exports.extractCss = (options) => ({
  plugins: [
    new MiniCssExtractPlugin({
      path: options.path,
      filename: options.filename,
    })
  ]
})

exports.styleLint = () => ({
  plugins: [
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      context: 'src',
      files: '**/*.(s(c|a)ss|css)',
      failOnError: false,
      quiet: false,
      emitErrors: true
    })
  ]
})

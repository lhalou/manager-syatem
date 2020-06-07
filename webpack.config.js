const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: "./src/app.jsx",
  output: {
    //在当前所在目录，也就是根目录下去找dist
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "js/app.js",
  },
  //配置路径，便于文件位置的更改
  resolve: {
    alias: {
      //在当前所在目录，根目录下去找src/page
      page: path.resolve(__dirname, "src/page"),
      component: path.resolve(__dirname, "src/component")
    }
  },
  module: {
    rules: [
      //react(js)文件的处理
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react"],
          },
        },
      },
      //css文件的处理
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        }),
      },
      //sass文件的处理
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"],
        }),
      },
      //对图片的配置
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "resource/[name].[ext]",
          },
        }, ],
      },
      //字体图标的配置
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/i,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "resource/[name].[ext]",
          },
        }, ],
      },
    ],
  },
  plugins: [
    //处理HTML文件
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    //独立css文件
    new ExtractTextPlugin("css/[name].css"),
    //提出公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      filename: "js/base.js",
    }),
  ],
  devServer: {
    port: 8086,
    //即使访问404，也可以跳转到正确的页面
    historyApiFallback: {
      index: "/dist/index.html"
    }
  },
};
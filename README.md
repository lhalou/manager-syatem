## 项目搭建步骤

1. GitHub 上简历里仓库，git clone 到本地
2. 编辑.gitignore，填写忽略上传文件（node_modules,dist,\*.log） vim .gitignore
3. 初始化项目，生成 package.json 文件 yarn init
4. 配置 webpack

- 安装
  yarn add webpack
- 位置配置文件
  webpack.config.js
  --dev：开发环境
  node_modules/.bin/webpack 打包工具
- 配置插件 html-webpack-plugin，处理 HTML
  yarn add html_webpack-plugin --dev
  在配置文件 webpack.config.js 中进行配置
- 配置 babel-loader,处理 es6
  yarn add babel-loader babel-preset-env babel-core --dev
- 配置 babel-preset-react，实现 react
  yarn add babel-preset-react
- 对样式进行配置
  yarn add style-loader
- 配置使 css 成为独立文件
  extract-text-webpack-plugin,它会将所有入口中引用的\*.css 移动到独立分离的 css 文件中.
  yarn add extract-text-webpack-plugin
- 配置 sass
  yarn add sass-loader node-sass
- 对图片进行处理
  url-loader 功能类似 file-loader,但是在文件大小低于指定的限制时，可以返回一个 dataURL
  yarn add file-loader url-loader
- 配置字体 font awesome
  yarn add font-awesome
  一定要配置字体图标的解析，与配置图片一样
- 插件提出共用模块
  ```
  new webpack.optimize.CommonsChunkPulgin({
    name: "name",
    fileName: "js/base.js"
  })
  ```
- 实现自动刷新
  webpack-dev-server 提供了一个简单的 web 服务器，并且能够实时实现自动刷新.
  yarn add webpack-dev-server
  ```
  devServer: {
    content: "./dist
  }
  ```
  node_modules/.bin/webpack-dev-server 启动服务器实现实时自动刷新
- 修改访问根路径
  ```
  publicPath: "/dist/"
  ```
- 修改端口号
  ```
  port: 8086
  ```
- 在 package.json 中加入脚本 scripts 字段
  ```
  "scripts": {
      "dev": "node_modules/.bin/webpack-dev-server",   //yarn run dev 启动项目，开启服务器
      "dist": "node_modules/.bin/webpack" // yarn run dist 项目打包
    },
  ```

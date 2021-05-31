## Loader
* 作用：webpack无法识别非js文件的打包方式，需要借助loader来实现。如图片、文本，可用正则 /\.png$/ 来匹配，用 loader 来处理。
* loader是从右往左执行的。
### file-loader
*  将一个文件中的 import/require() 解析为 url，并且将文件发送到输出文件夹，并返回文件的 public URI。

### url-loader
* 用于将文件转换为 base64 URI 的 loader。
* url-loader 功能类似于 file-loader, 但是在文件大小（单位为字节）低于指定的限制时，可以返回一个 DataURL。
* 指定文件的最大体积（以字节为单位）。 如果文件体积等于或大于限制，默认情况下将使用 file-loader 并将所有参数传递给它。
* 可配置 limit ：大于 limit 时会像 file-loader 一样把图片直接移动到 dist 中；小于 limit 时会将图片转化为 base64 格式，不会单独生成文件。

### style-loader
* 把 CSS 插入到 DOM 中。

### css-loader
* css-loader 会对 @import 和 url() 进行处理，就像 js 解析 import/require() 一样。
* 可以理解为处理多个css文件的依赖关系 如 @import 语法

### sass-loader
* 加载 Sass/SCSS 文件并将他们编译为 CSS。

### postcss-loader
* 使用 PostCSS 处理 CSS 的 loader。
* 可以配合使用 autoprefixer 添加厂商前缀。

## Plugin
* 可以在 webpack 运行到某个时刻的时候，帮你做一些事情

### html-webpack-plugin
* 在打包结束后自动生成一个 html 文件，并把打包生成的 js 自动引入到这个 html 文件中。

### clean-webpack-plugin
* 在打包前清理 dist 目录

## source-map
* 定义：当打包生成的代码出错时，将错误代码映射到源文件的位置，而不是打包后的文件，即用来生成源代码和目标代码直接的映射
* 配置：在webpack.config.js中配置 devtool: 'source-map' 即可开启，配置 devtool: 'none' 来关闭
* 用法：在 development 中，建议使用 cheap-module-eval-source-map ; 在 production 中，建议使用 cheap-module-source-map
* source-map, 生成.map的映射文件
* inline, 映射信息被合并到目标文件中，不单独生成文件
* cheap, 只提示哪一行出错，不提示哪一列出错，并且只会生成业务代码的映射，不会对loader进行映射
* module, 会loader进行映射，如babel的source-map
* eval, 使用eval包裹模块代码，可以加快打包速度

## devServer
* webpack-dev-server
* proxy 跨域代理配置
* 配合 webpack-dev-middleware 实现简易的 devServer 代码见 server.js
* hmr 热更新 vue-loader、babel-presets 已经内置了 hmr 的实现

## babel
* babel-polyfill 用来实现低版本浏览器不存在的 api ，如 promise map
* useBuiltIns 用来配置 babel-polyfill 的按需引入
* 注意：preset-env 和 polyfill 的方式会污染全局变量，如果需要编写第三方插件或者类库，可使用 plugin-transform-runtime 来避免污染全局
* preset-react 将 jsx 语法编译为 babel 能识别的 js 语法

## Tree Shaking
* 在 webpack 编译阶段 tree shaking 会将未被使用的代码删除
* 只支持 ES Mudule 的引入方式，不支持 CommonJS 的引入方式
* 因为 ESM 是静态加载，也叫编译时加载； CJS 是动态加载，运行时加载模块
* 注意，当不需要对 babel-polyfill 做 tree shaking 时，需要在 package.json 中配置 "sideEffects": ["@babel/poly-fill", "*.css"] 对css也不需要 tree shaking

## development 和 production 的区分打包
* 共同配置放在 webpack.common.js 中，各自的配置分别放在 dev 和 prod 中
* 使用 webpack-merge 来合并配置

## code splitting
* 代码分割和 webpack 无关
* webpack 中实现代码分割：
  1. 同步代码：只需要在 webpack.common.js 中做 optimization 的配置即可
  2. 异步代码(import)：异步代码，无需做任何配置，会自动进行代码分割

<!-- todo 4-5 -->

## 环境变量
* 全局变量 配置在 package.json 的 scripts 中 --env.production
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
## webpack面试题





## 前端代码为何要进行构建和打包

1. 体积更小，加载更快
2. tree-shaking， scope hosting 压缩，合并代码
3. 编译高级语法，Ts & ES6+ & Scss & 模块化
4. 兼容性和错误检查，polyfill & postcss & eslint
5. 统一，高效的开发环境
6. 构建规范流程和产出标准，例如：测试，上线
7. 研发流程 & 项目管理 & 团队整体效益，做个高价值的人



##  module & chunk & bundle分别是什么？有啥区别？

1. module 各个源码文件，webpack中一切皆模块
2. chunk 多个模块合并成的，例如：entry, import, splitChunk
3. bundle chunk最终输出的文件
4. 常用的 loader
   1.  https://www.webpackjs.com/loaders/
5. 常用的 plugins
   1. https://www.webpackjs.com/plugins/





## loader和 plugins的区别？

1. loader 模块转换器，如 scss 转 css
2. plugin 扩展插件，如 HtmlWebpackPlugin





## webpack如何实现懒加载？

1. `import().then`
2. 集合 React & Vue
3. vue-router & react-router 懒加载





## webpack常见的性能优化？

1. production 生产环境优化
   1. 优化 babel-loader
   2. ignorePlugin
   3. noParse
   4. happyPack
   5. ParallelUglifyPlugin
   6. scope hosting
   7. import tree-shaking
2. development 开发环境优化
   1. 自动刷新
   2. 热更新
   3. DllPlugin 使用场景
3. production优化产出代码
   1. 小图片 base64编码
   2. bundle 加 hash
   3. import懒加载
   4. 提取公共代码
   5. 使用 cdn加速





## babel



### babel & webpack的区别

1. babel js新语法的编译工具，不关心模块化
2. webpack 模块化打包构建工具，是多个 laoder & plugins 的集合



### babel-runtime & babel-polyfill的区别？

1. babel-ployfill 会污染全局
2. babel-runtime不会污染全局
3. 产出第三方 lib库，要用 babel-runtime



### 如何产出一个 lib

1. output配置library

```jsx
output: {
  filename: 'lodash.js', // lib名称
	path: path.resolve(__dirname, 'dist'),
  library: 'lodash' // lib全局变量
}
```








































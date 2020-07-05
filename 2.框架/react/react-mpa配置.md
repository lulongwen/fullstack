## yarn eject

1. 创建项目后，执行npm run eject，将webpack配置文件显示出来





## public

1. 复制 index.html，分别重命名
2. 打开页面修改 title属性

```jsx
/public/
	index.html
	query.html
	order.html
	ticket.html
```





## paths.js

1. path中新增 html入口文件和 js入口文件

```jsx
// 57行默认 spa的文件
module.exports = {
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
}

// 修改后的 module.exports
module.exports = {
  appHtml: resolveApp('public/index.html'),
  appQueryHtml: resolveApp('public/query.html'),
  appOrderHtml: resolveApp('public/order.html'),
  appTicketHtml: resolveApp('public/ticket.html'),

  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appQueryJs: resolveModule(resolveApp, 'src/views/Query/Query'),
  appOrderJs: resolveModule(resolveApp, 'src/views/Order/Order'),
  appTicketJs: resolveModule(resolveApp, 'src/views/Ticket/Ticket'),
}
```





## webpack.config.js

### entry多入口修改

1. 把默认的 entry入口数组，修改为对象，并封装成一个函数
2. 给每一个不同的入口起不同的名字

```jsx
const pageEntry = path => [
  isEnvDevelopment &&
  require.resolve('react-dev-utils/webpackHotDevClient'),
  paths[path]
].filter(Boolean)

// 修改后的 entry对象
entry: {
  index: pageEntry('appIndexJs'),
  query: pageEntry('appQueryJs'),
  order: pageEntry('appOrderJs'),
  ticket: pageEntry('appTicketJs')
},
```



### plugins

1. 把 默认的 newHtmlWebpackPlugin封装成一个函数，传入 chunks和  template模板名称
   1. 模板是public下的html文件
   2. filename 打包后的html名称
   3. chunks 是引用的打包文件

2. 配置好后， yarn build 报错：Cannot read property ‘filter’ of undefined
   1. 错误原因在 new ManifestPlugin
3. 在generate函数中，改造entrypointFiles，不然在编译时会出现 `Cannot read property 'filter' of undefined` 错误

```jsx

const htmlTemplate = ({chunks, path}) => {
  return new HtmlWebpackPlugin(
    Object.assign(
      {},
      {
        inject: true,
        template: paths[path],
        filename: `${chunks}.html`, // 修改 filename 和默认 chunks
        chunks: [chunks]
      },
      isEnvProduction
      ? {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }
      : undefined
    )
  )
}


plugins: [
  // Generates an `index.html` file with the <script> injected.
  htmlTemplate({chunks: 'index', path: 'appHtml'}),
  htmlTemplate({chunks: 'order', path: 'appOrderHtml'}),
  htmlTemplate({chunks: 'query', path: 'appQueryHtml'}),
  htmlTemplate({chunks: 'ticket', path: 'appTicketHtml'}),

  new ManifestPlugin({
    fileName: 'asset-manifest.json',
    publicPath: paths.publicUrlOrPath,
    generate: (seed, files, entrypoints) => {
      const manifestFiles = files.reduce((manifest, file) => {
        manifest[file.name] = file.path;
        return manifest;
      }, seed);
      // const entrypointFiles = entrypoints.main.filter(
      //   fileName => !fileName.endsWith('.map')
      // );
      // 修改后的 entrypointFiles
      const entrypointFiles = {};
      Object.keys(entrypoints).forEach(entrypoint => {
        let item = entrypointFiles[entrypoint]
        item = item.filter(fileName => !fileName.endsWith('.map'));
      });

      return {
        files: manifestFiles,
        entrypoints: entrypointFiles,
      };
    },
  }),
]
```



### ManifestPlugin

1. ManifestPlugin插件的作用是生成一份.json的文件
2. 通过该文件的映射关系可以知道 webpack是如何追踪所有模块并映射到输出bundle中的
3. 重要的是 generate函数
   1. 自定义了输出的内容，有一段是取entrypoints.main，是针对单一入口的配置
   2. 因为单一入口不指定name的情况默认name为main
   3. 改成多入口后，这里面在entrypoints中自然是读取不到main这个值的，因此报错
4. 解决方法：
   1. 将 entrypointFiles 定义为对象，通过 Object.keys()来遍历
   2. 将generate这个参数去掉，恢复其默认值；或者将entrypoints这个key去掉





### webpackDevServer.config.js

1. 新增 rewrites，指明哪些路径映射到哪个html

```jsx
historyApiFallback: {
  // Paths with dots should still use the history fallback.
  // See https://github.com/facebook/create-react-app/issues/387.
  disableDotRule: true,
  // index: paths.publicUrlOrPath,
  // 指明哪些路径映射到哪个html
  rewrites: [
    { from: /^\/index.html/, to: '/build/index.html' },
    { from: /^\/order.html/, to: '/build/order.html' },
    { from: /^\/query.html/, to: '/build/query.html' },
    { from: /^\/ticket.html/, to: '/build/ticket.html' },
  ]
},
```

完成以上步骤重启命令，运行 yarn start或 yarn build看下效果



## mpa多入口参考资料

1. Add more entry points
   1. https://github.com/facebook/create-react-app/issues/1084#issuecomment-308731651
   2. https://zhuanlan.zhihu.com/p/147299715
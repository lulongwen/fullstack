# js模块化

1. AMD requirejs 擅长浏览器端
   1. 异步模块定义，Asynchronous Module Definition
   2. 提前执行
   3. 依赖前置， 依赖必须一开始就写好
   4. 速度快，会浪费资源，预先加载所有的依赖，直到使用的时候才执行
2. CMD seajs 服务器端
   1. Common Module Definition
   2. 依赖就近，用的时候再require，延迟执行，as lazy as possible
   3. 只有真正需要才加载依赖，性能较差，直到使用的时候才定义依赖
3. **CommonJS规范**
   1. **module.exports** 定义模块
   2. 模块引用(require)
   3. 模块定义(exports)
   4. 模块标识(module)
   5. node，webpack，npm 都遵循了 commonjs规范
4. ESModule
   1. import & export

```jsx
var b = require('./b.js') // 依赖可以就近书写，就近依赖 CMD
b.doSomething()

// AMD 依赖必须一开始就写好
define(['./a.js', './b.js'], function(a, b) {})
a.doSomething()
```



### 模块化发展

1. 全局变量，全局函数
   1. 缺点：污染全局命名空间，引起命名冲突，覆盖
2. 命名空间 namespace
   1. 将变量或方法封装到对象内
   2. `var app = {a: 'ok', b: function() {}}`
3. 匿名函数自执行 IIFE，匿名闭包
   1. 将变量或方法封装到一个函数内部，绑定到 window的属性上向外暴露接口
4. AMD
   1. Asynchronous Module Definition 异步模块定义，浏览器端
   2. requirejs



### 什么是模块

1. 将一个js代码：依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起
2. 代码块的内部数据是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信
3. 模块的组成
   1. 数据，内部属性
   2. 方法，内部操作数据的函数
4. 模块化的目标：**浏览器端模块化开发的目的**





## ESModule

1. ES6内置了模块化的实现
2. 定义暴露模块 : export
3. 引入使用模块 : import
4. 缺点：
   1. 浏览器还不能直接识别ES6模块化的语法
   2. 解决：用Babel将ES6 -> ES5





## commonjs

1. nodejs，npm， webpack的模块化规范
2. 引入模块 : require & 暴露模块 exports

```jsx
// 定义暴露模块 exports
exports.xxx = value
module.exports = value

const module = require('模块名/模块相对路径')
```







## AMD

1. Asynchronous Module Definition 异步模块定义， 浏览器端

```jsx
// 定义暴露模块
define([依赖模块名], function(){return 模块对象})

// 引入模块
require(['模块1', '模块2', '模块3'], function(m1, m2){//使用模块对象})
```





## CMD

1. 
2. w

```jsx

```


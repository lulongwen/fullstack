# vue组件库建设

1. 

https://ppt.infoq.cn/slide/show?cid=31&pid=1518



## 1 组件库设计原则

1. 组件式一种编程抽象的代码块，目的重复利用
2. 通用型组件库
3. 业务型组件库
4. DRY原则
   1. Don't Repeat YourSelf
   2. 《程序员修炼之道》
5. 三次原则，《重构》，改善已有代码质量



### 组件设计

1. 高内聚，组件的粒度
2. 低耦合，稳定性
3. COC 约定大于配置原则
   1. Convention Over Configuration



### 父子组件依赖

1. 好莱坞原则
2. 子组件的初始化和调用由父组件容器负责
3. 



### 组件设计规范

1. 一致性
2. material Design
   1. 光效，表面质感，运动感
   2. 鲜明，形象，有意义的动画效果
3. 样式分离
4. 



#### 统一视觉样式

1. color 色彩

2. 布局

3. 字体

4. 图标

   

#### 统一交互动效

1. 过渡时间
2. 缓动
3. 移动路径
4. 形状变化，编排



### 样式分离

1. 需求，主题定制
2. 样式差异化
3. 多种主题及定制工具
4. 交互动画扩展





#### 主题方案

1. 提取全局变量
2. 合理继承，衍生



#### 自定义主题

1. 修改主题样式
2. 覆盖主题样式
3. 组件显示传值，内置样式处理





### 生态圈

1. 文档案例
2. cli 脚手架
3. 版本迭代





### 组件设计禁区

1. 越界操作
2. 副作用
3. 侵入性
4. 环形依赖
5. 属性繁多







## 2 组件库工程化实践

1. 组件的配置自动生成
2. 文档自动生成
3. 主题配置工具







### 组件维护方案

1. 多组件
2. 多人参与开发
3. 社区开源参与
4. 商业秘密性
5. i18n 国际化，多语言支持







### 可视化配置

1. 拖拽组件 - 层级组件描述树 - 渲染组件 - 生成代码
2. 组件操作 - 属性表单生成 - 配置属性



### i18n 国际化

1. 制作语言文件子
2. 替换文字
3. 运行时替换，例如 vue mixin函数





### 







### 单元测试方案

1. jest
2. mocha
3. 测试框架
   1. 测试驱动
   2. 测试覆盖率
4. 断言库
5. mock数据
6. UDD & BDD





### 多包管理工具

1. lerna https://lernajs.io
2. 优点：
   1. 自动更新依赖
   2. 独立版本管理，非 npm包
   3. 一键安装依赖






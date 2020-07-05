# app.json 全局配置

1. pages
2. windows 导航栏配置
3. tabBar
4. app.json 配置文件，不能添加注释，严格的JSON格式
  - 双引号，不能有单引号
	- 结尾不能有逗号


## 小程序页面生命周期

```jsx
onShow

onLoad

```


## 小程序组件 Component

1. properties 可以设置 类型 String， Number
2. data 不能设置类型，例如 Number 会显示成 Number函数

```jsx
开放数据，受控组件；外部传入的数据
properties: {
  value: String,
  observer: 'fn2'
	observer() {}
}


data
  内部的数据

methods

setNavgationBarTitle

```


## setData & this.data的区别

1. 都能修改 data里面的数据
2. setData 响应式数据
3. this.data 直接赋值，不是响应式，页面绑定变量不会改变
4. 小程序会把 properties 和 data合并成一个对象，重名会覆盖
  - `console.log(this.properties) & console.log(this.data)` 结果都是2个属性的合集的对象




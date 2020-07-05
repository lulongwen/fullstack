# 微信小程序组件 Component

1. 组件的封闭性、开放性及粒度
2. 封装在内部，开放出来
 组件最好不要留有空白间距
 组件只能继承极少数全局样式 font, color
 组件事件与事件处理
 组件的properties属性
	不要过于追求代码的导出复用，优先考虑

	 组件属性赋值与页面渲染流程解析

	 组件内处理 8 - 08 补零
规范只是一种约束，惯例
	大规范
	onBind
	规范不能引起混乱

组件，只完成组件的功能
  独立的业务放在不同的 Page里面，让Page实现，比如：一个组件多个 Page页面调用
	components 组件 新建 index
	page 新建 和目录名一样 book.wxml

绑定传入props 数据
props 驼峰 openType
组件使用 连字符 open-type


	组件内可以引用其他组件


## 组件开发的好处

1. 组件开发，可复用；全新的小程序开发模式
2. 组件还有很强的代码分离性；组件化构建小程序
3. 小程序组件的形态：Page，Component
	- Page也是组件

4. 良好的小程序开发结构
	- Page - wxml & html 绑定数据
	- model 处理数据；model管理业务与 Page数据绑定分离
	- 点赞数量超过 1000 显示 1k



## 新建页面 Page

1. `pages/` 下新建目录，目录先新建，选择 `Page`
	- 每个新建的页面都需要在 app.json里面注册
	- 小程序会自动生成4个文件，自动添加到 app.json中



## 新建组件 `Component({})`

1. 组件需要被引入到页面；`.json` 文件里注册组件
2. 组件的拆分，打造自己的组件库
	- 新建组件， index
	- app.json 全局配置
	- 页面配置 book.json

```jsx
{
	"usingComponents": {
		// 相对路径报错，/ 用绝对路径
		"cp-like": "/component/like/index" // like是组件目录，不是组件名字
		"cp-like": "component/like/index" // ❌
	}
}

```


## Behavior

1. `Behavior({})` 类似于 Vue的 mixins混合，提取公共属性和方法，达到复用
2. 多继承，继承多个行为，同名变量覆盖，覆盖 properties
3. 最后一个 behavior 覆盖之前的 behavior
	- 细节：behavior 继承与多继承的覆盖规则


## slot 插槽

1. 组件有调用方决定



## template 模板



4. 文件结构
 app.js
 	生命周期钩子函数
 	全局 getAPP函数实例
 	全局唯一
 		设置导航条
 		获取用户信息
 		页面导航
 			navigateTo
 			redirectTo,
 			switchTab

5. 微信API
	wx.request
	wx.previewImage
	wx.setStorage
	wx.getStorage 本地存储
		动画，震动，截屏，亮度
		音乐，视频，地图，文件
		加速度，罗盘，wifi ，nfc等


	icon
	text
	rich-text
		rich-text 不能嵌套 rich-text
	progress

	button
		open-type 转发到群，获取用户信息，打开APP

	获取用户信息
		用户信息都是加密的
		必须发送到微信，第三方平台进行解密

	调用手机号码，必须login登录
	input
		select-start-end ，必须是 设置 auto-focus才有效

	picker-view 没有mode

	组件是静态页面的
		通过属性和回调函数


		app.json 细节
			严格的json格式，不能有注释，
			最后一个不能有逗号 ,

		*this 只能是 字符串或数字的数组

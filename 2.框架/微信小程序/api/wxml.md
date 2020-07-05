# wxml


wxml html是个骨架
	就是一个个组件的集合
	单标签，没有内容就用单标签
	双标签，成对的闭合标签，有内容
	内置组件，官方提供的组件
	自定义组件，第三方组件'

wx:if="{{}}" 自定义组件，条件渲染 DOM
	hidden="{{ture}}" 针对内置组件有效，切换用 hidden 类似于 v-show

	wx:for
	wx：key的用法与意义
	
	view div

自定义组件支持hidden
@import在组件间复用样式

音频 src赋值，自动播放
	小程序组件通信，主要是父子组件通信
	hidden不会触发组件的detached，
	wxif会

	音乐 总控开关
	开关的❎就是 stop
	onEnded 自然播放完


## 小程序事件
	bind:tap=""
	captch：tap
	triggerEvent() 自定义事件


## 自定义事件





### 跳转

1. navigator & wx.navigateTo
2. navigator 传参

```jsx
// url 传参key=value，多个值 & 分隔
url?openid=xxx&page=12

// 取值
onLoad (options) {
  const {openid, page} = options
}
```






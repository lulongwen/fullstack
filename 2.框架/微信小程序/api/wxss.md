# 小程序数据交互


## rpx 是什么

rpx 和 px 1:1 iphone6 的设计尺寸； px 固定的尺寸；rpx 自适应尺寸
	字体大小用 px
	border px


样式
	组件 v-tag样式
	外部样式
	@import
	组件样式
	全局样式

css 里面不要用 id

@import在组件间复用样式
@import 复用 wxss
Behavior 复用 js

按钮的触碰区域，比如三角形，要有padding 大于 三角形


## 自定义组件样式
v-tag:nth-child
	自定义组件设置样式无效
	外部样式如何强制覆盖普通样式 ！important
	普通样式 css
	外部样式 传入的 class；ex-class 优先级
	外部样式加权， ！important 可以提高优先级


## 图标
https://www.jianshu.com/p/0d631d3b1983

# uni-app知识点

1. uni-app语法
2. 组件化
   1. 默认的基础组件
   2. 自定义组件
3. API
4. 路由
5. 生命周期函数
6. flex布局样式
   1. scss
   2. 自定义图标



### 不支持的 vue语法

1. 没有 vue的生命周期方法，小程序风格的生命周期方法





### vue-cli创建项目

```bash
vue create -p dcloudio/uni-preset-vue my-project
```





### hbuilderX创建项目





## uni-app规范

1. 页面文件，遵循Vue单文件组件的规范，SFC
2. 组件标签，接近小程序规范
3. 接口能力，js-api接近微信小程序规范
4. 数据绑定，事件处理和 vuejs几乎一样
5. flex兼容多端，使用 flex布局开发
6. 条件编译不同的平台
7. App端开发特色
   1. App端的 NativeVue开发
   2. Html5+





## uni-app 目录结构





## uni生命周期

1. 应用生命周期 App.vue
2. 页面生命周期
3. 组件生命周期
4. https://uniapp.dcloud.io/collocation/frame/lifecycle



### 应用生命周期

App.vue

```jsx
export default {
  onLaunch () {
    // 应用初始化完成触发一次，全局只触发一次
    // 登录，全局变量
  },
  onShow () {},  // 应用启动时候，或从后台进入前台会触发 
  onHide () {}  // 应用从前台进入后台，触发
}
```



### 页面生命周期

/pages/list/list

```jsx
<script>
export default {
  data() {
    return () {} // 页面的初始化数据
  },
  onLoad() {}, // 页面加载 1
  onShow() {}, // 页面显示 2
  onReady() {}, // 页面渲染完成 3

  onHide(){
    // 页面前进后退，触发 onHide
    // 页面隐藏，切换到后台模式触发；还会触发一个全局的 onHide, app.js的 onHide
  },
  onUnload(){
    uni.redirectTo({})
    // 页面卸载，从B页面返回到 A页面，B页面会触发 onUnload事件，然后触发 A页面的 onShow
  },
    
  methods: {
    init () {}
  }
}
</script>
```



### 组件生命周期

1. /components/card/index
2. 常用的生命周期
   1. beforeCreate
   2. created
   3. mounted
   4. destroyed

```jsx
<script>
export default {
  data() {
    return () {} // 页面的初始化数据
  },
  beforeCreate () {},
  create () {}, // 实例创建完成之后立即调用，挂载阶段还没开始
  beforeMount () {},
  mounted() {}, // 挂载到实例上后调用
  
  beforeRouteEnter() {},
  beforeRouteUpdate() {},
  beforeUpdate() {},
  
  beforeDestroy() {},
  destroyed () {}, // 实例销毁后调用
  
  methods: {
    init () {}
  }
}
</script>
```



### 父子组件生命周期

1. 先执行 App实例的生命周期
   1. App.vue：onLaunch
   2. App.vue：onShow
2. 执行子组件的生命周期
   1. component：beforeCreate
   2. component：created
3. 执行父组件的生命周期
   1. page：onLoad
   2. page：onShow
4. 执行子组件的挂载
   1. component：mounted
5. 执行父组件的 onReady
   1. page： onReady 页面渲染完成





### 小程序生命周期



#### app.js 小程序实例

```jsx
App({ // App({}) 
  onLaunch 全局只触发一次，应用初始化完成
	onShow 应用启动，或从后台进入前台
	onHide前后进入后台，触发 onHide
})
```



#### app.json 小程序配置文件



#### app.wxss 全局样式





#### Page({}) Page实例

```jsx
Page({ // pages/index.js
  data() {} 页面的初始化数据

  onLoad() {} 页面加载 1
  onShow() {} 页面显示 2
  onReady() {} 页面渲染完成 3

  onHide(){} 页面隐藏，切换到后台模式触发；还会触发一个全局的 onHide, app.js的 onHide
  onUnload(){} 页面卸载，从B页面返回到 A页面，B页面会触发 onUnload事件
  	然后触发 A页面的 onShow
    navigator to
})
```





## uni-app语法



### 小程序模板语法

1. 数据绑定, this.setData
2. 条件判断,  wx:if, wx:else
3. 列表渲染, wx:for

```jsx
Page({
  data: {
    title: '',
    isShow: false,
    arr: [100, 200, 300]
  },
  onLoad () {
    setTimeout(() => {
      this.setData({
        isShow: true, title: 'user'
      })
    }, 1000)
  }
})


<text wx:if="{{isShow}}">{{title}}</text>

<view wx:for="{{arr}}">{{item}} - {{index}}</view>
	item 当前循环项的默认值
  index 当前下标的默认值
  
<view wx:for="{{arr}}"
	wx:for-index="row" // wx:for-* 指定循环项 和 下标
	wx:for-item="list"
>{{item}}</view>
```



### vue模板语法

```jsx
<template>
  <view class="content" v-if="show">
    <view class="card"
      :class="className"
      @click="fnOpen"
    >{{title}}</view>
    <text>{{ show ? '握天人之契赞' : '洛水流年' }}</text>
  </view>
</template>

<script>
  export default {
    // data: {}, // 保留上次的数据，不会被初始化；不建议使用对象格式
    data () { // 每次都会初始化
      return () {
				title: 'user',
        className: 'active',
        show: true
      }
    },
    onLoad () { this.init() },
    methods: {
			fnOpen() {
        
      },
      init() {
        // vue语法风格
				this.title = '两朝三帝一曲赋' // this.setData({title: '两朝三帝一曲赋'})
      }
    }
  }
</script>

<style>
</style>
```





## uni-app组件化

1. 基础组件
2. 自定义组件
3. 页面布局



自定义组件使用前要注册

```jsx
import Btn from '@/components/btn/btn.vue'
```







## API用法



```jsx
uni.getSystemInfo() 获取系统信息

```



### ajax请求





## 条件编译

1. ifdef 仅在 某个平台
2. ifndef 除了 某个平台
3. || 多个平台
4. 条件编译文档 https://uniapp.dcloud.io/platform
   1. 条件后面 空格，然后是平台的名称
   2. 参考 C 语言的 #ifdef、#ifndef

```jsx
<!-- #ifndef MP-WEIXIN -->
	<text class="title">{{title}}</text>
<!-- #endif -->

style
/* #ifdef */
/* #endif */
```







## uni方法

1. uni操作手机硬件方法

```jsx
uni.getNetWorkType() 获取网络类型
```





## uni-app优势

一套代码发布多个平台

优势

1. 开发，案例数量最多

敏捷开发技巧，组件化开发思路

uni-app完整的前后台开发流程

最佳工具结合使用
# vue-router

1. 路由原理，SPA都需要路由
   1. hash，默认路由
      1.  onhashchange
   2. H5 history，需要服务端支持
      1. window.onpopState
      2. history.pushState
2. addRoutes
3. to & push
4. 路由懒加载，配合动态组件





## 前端路由的原理

1. history
   1. history.pushState 
   2. window.onpopstate
   3. 需要服务器支持，所有路由都重定向到 index.html
2. hash
   1. window.onhashchange
   2. hash的变化触发路由的变化，hash的跳转触发路由的跳转
   3. hash的前进后退，触发路由的前进后退
3. 对比选择
   1. toB端中后台，用 hash，简单易用，对 url规范不敏感，兼容性好
   2. toC端系统，选择 H5 history，需要服务端支持
   3. 能选择简单的，就别用复杂的，要考虑成本和收益





## hash

1. hash变化会触发网页跳转，即浏览器的前进，后退
2. hash变化不会刷新页面，SPA的特点
3. hash永远不会提交到 server端，前端的自生自灭
4. 事件 onhashchange



### url的组成

```jsx
http://127.0.0.1:8080/index.html?user=lucy&age=30#/city/location

location.protocol // http: 协议
location.hostname // 127.0.0.1 域名
location.host // 127.0.0.1:8080 IP地址 + 端口
location.port // 8080 端口

location.pathname // index.html
location.search // ?user=lucy&age=30
location.hash // #/city/location
```



```jsx
export default new VueRouter ({
  routes: [
    {
      path: '/user',
      component: () => import(/* webpackChunkName: 'user' */'components/User/index.vue')
    }
  ]
})
```







## history

1. 用 url规范的路由，但跳转时不刷新页面
2. history.pushState
3. window.onpopstate



### 规范的 url

1. 每次跳转都会刷新页面

```jsx
http://lulongwen.com/index.html // 刷新页面
http://lulongwen.com/list/index.html // 刷新页面
http://lulongwen.com/photo/detail.html // 刷新页面
```

2. 不刷新页面用前端路由来实现








































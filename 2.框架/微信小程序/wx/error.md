# 微信小程序错误

## 1 富文本解析
1. 微信小程序并不支持HTML标签，所以对于富文本解析来说，难度较大

## 2 http请求支持 Promise

WXSS的font-face的url不接受路径作为参数
可以将字体文件转换为base64，然后引用。

不支持requestAnimationFrame

Page.onload函数可以接受参数

不要给Page.data传入太多无用数据，会影响渲染效率，在iOS上表现特别明显

微信小程序的会默认监听文件变化，然后自动刷新。
但不足的是每次都是全量刷新，而不是模块的热替换，反而会影响开发速度，
尤其对于喜欢频繁Command + S的开发者，你会发现你的小程序在不断的刷新。建议关闭。




1. 获取 wx.getUserInfo 接口后续将不再出现授权弹窗，请注意升级
```
// 参考链接
https://developers.weixin.qq.com/blogdetail?action=get_post_info&lang=zh_CN&token=1815476620&docid=0000a26e1aca6012e896a517556c01&devtools=1&idescene=3
```

1. ` thirdScriptError
 sdk uncaught third Error
 clickMe is not defined
 ReferenceError: clickMe is not defined `
```
// 原因

```

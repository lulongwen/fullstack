# flutter

## 1 flutter 环境配置

### Android 环境
1. 安卓 SDK
	http://tools.android-studio.org/index.php/sdk

2. 在终端进入到 Android SDK 目录，在进入到 tools 目录；
  然后输入 ./android sdk 弹出可视化窗口


### 运行 flutter
1.  打开一个模拟器 `open -a Simulator`



## 2 flutter 目录结构
1. 写代码主要在 lib目录
  - `pubspec.yaml` 相当于 `package.json`

2. `cd movie` 进入项目
  - `fltter fun` 运行当前项目
  - r 修改后刷新
	- R 完全重新启动

3. r & R 的区别
  - 调整 UI样式的时候，都用菜单栏- 调试- 启动调试来进行热加载
  - 调试页面UI的时候，用热重载，调试数据、或状态用 `cli flutter run` 的命令行



## 3个必须的组件
1. Text 文本
2. Image 图片
3. Content 盒子



### 本地引入图片
1. 项目根目录建立 images文件夹
2. 项目 pubspec.yaml 文件中进行配置

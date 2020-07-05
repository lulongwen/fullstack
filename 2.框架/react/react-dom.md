# react-dom

1. react开发会下载两个包
   1. react，react的核心代码
   2. react-dom，React剥离出的涉及DOM操作的部分
2. react的核心思想是虚拟DOM
3. react包含了生成虚拟DOM的函数react.createElement，及Component类
   1. 我们自己**封装组件时，就需要继承Component类，才能使用生命周期函数**等
   2. react-dom包的核心功能就是把这些**虚拟DOM渲染到文档中变成实际DOM**。



## react-dom的3个API

1. findDOMNode
2. unmountComponentAtNode
3. render

https://www.jianshu.com/p/92a0c5933964















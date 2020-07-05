# vue核心知识点

1. 官方文档是给会用的人查阅，不是入门教程，查看文档要把握重点
2. 对照 React学习，加深对 js的理解和场景运用
3. vue高级特性体现你的技术深度，周边插件





## Vue设计理念

1. vue-cli脚手架
2. 组件化
3. 响应式数据
4. mvvm
5. 模板编译
6. vue事件，对照 react的合成事件
7. vdom & diff算法
8. vue-router路由
9. vuex数据管理





## vue用法

1. 插值 `{{}}`
2. 表达式 `a ? b :c`
3. 动态属性 `v-bind:` , 缩写  `:` 冒号，例如  `<p v-bind:id="id">{{id}}</p>`

```jsx
<template>
  <p>文本插值 {{message}}</p>
  <p>JS 表达式 {{ flag ? 'yes' : 'no' }} （只能是表达式，不能是 js 语句）</p>
  <p v-bind:id="id">{{id}}</p>
  
  <p v-html="rawHtml">
    <span>v-html有 xss 风险</span>
    <span>【注意】使用 v-html 之后，将会覆盖子元素</span>
	</p>
</template>

<script>
export default {
  data () {
    return {
      message: 'hello vue',
      flag: true,
      rawHtml: '指令 - 原始 html <b>加粗</b> <i>斜体</i>',
      id: `id-${Date.now()}`
    }
  }
}
</script>
```



### class & style

1. 动态属性
2. 驼峰规范

```jsx
<template>
  <div>
    <p :class="{ black: isBlack, yellow: isYellow }">使用 class</p>
    
    <p :class="[black, yellow]">使用 class （数组）</p>
    <p :style="styleData">使用 style</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isBlack: true,
        isYellow: true,

        black: 'black',
        yellow: 'yellow',

        styleData: {
          fontSize: '40px', // 转换为驼峰式
          color: 'red',
          backgroundColor: '#ccc' // 转换为驼峰式
        }
      }
    }
  }
</script>

<style scoped>
  .black {
    background-color: #999;
  }
  .yellow {
    color: yellow;
  }
</style>
```





### v-bind指令

1. v-html，有 xss风险，会覆盖子组件





### computed

1. 有缓存
2. 不能传参
3. 依赖 data的数据，或第三方数据，返回加工的数据

```jsx
export default {
  data () {
    return {
      num: 20
    }
  },
  computed: {
    total () {
      return this.num * 100
    },
    amount: {
      get () {
        return this.num * 100
      },
      set (value) {
        this.num = value
      }
    }
  }
}
```





### watch





### watch如何深度监听

1. watch深度监听 `deep:true`，监听引用类型，对象，数组，拿不到 oldValue
2. 因为引用类型的指针相同，此时已经指向了新的 value

```jsx
export default {
  data () {
    return {
      name: 'lucy'
      info: {
        city: 'bj'
      }
    }
  },
  watch: {
    name (oldValue, value) {
      console.log('watch name', oldVal, val) // 普通值类型，拿到 oldValue 和 value
    },
    info: {
      handler (oldValue, value) {
        // 引用类型，拿不到 oldValue的值；因为指针相同，此时已经指向了新的 value
        console.log('watch info', oldValue, value)
      },
      deep: true // 深度监听
    }
  }
}
```





#### computed & watch区别

1. computed有缓存，data不变不会重新计算

   





1. 



### v-if条件渲染

1. v-if, v-else

```jsx
<template>
  <div>
    <p v-if="type === 'a'">A</p>
    <p v-else-if="type === 'b'">B</p>
    <p v-else>other</p>

    <p v-show="type === 'a'">A by v-show</p>
    <p v-show="type === 'b'">B by v-show</p>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        type: 'a'
      }
    }
  }
</script>
```



#### v-show和 v-if的区别和使用场景







### v-for循环列表

1. 如何遍历对象，可以用 v-for
   1. in 遍历对象
   2. of 迭代
2. key的重要性，key不能乱写，如 random 或 index

```jsx
<ul>
  <li v-for="(item, index) of arr" :key="item.id">
    {{index}} - {{item.id}} - {{item.title}}
  </li>
</ul>

<ul v-if="flag">
  <li v-for="(val, key, index) of obj" :key="key">
    {{index}} - {{key}} -  {{val.title}}
  </li>
</ul>

<script>
export default {
    data () {
      return {
        flag: false,
        arr: [
          { id: 'a', title: 'vue' },
          { id: 'b', title: 'react' },
          { id: 'c', title: 'nextjs' }
        ],
        obj: {
          a: { title: 'UI' },
          b: { title: 'web' },
          c: { title: 'backend' },
        }
      }
    }
  }
</script>
```





### v-for & v-if不能一起使用

1. v-for的计算优先级高于 v-if
2. 每次循环完，还要再 v-if做一次判断



#### v-for为啥要用key 







## 表单

1. v-model
2. 常见表单项
   1. textarea
   2. checkbox
   3. radio
   4. select

```jsx
<template>
<div>
  <input type="text" v-model.trim="name"/>
  <textarea v-model="desc"></textarea>
  <!-- 注意，<textarea>{{desc}}</textarea> 是不允许的！！！ -->

  <input type="checkbox" v-model="checked"/>

  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
    
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
    
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
  <label for="mike">Mike</label>

  <input type="radio" id="male" value="male" v-model="gender"/>
  <label for="male">男</label>
  <input type="radio" id="female" value="female" v-model="gender"/>
  <label for="female">女</label>

  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>

  <p>下拉列表选择（多选） {{selectedList}}</p>
  <select v-model="selectedList" multiple>
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</div>
</template>

<script>
  export default {
    data() {
      return {
        checked: true,
        checkedNames: [],
        gender: 'male',
        selected: '',
        selectedList: []
      }
    }
  }
</script>
```





### 表单校验



### 表单修饰符

1. v-model.lazy
2. number 转数字，失败还显示字符串
3. v-model.trim 去除前后空格 
4. :value.sync

```jsx
<input type="text" v-model.trim="name"/>

```





## 事件

1. event参数，自定义参数
   1. event是原生的 `MouseEvent`
   2. 事件被挂载到当前元素
   3. `v-on: 缩写 @`
2. 事件修饰符， `v-on:click="fnClick"`, `@click="fnClick"`
3. 键盘修饰符
4. 事件被绑定到哪里？和 react的区别
   1. event.currrentTarget 是原生的，和DOM事件一样
   2. react的 nativeEvent `event.currentTarget`是 document
   3. 自己绑定的事件，需要自己销毁

```jsx
<template>
  <button @click="update">+1</button>
  <button @click="fnUpdate(2, $event)">+2</button>
</template>

<script>
export default {
  data () {
    return {
			num: 10
    }
  },
  methods: {
    update (event) {
      // event.target 触发事件的元素
      console.log('event', event.target, event.__proto__.constructor)
    },
    fnUpdate (value, event) {
      // 事件是被注册到当前元素上，currentTarget 绑定事件的元素
      console.log('target', value, event.currentTarget)
    },
    init() {}
  },
  mounted() {
    window.addEventListener('load', this.init)
  },
  beforeDestroy() {
    // 用 vue 绑定的事件，组件销毁时会自动被解绑
    // 自己绑定的事件，需要自己销毁！！！
    window.removeEventListener('load', this.init)
  }
}
</script>
```





### 事件修饰符

1. 事件

```jsx
// 阻止事件冒泡传播
<a v-on:click.stop="fnClick"></a>

// 阻止默认提交事件
<form @submit.prevent="fnSubmit"></form>

// 只有修饰符
<form @submit.prevent></form>

//修饰符的串联
<a @click.stop.prevent="fnClick"></a>

// 事件捕获，先在此处理，然后才到达内部元素
<div @click.capture="fnClick"></div>

// 事件不是从内部元素触发的，当 ev.target是当前元素自身时才触发
<div @click.self="fnClick"></div>
```





### 键盘修饰符

1. ctrl & alt & shift

```jsx
// 点击按下 ctrl & shift键都会触发
<button @click.ctrl="fnClick"></button>

// 点击只有按下 ctrl键才会触发
<button @click.ctrl.exact="fnClick"></button>

// 没有任何修饰符被按下才会触发
<button @click.exact="fnClick"></button>
```







## vue组件化

1. 组件化发展
2. `component is="List"`动态组件
3. 异步组件
4. keep-alive缓存组件
5. mixin抽离公共组件



### 组件化发展

1. php，jsp的组件化
   1. 传统组件化，只是静态渲染，更新还要依赖于操作DOM
   2. ejs，smarty
   3. 组件化不是创新，数据驱动视图是创新
2. 数据驱动视图，数据改变，视图自动刷新
   1. Vue MVVM
   2. React setState



### is动态组件





### 异步组件





### keep-alive





### mixin





### slot插槽





### $nextTick





## vue组件通信

1. 自定义 v-model
2. ref
3. props & $emit，参数校验
4. 自定义事件 `const $bus = new Vue()`

```jsx
export default {
  props: {
  	
  }
}
```



### 自定义事件

```jsx
import Vue from 'vue'
const $bus = new Vue()
// 触发自定义事件
$bus.$emit('my-change', {user: 'lucy'})

// 捕获事件
export default {
  methods: {
  	init (params) {
      console.log('my-change', params)
    }
  },
  mounted () {
    $bus.$on('myChange', this.init)
  },
  beforeDestroy () {
    // 自定义事件要及时销毁，否则可能造成内存泄露
    $bus.$off('myChange', this.init)
  }
}

```







## vue生命周期

1. 单组件生命周期
2. 父子组件生命周期



### 单组件生命周期

1. 挂载时
2. 更新时
3. 销毁时

```jsx
beforeCreated // 初始化事件，生命周期
created // this 初始化data
	判断是否有 el

mounted // DOM渲染完成

updated

beforeDestroy // this 销毁自定义事件
destroy
```



### 父子组件生命周期

1. 先父组件 created，然后执行子组件生命周期
2. 子组件 mounted渲染完成，才是父组件渲染
3. 类似于调用栈

```jsx
parent.vue created // 先初始化父组件
	children.vue created
  children.vue mounted // 子组件先渲染完
parent.vue mounted  // 父组件最后渲染完成

// update data
parent.vue beforeUpdate // 父组件先触发更新
	children.vue beforeUpdate
  children.vue update  // 子组件先渲染完成 
parent.vue update  // 父组件最后更新完成
```









## 响应式数据

1. Object.defineProperty
   1. 缺点
2. proxy
3. 监听对象，数组，深度监听



###  v-model的原理





## 模板编译

1. with语法
2. 模板编译为 render函数
3. 执行 render函数生成 vdom



### template模板







## vue组件渲染和更新过程

1. 初次渲染过程
2. 更新过程
3. 异步渲染







## vdom & diff算法

1. render函数
2. vdom结构

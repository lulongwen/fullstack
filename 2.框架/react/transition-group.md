# transition-group

1. `yarn add react-transition-group`
2. Transition 
3. CSSTransition 
   1. 单个元素的动画
   2. https://reactcommunity.org/react-transition-group/css-transition
4. TransitionGroup
   1. 多个元素动画



### 动画思考

1. react动画实现的原理





## CSSTransition

```jsx
<CSSTransition
  in={this.state.show} // 入场属性控制
  timeout={1000} // 动画时间
  classNames="fade" // 动画前缀
  unmountOnExit // 移除DOM元素
  onEntered={ el => {el.style.color = 'pink'} } // 入场动画结束回调
  appear={true} // 一上来就执行动画
  >
  <p>动画效果</p>
</CSSTransition>

// 入场动画, classNames="fade"
enter
enter-active
enter-done

// 出场动画
exit
exit-active
exit-done

// appear增加的动画
.fade-appear 第一帧
.fade-appear-active 第二帧
```





## TransitionGroup



```jsx
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group"

<TransitionGroup>
  {
    const {list} = this.state
    return list.map((item, i) => (
      <CSSTransition
        key={i}
        timeout={1000}
        classNames="fade"
        appear={true}
        >
        <div className="ani">{item}</div>
      </CSSTransition>
    ))
  }
</TransitionGroup>
```
















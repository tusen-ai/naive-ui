## git problem...

我的锅...远程分支没设定好，推得哪个自己都不知道。

## test 时候 vue v-model 产生的效果必须在 \$nextTick() 之后才会产生，虽然它声称自己是同步的...

我的锅，忘了为啥了。确实是同步的，是我没有考虑到 v-model 这东西应该用什么方法测试。

## Vue loader 编译深度选择器出了问题

a >>> b 被编译成了 a > > > b

## input 的 change 不随外界 props value 的改变改变

其他的我还没想好

## 2019.7.17 There may be a bug of chrome

在一个 single filterable select 中，会出现一个 bug...，这个 bug 会让溢出屏幕的 item 不再显示。感觉可能是 Chrome 为了性能优化没有渲染一些在屏幕外面的东西，暂时通过 translateZ(0) 解决了。

## 2019.7.17 Popover

popover 的 hover 有问题，哎...一大堆东西闪来闪去就可能 mouseleave 没触发就一直留在那了

## 2019.7.31 Margin 没有撑开元素

overflow: hidden 可以解决，这是 BFC 的问题

## 2019.8.1

width: fit-content, min-content, max-content, intrinsic, extrinsic
flex, flex-grow

```
render (h) {
    console.log(this.$props)
    return h('div', {
      staticClass: 'n-steps'
    }, mapSteps({ ...this.$props }, this.$slots.default))
  }
```

为什么 \$props 不一样？解构赋值做了什么
document.querySelector('\*[n-id=888d3] .simulate-transparent-text') 不合法？

## 2019.8.8

函数节流别忘了加上@scroll

## 2019.8.27

activator 外面不应该包元素
检查内存泄露可能性
考虑级联异步 api
placement \$refs 变化更改

## 2019.8.28

picker 在 input 聚焦的时候，esc 按钮不符合预期

## 2019.8.29

block transition for date picker in range not via :key

## 2019.9.2

select menu 更加自治一点 比如 isSelected，可能最后要加到 vmodel 为止
tooltip css max-content 兼容性
popover z-index 问题

## 2019.9.3

popover 停止追踪的时机

## 2019.9.24

popover 可能 activator 和 content 不同步，在 beforeRouteEnter locale change 的时候！！！

## 2019.9.28

confirm 有 bug = =...和 button 颜色相关，之后检查吧

## 2019.10.21

Radio Button 默认主题下是否 hollow out，这是个问题

## 2019.11.14

base picker focus 问题

## 2019.12.3

Dropdown Submenu 定位问题
还有那个... Modal + border 的问题，怎么解决

## 2019.12.20
Anchor Bug 复现 at typography

## TODO

issue fix, add delay prop
add trigger to tooltip
outside click delegate select
DatePicker range Bug
// Scrollbar Firefox...
// scrollbar 在 resize 之后滚动会有问题
ResizeObserver Polyfill

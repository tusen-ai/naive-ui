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

## 2019.12.23
Damn eslint
```
What fixed it for me was using double quotes and an escaping slash like so:
"lint": "eslint \"**/*.{js,jsx}\" --quiet",

Previously, it would not work with single quotes:
"lint": "eslint '**/*.{js,jsx}' --quiet",
```

## 2019.12.30
为了按需引入打包大小依旧可控，需要用某种方式让互相的依赖变为外部依赖。或者就维持原本的文件结构，这样的话需要的是 babel。看起来还是有点麻烦，之后再解决吧。


## TODO 排序不分先后
1. Focus Detector on Time Selector
2. Menu Root Indent = 0 可能造成问题
3. 用 RAF 优化 scrollbar 性能（不一定需要）
4. Anchor 切换有 bug，忽然闪现第一个
5. Safari select lightbar container overflow 边角（或许是 webkit 的问题）
6. Chrome lightbar offset @table fitler
7. cascader 数据结构重构，维持原选项！
8. 排查 render 函数是否每个地方都支持数组
9. form async validation
10. table filter 重构支持异步
11. tabs resize bug
12. CSS 整理
13. 落地页
14. <del>按需引入 babel plugin</del> 这个不做了，收益不大，工作量不小
15. form table 需要 size
16. input number 需要一个小型的
17. layout scroll api
18. cascader select menu disabled 选项
19. icon 的默认 stroke
20. tree 组件
21. 文件上传组件
22. custom-input 废弃或者重构
23. Date 键盘操作 Time 键盘操作
24. Time 格式化
25. Date 格式化
26. base cancel mark rename suffix
27. base picker => base selection
28. base lightbar => base tracking rect
29. loader 区分 debug 和 非 debug
30. 逐步放宽对宽度必需传 number 的现实，尤其是对于 table
31. BaseLoading 代替 Log 里的 Spin
32. Modal 内部组件的卸载方式
33. Anchor 的另一种模式，追踪内容按照的是中间范围而不是自身大小


```
Done
// modal transform scale
// Notification content close
// form required css
// Md Loader 对于 strong 的处理
// pref hollowout, cache next bg color
// issue fix, add delay prop
// add trigger to tooltip
// outside click delegate select
// DatePicker range Bug
// Scrollbar Firefox...
// scrollbar 在 resize 之后滚动会有问题
// ResizeObserver Polyfill
// Select 需要进一步重构，现在这种状况 collector 在 corner case 中不会调 updated 钩子，要把 key 换成 value
```
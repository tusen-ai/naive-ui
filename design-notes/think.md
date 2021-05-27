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

width: fit-content, min-content, max-content, intrinsic, extrinsic flex, flex-grow

```
render (h) {
    console.log(this.$props)
    return h('div', {
      staticClass: 'n-steps'
    }, mapSteps({ ...this.$props }, this.$slots.default))
  }
```

为什么 \$props 不一样？解构赋值做了什么 document.querySelector('\*[n-id=888d3] .simulate-transparent-text') 不合法？

## 2019.8.8

函数节流别忘了加上@scroll

## 2019.8.27

activator 外面不应该包元素检查内存泄露可能性考虑级联异步 api placement \$refs 变化更改

## 2019.8.28

picker 在 input 聚焦的时候，esc 按钮不符合预期

## 2019.8.29

block transition for date picker in range not via :key

## 2019.9.2

select menu 更加自治一点 比如 isSelected，可能最后要加到 vmodel 为止 tooltip css max-content 兼容性 popover z-index 问题

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

Dropdown Submenu 定位问题还有那个... Modal + border 的问题，怎么解决

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

## 2019.2.26

虽然没啥用了，还是留着吧

```
/**
* In Chrome, Firefox, Safari, this only happens when devtool opened
* However only Chrome and Firefox will refocus at input element
*/
const devtoolIsOpened = e.target === document.activeElement
```

## 2020.3.7

主体差不多做完了，好累

## 2020.3.8

zindex 有点问题

## 2020.3.11

zindex 的问题解决了，虽然很简单，在 static 元素上设定 zindex 没用，😅

## 2020.3.15

在搞响应式页面的时候，我意识到存粹依赖 css 是一种不可靠的方式。虽然从布局层面 grid layout 已经给出了一种近乎完美的解决方案，但是涉及到一切内联样式的... 都需要从 js 的层面来解决。目前想来最 trival 的方式就是让每个 config consumer 都能拿到这个值。

## 2020.3.20

一想到到了 1.0 就要写 changelog，就感觉 🥚 在隐隐作痛

## 2020.3.25

一个有趣的事情是，blur 到 document.body 之后，document.activeElement 是 body，但是 blurEvent.relatedTarget 会被设为 null

## 2020.5.18

rerender 报警了

```
h('NLayout', {
  ref: 'body',
  style: { ...this.contentStyle },
  props: {
    'use-native-scrollbar': false,
    'scroll-content-style': {
      width: '100%',
      boxSizing: 'border-box',
      padding: this.paddingBody ? '21px 48px' : null
    }
  }
}, null)
```

一个是 computed 导致重复渲染，还有一个是 getScrollParent 缓存的问题

## 2020.5.19

我在想要不要帮用户检查值，比如说一些不存在的值...现在这个问题就出现在 checkbox 里面，这是个哲学问题

## 2020.5.19

得看懂 vue 究竟是怎么更新组件的...

## 2020.5.28

目前看来，对于动态样式，有两种情况，一种是像直接通过 prop 生效，另一种是通过组合才生效，比如 error 的 formitem 与 input，判断是否要生成样式是个比较麻烦的事，目前看来比较凑巧的是这个样式的体积不是很大，其实放在哪边都差不多= =

## 2020.5.29

主题变量有两种组织方式：

```
light {
  error: {
    backgroundColor: {
      hover
    }
  }
}
或者
light {
  backgroundColor: {
    error: {
      default
    }
  }
}
```

我目前觉得第一种好点，因为扩展一般是按照种类扩展，每次插入一个同样结构的块。而第二种是每次扩展的时候在每个块里同样的位置插入一行，这样扩展的时候写起来很别扭。

## 2020.7.1

shouldMount 可以加到 withCssr

## 2020.7.8

style overrides RFC

## 2020.8.2

颜色命名的方式

```
1.
{
  xColor,
  xActiveColor,
  xDisabledColor,
  secondaryTextColor,
  tertiaryTextColor
},
{ // 这种拒绝，因为只有一个状态也需要 default
  xColor: {
    default,
    active,
    disabled
  }
}
// 现在感觉第三种比较好
{
  xColor,
  xColorActive,
  xColorDisabled,
  textColor2, // 暂时可以先不改
  textColor3, //
  textColorDisabled,
  textColor1,
  textColor2,
  textColor3,
  textColorQ...
}
// 还有一点是去掉 backgroundColor 中的 background，因为 color & textColor 区分度已经够了
```

```js
// no import on demand
import naive from 'naive-ui'

naive.Button.overrideStyles({
  light: {
    borderRadius: 8
  },
  dark: {
    borderRadius: 8
  }
})

naive.InputNumber.overrideStyles({
  light: {
    borderRadius: 8
  },
  dark: {
    borderRadius: 8
  }
})

naive.themes.light.overrideStyles({
  primaryColor: '1234'
})

Vue.use(naive)
```

```js
// import on demand

// essential
import create from 'naive-ui/create'
import lightStyle from 'naive-ui/styles/light'
import darkStyle from 'naive-ui/styles/dark'

// components
import Button from 'naive-ui/button'

// styles
import buttonLightStyle from 'naive-ui/button/styles/light'
import buttonDarkStyle from 'naive-ui/button/styles/dark'

create({
  components: [Button],
  styles: [
    // base styles, required for each theme
    lightStyle,
    darkStyle,
    // component styles
    buttonLightStyle,
    buttonDarkStyle
  ]
})
```

## 2020.10.22

```js
// extend Element.prototype.scrollTo
// override 1 (xCoord, yCoord) keep it
// overried 2 ScrollOptions
// ScrollOptions {
//   x: number,
//   y: number,
//   behavior: 'auto' | 'smooth'
//   index?: number
//   key?: number
//   el?: Element
//   position?: 'bottom' | 'top',
//   slient?: boolean
// }
```

## TODO 排序不分先后

1. <del>Focus Detector on Time Selector</del>
2. <del>Menu Root Indent = 0 可能造成问题</del>
3. <del>用 RAF 优化 scrollbar 性能（不一定需要）</del>为了有时候滚动同步的一致性，决定不做了
4. <del>Anchor 切换有 bug，忽然闪现第一个</del>
5. <del>Safari select lightbar container overflow 边角（或许是 webkit 的问题）</del>默认选中第一个可以装作这个问题不存在
6. <del>Chrome lightbar offset @table fitler</del> select menu 始终存在这个问题，不知道原因是什么
7. <del>cascader 数据结构重构，维持原选项！</del> 这个不做了，对 Children 的处理过于边角，Patch 那块也会从声明式变成命令式
8. <del>排查 render 函数是否每个地方都支持数组</del> 我现在明白了，只要套上数组，vue 就能完美的渲染
9. <del>form async validation</del>
10. <del>table filter 重构支持异步</del>
11. <del>tabs resize bug</del>
12. <del>CSS 整理</del> 暂且算做完了
13. <del>落地页</del>
14. <del>按需引入 babel plugin</del> 这个不做了，收益不大，工作量不小
15. <del>form table 需要 size</del>
16. <del>input number 需要一个小型的</del> 目前看来也不是很必要，input number 其实可以很小
17. <del>layout scroll api</del>
18. <del>cascader select menu disabled 选项</del>
19. <del>icon 的默认 stroke</del>
20. <del>tree 组件</del>
21. <del>文件上传组件</del>
22. <del>custom-input 废弃或者重构</del>
23. <del>Date 键盘操作 Time 键盘操作</del> 先把能做的做了
24. <del>Time 格式化</del>
25. <del>Date 格式化</del>
26. <del>base cancel mark rename suffix</del>
27. <del>base picker => base selection</del>
28. <del>base lightbar => base tracking rect</del>
29. <del>loader 区分 debug 和 非 debug</del>
30. <del>逐步放宽对宽度必需传 number 的现实，尤其是对于 table</del>
31. <del>BaseLoading 代替 Log 里的 Spin</del>
32. <del>Modal 内部组件的卸载方式</del>
33. <del>Anchor 的另一种模式，追踪内容按照的是中间范围而不是自身大小</del>
34. <del>bug md-loader alert 内的 code 不显示</del> 不是 bug，md 就这么渲染
35. <del>backtop mounted blink</del>
36. <del>Tab keep alive</del>
37. <del>Cascader submenu 的 lightbar 用 base tracking rect 代替</del>
38. <del>Dropdown 样式微调</del>
39. <del>Card 用 padding 代替 margin 来避免 margin 折叠的问题</del> 不做了，要是想避免折叠让用户自己写 bfc 吧
40. <del>检查 Icon 在 button 中切换有没有问题，直觉来说应该没问题</del>
41. <del>Radio Group 和 Steps 的镂空效果在 mounted 的时候 transition 没有关闭</del>
42. <del>Typography 文档待更新</del>
43. <del>Tab 文档待更新</del>
44. <del>Icon 文档待更新</del>
45. <del>把 Upload 的回调 API 从 promise 改成 callback 格式的，文档也要对应修改</del> 我决定全面提供 Promise API 而不是 callback 风格的
46. <del>Date Picker 的 format 文档内容</del>s
47. <del>Button Group 样式</del>
48. <del>text button icon</del>
49. <del>tab scroll 计算有潜在 bug</del>
50. <del>data-table 的 header height 为啥要固定？因为固定列的问题，sticky 解决了就没事</del>
51. <del>scrollbar 在平时不显示用不到的 rail</del>
52. <del>placeholder transition 对 firefox 做兼容</del>
53. <del>调整 date picker 的尺寸</del>s
54. <del>Select option 右侧 padding 调整</del>
55. <del>Popover arrow shadow 调整</del>
56. <del>Input number 按钮样式调整</del>
57. <del>一部分组件在 Modal 内部的样式</del> 还差 data table 的选项们
58. <del>更新 Progress 文档</del>
59. <del>为所有的数据录入组件的尺寸</del>
60. <del>审核文档</del> 就这样吧，凑活
61. <del>调整 transfer 的样式</del>
62. <del>Table cascader 差一点国际化</del>
63. <del>Anchor 初次滚动的逻辑是不是要手动调整一下，现在位置实际上不一致</del>
64. <del>将所有的 Typography 组件改为非 Functional 的，因为获取不到 context 本身的主题</del>
65. <del>搞明白 table layout 这个 css 属性是在干什么</del>
66. <del>Icon 颜色</del> 原来我早就解决了，都忘了...
67. <del>Modal 滚动之后的 transform origin</del>
68. <del>Slider 对于 modal 适配</del>
69. <del>table fixed scroll checkbox, not sync</del>
70. <del>Transfer no data</del>
71. <del>Metropolis 从自带字体去掉<del>
72. <del>Input Group</del>
73. <del>Dropdown API 修改为 label + value，目前为止 UI 并没有出现过 key，不能只为了它搞特殊，value 可以，key 甚至会另有作用，现在占用实际是个危险的事情</del>
74. <del>card slot</del>
75. <del>table fixed computed left right</del>
76. <del>gradient text 的切换能解决？</del>目前我想不出解决办法，希望未来 CSS 能增加 gradient 的渐变
77. <del>Auto Complete Group</del>
78. <del>select add tag</del>
79. <del>dynamic input</del> 还差英文文档
80. <del>input 严格受控</del>
81. <del>搞明白 vue 的 scoped 和 普通的关系</del>
82. <del>Form Item 不返回 true 的时候... 错误信息不会消失，这似乎不太合理?</del> async-validator 的特性
83. <del>Form Item 应该和 Input Group 也契合良好</del> 能用
84. <del>Notification 主题切换需要工作良好</del>
85. <del>Notification 这个东西很特殊...</del>感觉也没那么特殊
86. <del>文件上传的回调方式改成传对象</del>
87. 抵御外界 CSS 变化，比如 line-height 之类的，需要一个良好的测试机制
88. <del>CSS Font 选择</del> 对英文应该没有那么麻烦，走系统字体就好了，然而对中文又没什么好的解决方案，so 先这个样子，之后再琢磨琢磨
89. <del>把所有用 $slots 判断的地方都改成 $scopedSlots，[原因](https://vuejs.org/v2/api/#vm-scopedSlots)<del> done
90. <del>调整默认状态下 button, input 的 icon 的颜色</del>
91. <del>优化 button 的样式，现在太冗余了，关键是怎么同步按钮的主题变量呢...</del>
92. <del>placeable 按需注册</del>
93. steps 列表优化
94. tabs 列表优化
95. tree 列表优化
96. <del>cascader 列表优化</del>
97. 更多的 tabs 选择
98. <del>下拉菜单应该给 icon 留空间</del>
99. <del>Form item feedback 好像有点问题，消失的时候，自定义时候</del>
100. <del>Confim 重命名 Dialog</del> 算了不换了，牵扯的地方太多不好改了，confirm 也就凑活吧
101. Dark Debug 3，Safari 你可太秀了......
102. <del>close-outline icon</del>
103. <del>input + icon 主题切换 transition 有问题!!!</del>
104. <del>auto-complete 自定义元素 demo 有问题</del> 有 pendingData 的时候 preventDefault
105. <del>markdown 渲染缺少空格，修正了 n-select single filterable 时 placeholder 的样式问题</del> caused by vue compiler `preserveWhitespace: false`, change it to `whitespace: 'condense'`
106. <del>drawer 加上滚动条，以及 overflow auto 的样式</del>
107. <del>所有弹出的东西改成 body-style</del>
108. <del>size 切换的时候... transfer 动画问题</del>
109. 利用了公用组件的组件样式没办法特殊调教，比如 select 组件自身是没有命名空间的，这个想要单独定制就比较麻烦。先不出来怎么解决
110. <del>treemate 重构 cascader，异步 api 需要更改</del>
111. 样式不能被 cloned，因为 peers 机制

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

```cache
需要注意的是，以 Base 开头的 CSS 文件并不会确保随着版本的更新保持稳定（我会尽力的保持）。因为它是内部实现的一部分。如果你维持按需引入时升级后样式出现了错误，可以来这里检查一下。虽然把这些公共样式各自打包进每个用到他们的组件是可行的，但是相比于升级的繁琐，我更不喜欢重复的代码。（这不意味着这种解决方案是“更好的”，它只是种选择而已）

What should be noted is the CSS files start with 'Base' are not guaranteed to be stable (I'll try not to change them). Because they are parts of internal implementation of the library. If you find import mistakes after upgrade the package, you may have a look at here. It is possible to pack these common styles inside every component using it. However, compared to add routines when upgrading package, I perfer not to import duplicate codes. (It doesn't mean this is a better solution. It is only a choice.)
```

How I want to use styling API ?

```js
// index.js
import { createApp } from 'vue'
import { create, enUS, buttonLight, inputLight } from 'naive-ui'

const app = createApp()
const naive = create({
  // install components globally or import it in other component are both ok
  // components: [
  //   Button,
  //   Input
  // ],
  styles: [buttonLight, inputLight],
  locales: [enUS]
})

app.use(naive)
```

## 2020.11.14 是否要给 icon 加上默认的 color transition?

否。前提条件是 svg 在合适的地方用到了 currentColor。

for example:

```
<n-icon>
  <svg>
    <line stroke="currentColor">
  </svg>
</n-icon>
```

我期望的是 n-icon 一直跟着外部走，如果外面有 transtion 了那内部其实不需要 transition，不然的话会重叠。如果一定需要 transition 的话应该去保证样式带 color transition。

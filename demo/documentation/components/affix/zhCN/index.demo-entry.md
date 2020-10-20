# 固钉 Affix
Affix 可以让内容在页面滚动的时候固定在一个位置，它和 `position: sticky` 有那么点像不过可以做更多事。
## 演示
```demo
basic
position
```
## Props
|名称|类型|默认值|描述|
|-|-|-|-|
|position|`'fixed' \| 'absolute'`|`'fixed'`||
|top|`number`|`null`|在触发顶部固定后 Affix 的 CSS top 属性（如果没设定，会使用 `offset-top` 代替)|
|offset-top|`number`|`null`|触发顶部固定时，Affix 和目标元素元素的顶部距离（如果没设定，会使用 `top` 代替)|
|bottom|`number`|`null`|在触发顶部固定后 Affix 的 CSS bottom 属性（如果没设定，会使用 `offset-bottom` 代替)|
|offset-bottom|`number`|`null`|触发底部固定时，Affix 和目标元素元素的底部距离（如果没设定，会使用 `bottom` 代替)|
|target|`() => HTMLElement`|一个返回最邻近可滚动祖先元素的函数|需要监听滚动的元素|
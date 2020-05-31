# 弹出信息 Popover

Popover 在内容周围弹出一些隐藏的信息。Popover 里面没什么内置样式，在里面填什么主要靠你了。

如果你只想展示一些基本的文本内容，使用 [Tooltip](n-tooltip)。

## 演示

```demo
basic
trigger
controller
delay
no-arrow
event
placement
raw-content
width
manual-position
```

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null`|`null`||
|trigger|`'hover' \| 'trigger' \| 'manual'`|`'hover'`||
|show|`boolean`|`false`|在 `manual` 触发时控制弹出信息是否显示|
|delay|`number`|`0`|悬浮触发弹出信息的延迟|
|duration|`number`|`300`|悬浮关闭弹出信息的延迟|
|placement|`'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end' \| `|`'bottom'`||
|show-arrow|`boolean`|`true`||
|raw|`boolean`|`false`|是否不添加默认样式|
|disabled|`boolean`|`false`|是否不能激活弹出信息|
|filp|`boolean`|`true`|是否在当前放置方式不能提供足够空间的时候调整弹出信息的位置|
|controller|`Object`|`null`|`n-popover` 的控制器对象。如果对象被传入了，那么它会被添加 `show`（展示弹出内容） 和 `hide`（隐藏弹出内容） 方法。这两个方法可以在非 `manual` 控制的时候来控制弹出信息的显示状态|
|overlay-class|`string`|`null`||
|overlay-style|`Object`|`null`||
|arrow-style|`Object`|`null`||
|display-directive|`'if' \| 'show'`|`'if'`|条件渲染使用的指令，`if` 会让内容被使用 `v-if` 渲染，`show` 会让内容被使用 `v-show` 渲染|
|manually-positioned|`boolean`|`false`|是否要手动控制位置|
|x|`number`|`null`|手动控制位置时填出内容的 CSS `left` 的像素值|
|y|`number`|`null`|手动控制位置时填出内容的 CSS `top` 的像素值||
|width|`number \| string`|`null`||
|min-width|`number \| string`|`null`||
|max-width|`number \| string`|`null`||

## Slots
|名称|参数|说明|
|-|-|-|
|activator|`()`|触发弹出信息的组件或元素|
|default|`()`|弹出的内容|

## Events
|名称|参数|说明|
|-|-|-|
|show|`()`||
|hide|`()`||
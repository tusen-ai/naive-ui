# 弹出信息 Popover

Popover 在内容周围弹出一些隐藏的信息。Popover 里面没什么内置样式，在里面填什么主要靠你了。

如果你只想展示一些基本的文本内容，使用 [Tooltip](n-tooltip)。

## 演示

```demo
basic
delay
no-arrow
trigger
event
placement
raw-content
width
manual-position
```

## Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|trigger|`'hover' \| 'trigger' \| 'manual'`|`'hover'`||
|delay|`number`|`0`||
|duration|`number`|`300`||
|placement|`'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end' \| `|`'bottom'`||
|arrow|`boolean`|`false`||
|raw|`boolean`|`false`||
|disabled|`boolean`|`false`||
|manuallyPositioned|`boolean`|`false`||
|x|`number`|`null`||
|y|`number`|`null`||
|filp|`boolean`|`true`||
|controller|`object`|`null`||
|overlay-class|`string`|`null`||
|overlay-style|`object`|`null`||

## Events
|名称|参数|
|-|-|
|show|`()`|
|hide|`()`|
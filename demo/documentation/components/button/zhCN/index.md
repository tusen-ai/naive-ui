# 按钮 Button
按钮用来触发一些操作。
## 演示
```demo
basic
text
disabled
icon
events
shape
ghost
loading
group
debug
```
## Props
### Button Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|size|`'small' \| 'medium' \| 'large'`|`'medium'`
|type|`'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'`|`'default'`||
|text|`boolean`|`false`||
|ghost|`boolean`|`false`||
|disabled|`boolean`|`false`||
|circle|`boolean`|`false`||
|round|`boolean`|`false`||
|loading|`boolean`|`false`||
|icon-placement|`'left' \| 'right'`|`'left'`||

### Button Group Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|vertical|`boolean`|`false`||

## Slots
### Button Slots
|名称|参数|介绍|
|-|-|-|
|default|`()`||
|icon|`()`||

### Button Group Slots
|名称|参数|介绍|
|-|-|-|
|default|`()`||

## Events
### Button Events
|名称|参数|介绍|
|-|-|-|
|click|`(e: MouseEvent)`||

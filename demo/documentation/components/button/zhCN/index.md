# 按钮 Button
按钮用来触发一些操作。
## 演示
```demo
basic
size
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
|名称|类型|默认值|说明|
|-|-|-|-|
|size|`'tiny' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|type|`'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'`|`'default'`||
|text|`boolean`|`false`||
|block|`boolean`|`false`||
|ghost|`boolean`|`false`||
|disabled|`boolean`|`false`||
|circle|`boolean`|`false`||
|round|`boolean`|`false`||
|loading|`boolean`|`false`||
|icon-placement|`'left' \| 'right'`|`'left'`||

### Button Group Props
|名称|类型|默认值|说明|
|-|-|-|-|
|size|`'small' \| 'medium' \| 'large'`|`'medium'`|在组内的按钮的尺寸。如果设定，内部的按钮尺寸将不生效|
|vertical|`boolean`|`false`||

## Slots
### Button Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||
|icon|`()`||

### Button Group Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||

## Events
### Button Events
|名称|参数|说明|
|-|-|-|
|click|`(e: MouseEvent)`||

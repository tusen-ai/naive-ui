# 按钮 Button
按钮用来触发一些操作。
## 演示
```demo
basic
size
text
disabled
color
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
|color|`string`|`null`|只支持形如 `#FFF`, `#FFFFFF`, `rgb(0, 0, 0)` 的颜色|
|size|`'tiny' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|type|`'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'error'`|`'default'`||
|text|`boolean`|`false`||
|block|`boolean`|`false`||
|ghost|`boolean`|`false`||
|disabled|`boolean`|`false`||
|circle|`boolean`|`false`||
|round|`boolean`|`false`||
|loading|`boolean`|`false`||
|keyboard|`boolean`|`true`|是否支持键盘操作|
|icon-placement|`'left' \| 'right'`|`'left'`||
|theme|`'light' \| 'dark'`|`null`||

### Button Group Props
|名称|类型|默认值|说明|
|-|-|-|-|
|size|`'tiny' \| 'small' \| 'medium' \| 'large'`|`null`|在组内的按钮的尺寸。如果设定，内部的按钮尺寸将不生效|
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

# 抽屉 Drawer
我感觉和 Modal 功能差不太多，位置有点差别。
## 演示
```demo
basic
multiple
```
## V-model
|prop|event|
|-|-|
|show|hide|

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|show|`boolean`|`false`||
|placement|`'top' \| 'right' \| 'bottom' \| 'left'`|`'right'`||
|width|`number \| string`|`251`||
|height|`number \| string`|`251`|在位置是 `top` 和 `bottom` 时生效|
|mask-closable|`boolean`|`true`|点击遮罩时是否发出 `hide` 事件|
|drawer-style|`object`|`null`||

## Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||

## Events
|名称|参数|说明|
|-|-|-|
|show|`()`||
|hide|`(show: false)`||
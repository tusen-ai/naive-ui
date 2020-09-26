# 抽屉 Drawer
我感觉和 Modal 功能差不太多，位置有点差别。
## 演示
```demo
basic
multiple
target
dark-1-debug
dark-2-debug
dark-3-debug
dark-4-debug
```

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|body-class|`string`|`undefined`||
|body-style|`Object`|`undefined`||
|height|`number \| string`|`251`|在位置是 `top` 和 `bottom` 时生效|
|mask-closable|`boolean`|`true`|点击遮罩时是否发出 `update:show` 事件|
|placement|`'top' \| 'right' \| 'bottom' \| 'left'`|`'right'`||
|show|`boolean`|`false`||
|themed-style|`{ [themeName: string]: Object } \| null`|`null`||
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|to|`string \| HTMLElement`|`'body`|抽屉出现的区域|
|width|`number \| string`|`251`||
|on-update:show|`(show: boolean) => any`|`undefined`||

## Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||

## Events
|名称|参数|说明|
|-|-|-|
|show|`()`||
|hide|`(show: false)`||
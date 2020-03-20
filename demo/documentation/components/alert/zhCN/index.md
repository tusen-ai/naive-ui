# 警示信息 Alert
根据我的经验，这东西使用最频繁的场景是让你关掉 AdBlocks。
## 演示
```demo
basic
closable
icon
no-icon
```
## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|themed-style|`{ [themeName: string]: object }`|`null`||
|title|`string`|`null`||
|show-icon|`string`|`true`||
|type|`'default' \| 'info' \| 'success' \| 'warning' \| 'error'`|`'default'`||
|closable|`boolean`|`false`||
|on-close|`() => boolean \| Promise<boolean> \| any`|`() => true`||
|on-after-hide|`function`|`null`||

## Slots
|名称|参数|说明|
|-|-|-|
|header|`()`||
|default|`()`||
|icon|`()`||

## Events
|名称|参数|说明|
|-|-|-|
|close|`()`||
|after-hide|`()`||
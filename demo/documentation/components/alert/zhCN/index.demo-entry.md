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
|closable|`boolean`|`false`||
|show-icon|`boolean`|`true`||
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|themed-style|`{ [themeName: string]: Object } \| null`|`null`||
|title|`string`|`undefined`||
|type|`'default' \| 'info' \| 'success' \| 'warning' \| 'error'`|`'default'`||
|on-after-leave|`Function`|`undefined`||
|on-close|`() => boolean \| Promise<boolean> \| any`|`() => true`||

## Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||
|header|`()`||
|icon|`()`||
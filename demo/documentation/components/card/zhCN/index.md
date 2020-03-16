# 卡片 Card
一些经验不足的 UI 设计师喜欢在它上面滥用阴影。
## 演示
```demo
basic
size
cover
slots
border
segment
closable
```
## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|title|`string`|`null`||
|content-style|`object \| string`|`null`||
|header-style|`object \| string`|`null`||
|segmented|`boolean \| { [part in 'content' \| 'footer' \| 'action']?: boolean \| 'soft' \| 'hard' }`|`false`||
|size|`'small' \| 'medium' \| 'large' \| 'huge'`|`'medium'`||
|bordered|`boolean`|`true`||
|closable|`boolean`|`false`||
|theme|`'light' \| 'dark'`|`null`||
|themed-style|`{ [themeName: string]: object }`|`null`||

## Events
|名称|参数|说明|
|-|-|-|
|close|`()`||

## Slots
|名称|参数|说明|
|-|-|-|
|header|`()`||
|header-extra|`()`||
|default|`()`||
|footer|`()`||
|action|`()`||

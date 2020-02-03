# 卡片
一些经验不足的 UI 喜欢它在上面滥用阴影。
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
|名称|类型|默认值|介绍|
|-|-|-|-|
|title|`string`|`null`||
|content-style|`object \| string`|`null`||
|header-style|`object \| string`|`null`||
|segmented|`boolean \| object`|`false`||
|size|`'small' \| 'medium' \| 'large' \| 'huge'`|`'medium'`||
|bordered|`boolean`|`true`||
|closable|`boolean`|`false`||

## Events
|名称|参数|介绍|
|-|-|-|
|close|`()`||

## Slots
|名称|参数|介绍|
|-|-|-|
|header|`()`||
|header-extra|`()`||
|default|`()`||
|footer|`()`||
|action|`()`||

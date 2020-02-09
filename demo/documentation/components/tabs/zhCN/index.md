# 标签页 Tabs
在同一块区域切换内容。
## 演示
```demo
basic
flex-label
card
```
## V-model
V-model 暂时不对外暴露，名字没起好。

## Props
### Tabs Props
|名称|类型|默认值|说明|
|-|-|-|-|
|type|`'line' \| 'card'`|`'line'`||
|closable|`boolean`|`false`||
|justify-content|`'space-between' \| 'space-around' \| 'space-evenly'`|`null`||

### Tab Panel Props
|名称|类型|默认值|说明|
|-|-|-|-|
|label|`string`|`null`||
|name|`string \| number`|`null`|**必需**|
|disabled|`boolean`|`false`||

## Slots
### Tabs, Tab Panel Slots
|名称|类型|说明|
|-|-|-|
|default|`()`||
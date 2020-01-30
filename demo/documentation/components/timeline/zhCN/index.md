# Timeline 时间线
这个世界有两个纬度：时间、事件。
## 例子
```demo
basic
size
item-placement
```
## Props
### Timeline Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|item-placement|`'left' \| 'right'`|`'left'`||
|size|`'medium' \| 'large'`|`'medium'`||

### Timeline Item Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|title|`string`|`null`||
|content|`string`|`null`||
|time|`string`|`null`||
|type|`'default' \| 'success' \| 'info' \| 'warning' \| 'error'`|`'default'`||

## Slots
### Timeline Slots
|名称|参数|介绍|
|-|-|-|
|default|`()`||

### Timeline Item Props
|名称|参数|介绍|
|-|-|-|
|default|`()`||
|header|`()`||
|footer|`()`||
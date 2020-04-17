# 标签 Tag
通常用来展示一些属性，偶尔也用来当一些备选的属性。

## 演示
```demo
basic
closable
disabled
size
checkable
shape
dynamicTags
```

## V-model
|prop|event|
|-|-|
|checked|checked-change|

## Props
### Tag
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|type|`'default' \| 'info' \| 'succcess' \| 'warning' \| 'error'`|`'default'`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|disabled|`boolean`|`false`||
|round|`boolean`|`false`||
|checkable|`boolean`|`false`||
|checked|`boolean`|`false`||
|closable|`boolean`|`false`||

### DynamicTags
|名称|类型|默认值|说明|
|-|-|-|-|
|value|`array`|`[]`||
|theme|`'light' \| 'dark'`|`null`||
|type|`'default' \| 'info' \| 'succcess' \| 'warning' \| 'error'`|`'default'`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|disabled|`boolean`|`false`||
|round|`boolean`|`false`||
|closable|`boolean`|`false`||

## Slots
|名称|参数|说明|
|-|-|-|
|default|`()`||

## Events
### Tag
|名称|参数|说明|
|-|-|-|
|close|`()`|
|checked-change|`(checked: boolean)`||

### DynamicTags
|名称|参数|说明|
|-|-|-|
|change|`(tags: array)`||
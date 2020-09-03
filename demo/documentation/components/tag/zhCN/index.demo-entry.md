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
dynamic-tags
```

## V-model
### Tag
|prop|event|
|-|-|
|checked|checked-change|

### DynamicTags
|prop|event|
|-|-|
|value|change|

## Props
### Tag
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null`|`null`||
|type|`'default' \| 'info' \| 'success' \| 'warning' \| 'error'`|`'default'`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|disabled|`boolean`|`false`||
|round|`boolean`|`false`||
|checkable|`boolean`|`false`||
|checked|`boolean`|`false`||
|closable|`boolean`|`false`||

### DynamicTags
|名称|类型|默认值|说明|
|-|-|-|-|
|value|`Array<string>`|`[]`||
|theme|`'light' \| 'dark' \| null`|`null`||
|type|`'default' \| 'info' \| 'success' \| 'warning' \| 'error'`|`'default'`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|disabled|`boolean`|`false`||
|round|`boolean`|`false`||
|closable|`boolean`|`false`||
|inputStyle|`Object`|`{ width: '50px' }`||
|tagStyle|`Object`|`{ marginRight: '5px', marginBottom: '5px' }`||

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
|change|`(tags: Array<string>)`||
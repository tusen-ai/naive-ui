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
```

## Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|type|`'default' \| 'info' \| 'succcess' \| 'warning' \| 'error'`|`'default`||
|size|`'small' \| 'medium' \| 'large'`|`'medium`||
|disabled|`boolean`|`false`||
|round|`boolean`|`false`||
|checkable|`boolean`|`false`||
|checked|`boolean`|`false`||
|closable|`boolean`|`false`||

## Slots
|名称|参数|介绍|
|-|-|-|
|default|`()`||

## Events
|名称|参数|介绍|
|-|-|-|
|close|`()`|
|checked-change|`(checked: boolean)`||

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

## Props
### Tag
|名称|类型|默认值|说明|
|-|-|-|-|
|checkable|`boolean`|`false`||
|checked|`boolean`|`false`||
|closable|`boolean`|`false`||
|disabled|`boolean`|`false`||
|round|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|theme|`'light' \| 'dark' \| string`|`undefined`||
|type|`'default' \| 'info' \| 'success' \| 'warning' \| 'error'`|`'default'`||
|on-update:checked|`(value: boolean) => any`|`undefined`||

### DynamicTags
|名称|类型|默认值|说明|
|-|-|-|-|
|closable|`boolean`|`false`||
|disabled|`boolean`|`false`||
|input-style|`Object`|`{ width: '50px' }`||
|round|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|tag-style|`Object`|`{ marginRight: '5px', marginBottom: '5px' }`||
|theme|`'light' \| 'dark' \| string`|`undefined`||
|type|`'default' \| 'info' \| 'success' \| 'warning' \| 'error'`|`'default'`||
|value|`Array<string>`|`[]`||
|on-update:value|`(value: boolean) => any`|`undefined`||

## Slots
### Tag
|名称|参数|说明|
|-|-|-|
|default|`()`||
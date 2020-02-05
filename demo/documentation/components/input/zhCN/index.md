# 文本输入 Input
很多年前，人们还在用打孔纸卡输入。
## 演示
```demo
basic
size
round
icon
password
event
disabled
clearable
autosize
```
## V-model
|Prop|Event|
|-|-|
|value|input|

## Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|type|`'text' \| 'password' \| 'textarea'`|`'text'`||
|value|`string \| [string \| null, string \| null]`|`null`||
|disabled|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|rows|`number`|`3`||
|round|`boolean`|`false`||
|minlength|`number`|`null`||
|maxlength|`number`|`null`||
|clearable|`boolean`|`false`||
|autosize|`boolean \| { minRows?: number, maxRows?: number }`|`false`||
|readonly|`boolean`|`false`||
|placeholder|`string`|`null`||

## Slots
|属性|类型|介绍|
|-|-|-|
|affix|`()`||
|suffix|`()`||

## Events
|属性|类型|介绍|
|-|-|-|
|input|`(value: string)`||
|change|`(value: string)`||
|blur|`()`||
|focus|`()`||

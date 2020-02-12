# 文本输入 Input
很多年前，人们还在用打孔纸卡输入。
## 演示
```demo
basic
size
round
icon
password
disabled
clearable
autosize
pair
input-group
```
## V-model
|Prop|Event|
|-|-|
|value|input|

## Props
### Input Props
|名称|类型|默认值|说明|
|-|-|-|-|
|type|`'text' \| 'password' \| 'textarea'`|`'text'`||
|pair|`boolean`|`false`|是否输入成对的值|
|value|`string \| [string, string]`|`null`|文本输入的值。如果是 `pair` 是 `true`，`value` 是一个数组|
|disabled|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|rows|`number`|`3`||
|round|`boolean`|`false`||
|minlength|`number`|`null`||
|maxlength|`number`|`null`||
|clearable|`boolean`|`false`||
|autosize|`boolean \| { minRows?: number, maxRows?: number }`|`false`||
|readonly|`boolean`|`false`||
|seperator|`string`|`null`|成对的值中间的分隔符|
|placeholder|`string \| [string, string]`|`null`|文本输入的占位符。如果是 `pair` 是 `true`，`placeholder`是一个数组|

## Slots
### Input Slots
|属性|类型|说明|
|-|-|-|
|prefix|`()`||
|suffix|`()`||

### Input Group Slots
|属性|类型|说明|
|-|-|-|
|default|`()`||

### Input Group Label Slots
|属性|类型|说明|
|-|-|-|
|default|`()`||


## Events
### Input Events
|属性|类型|说明|
|-|-|-|
|input|`(value: string \| [string, string])`||
|change|`(value: string \| [string, string])`||
|blur|`()`||
|focus|`()`||
|clear|`()`||

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
### Input Slots
|属性|类型|说明|
|-|-|-|
|affix|`()`||
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
|input|`(value: string)`||
|change|`(value: string)`||
|blur|`()`||
|focus|`()`||

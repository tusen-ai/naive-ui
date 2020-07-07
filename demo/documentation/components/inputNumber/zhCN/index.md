# 数字输入 Input Number
输入数字就用它。
## 演示
```demo
basic
disabled
event
min-max
size
step
validator
```
## V-model
|Prop|Event|
|-|-|
|value|change|

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null`|`null`||
|value|`number`|`null`||
|step|`number`|`1`||
|min|`number`|`null`||
|max|`number`|`null`||
|size|`'small' \| 'medium' \| 'large'`|`medium`||
|disabled|`boolean`|`false`||
|validator|`(value) => boolean`|`null`||
|placeholder|`string`|`null`||

## Events
|名称|参数|说明|
|-|-|-|
|change|`(value: number)`||
|blur|`()`||
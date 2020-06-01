# 时间选择器 Time Picker
就像一块数码表。

## 演示
```demo
basic
size
disabledTime
format
```
## V-model
|prop|event|
|-|-|
|value|change|

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|clearable|`boolean`|`false`||
|format|`string`|`'HH:mm:ss'`||
|is-hour-disabled|`(hour: number) => boolean`|`() => false`||
|is-minute-disabled|`(minute: number, hour: number) => boolean`|`() => false`||
|is-second-disabled|`(second: number, minute: number, hour: number) => boolean`|`() => false`||
|placeholder|`string`|`'Select Time'`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|theme|`'light' \| 'dark' \| null`|`null`||
|value|`number`|`null`||

## Events
|名称|参数|说明|
|-|-|-|
|blur|`(value: number \| null)`||
|change|`(value: number \| null)`||
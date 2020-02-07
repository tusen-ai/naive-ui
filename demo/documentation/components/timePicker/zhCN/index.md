# 时间选择器 Time Picker
就像一块数码表。

## 演示
```demo
basic
disabledTime
```
## V-model
|prop|event|
|-|-|
|value|change|

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|placeholder|`string`|`'请选择时间'`||
|value|`number`|`null`||
|is-hour-disabled|`(hour: number) => boolean`|`() => false`||
|is-minute-disabled|`(minute: number, hour: number) => boolean`|`() => false`||
|is-second-disabled|`(second: number, minute: number, hour: number) => boolean`|`() => false`||

## Events
|名称|参数|说明|
|-|-|-|
|change|`(value: number \| null)`||
|blur|`(value: number \| null)`||
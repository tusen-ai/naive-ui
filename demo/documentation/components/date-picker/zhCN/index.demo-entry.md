# 日期选择器 Date Picker
关于如何设定时间，大家总有很多种想法。

## 演示
```demo
date
datetime
daterange
datetimerange
size
disabled
disabled-time
actions
events
format
```
## V-model
|Prop|Event|
|-|-|
|value|change|

## Props
### 通用的 Props
|名称|类型|默认值|说明|
|-|-|-|-|
|clearable|`boolean`|`false`||
|disabled|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|theme|`'light' \| 'dark' \| null`|`null`||
|type|`'date' \| 'datetime' \| 'daterange' \|'datetimerange'`|`'date`||
|value|`number`|`null`||

### Date 类型的 Props
|名称|类型|默认值|说明|
|-|-|-|-|
|actions|`Array<'clear' \| 'now' \| 'confirm'> \| null`|`['clear', 'now', 'confirm']`||
|format|`string`|`'yyyy-MM-dd'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|placeholder|`string`|`'Select Date'`||

### DateTime 类型的 Props
|名称|类型|默认值|说明|
|-|-|-|-|
|actions|`Array<'clear' \| 'now' \| 'confirm'> \| null`|`['clear', 'now', 'confirm']`||
|format|`string`|`'yyyy-MM-dd HH:mm:ss'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|is-time-disabled|`(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }`|`() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})`||
|placeholder|`string`|`'Select Date and Time'`||

### DateRange 类型的 Props
|名称|类型|默认值|说明|
|-|-|-|-|
|actions|`Array<'clear' \| 'confirm'> \| null`|`['clear', 'confirm']`||
|end-placeholder|`string`|`End Date'`||
|format|`string`|`'yyyy-MM-dd'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|is-time-disabled|`(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }`|`() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})`||
|separator|`string`|`'至'`||
|start-placeholder|`string`|`'Start Date'`||


### DateTimeRange 类型的 Props
|名称|类型|默认值|说明|
|-|-|-|-|
|actions|`Array<'clear' \| 'confirm'> \| null`|`['clear', 'confirm']`||
|end-placeholder|`string`|`'End Date and Time'`||
|format|`string`|`'yyyy-MM-dd HH:mm:ss'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|is-time-disabled|`(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }`|`() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})`||
|separator|`string`|`'to'`||
|start-placeholder|`string`|`'Start Date and Time'`||


## Events
### Date, DateTime 类型的 Events
|名称|参数|说明|
|-|-|-|
|blur|`()`||
|change|`(value: number \| null)`||

### DateRange, DateTimeRange 类型的 Events
|名称|参数|说明|
|-|-|-|
|blur|`()`||
|change|`(value: [number, number] \| null)`||

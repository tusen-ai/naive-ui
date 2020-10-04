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

## Props
### 通用的 Props
|名称|类型|默认值|说明|
|-|-|-|-|
|clearable|`boolean`|`false`||
|disabled|`boolean`|`false`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|type|`'date' \| 'datetime' \| 'daterange' \|'datetimerange'`|`'date`||
|value|`number`|`null`||
|on-blur|`() => any`|`undefined`||
|on-focus|`() => any`|`undefined`||

### Date 类型的 Props
|名称|类型|默认值|说明|
|-|-|-|-|
|actions|`Array<'clear' \| 'now' \| 'confirm'> \| null`|`['clear', 'now', 'confirm']`||
|format|`string`|`'yyyy-MM-dd'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|placeholder|`string`|`'Select Date'`||
|on-change|`(value: number \| null) => any`|`undefined`||

### DateTime 类型的 Props
|名称|类型|默认值|说明|
|-|-|-|-|
|actions|`Array<'clear' \| 'now' \| 'confirm'> \| null`|`['clear', 'now', 'confirm']`||
|format|`string`|`'yyyy-MM-dd HH:mm:ss'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|is-time-disabled|`(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }`|`() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})`||
|placeholder|`string`|`'Select Date and Time'`||
|on-change|`(value: number \| null) => any`|`undefined`||

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
|on-change|`(value: [number, number] \| null) => any`|`undefined`||

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
|on-change|`(value: [number, number] \| null) => any`|`undefined`||

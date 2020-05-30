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
disabledTime
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
|theme|`'light' \| 'dark' \| null`|`null`||
|value|`number`|`null`||
|actions|`Array<'clear' \| 'now' \| 'confirm'>`|`null`||
|clearable|`boolean`|`false`||
|disabled|`boolean`|`false`||
|type|`'date' \| 'datetime' \| 'daterange' \|'datetimerange'`|`'date`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||


### Date 类型的 Props
|名称|类型|默认值|说明|
|-|-|-|-|
|placeholder|`string`|`'Select Date'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|format|`string`|`'yyyy-MM-dd'`||

### DateTime 类型的 Props
|名称|类型|默认值|说明|
|-|-|-|-|
|placeholder|`string`|`'Select Date and Time'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|is-time-disabled|`(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }`|`() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})`||
|format|`string`|`'yyyy-MM-dd HH:mm:ss'`||

### DateRange 类型的 Props
|名称|类型|默认值|说明|
|-|-|-|-|
|seperator|`string`|`'至'`||
|start-placeholder|`string`|`'Start Date'`||
|end-placeholder|`string`|`End Date'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|is-time-disabled|`(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }`|`() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})`||
|format|`string`|`'yyyy-MM-dd'`||


### DateTimeRange 类型的 Props
|名称|类型|默认值|说明|
|-|-|-|-|
|seperator|`string`|`'to'`||
|start-placeholder|`string`|`'Start Date and Time'`||
|end-placeholder|`string`|`'End Date and Time'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|is-time-disabled|`(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }`|`() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})`||
|format|`string`|`'yyyy-MM-dd HH:mm:ss'`||

## Events
### Date, DateTime 类型的 Events
|名称|参数|说明|
|-|-|-|
|change|`(value: number \| null)`||
|blur|`()`||

### DateRange, DateTimeRange 类型的 Events
|名称|参数|说明|
|-|-|-|
|change|`(value: [number, number] \| null)`||
|blur|`()`||

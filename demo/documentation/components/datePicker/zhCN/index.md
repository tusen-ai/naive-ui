# 日期选择器 Date Picker
关于如何设定时间，大家总有很多种想法。

## 演示
```demo
date
datetime
daterange
datetimerange
disabled
disabledTime
actions
events
```
## V-model
|Prop|Event|
|-|-|
|value|change|

## Props
### 通用的 Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|value|`number`|`null`||
|actions|`Array<'clear' \| 'now' \| 'confirm'>`|`null`||
|disabled|`boolean`|`false`||
|type|`'date' \| 'datetime' \| 'daterange' \|'datetimerange'`|`'date`||


### Date 类型的 Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|placeholder|`string`|`'Select Date'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||

### DateTime 类型的 Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|placeholder|`string`|`'Select Date and Time'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|is-time-disabled|`(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }`|`() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})`||

### DateRange 类型的 Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|seperator|`string`|`'to'`||
|start-placeholder|`string`|`'Start Date'`||
|end-placeholder|`string`|`End Date'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|is-time-disabled|`(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }`|`() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})`||


### DateTimeRange 类型的 Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|seperator|`string`|`'to'`||
|start-placeholder|`string`|`'Start Date and Time'`||
|end-placeholder|`string`|`'End Date and Time'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|is-time-disabled|`(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }`|`() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})`||

## Events
### Date, DateTime 类型的 Events
|名称|参数|介绍|
|-|-|-|
|change|`(currentValue: number \| null)`||
|blur|`(currentValue: number \| null)`||

### DateRange, DateTimeRange 类型的 Events
|名称|参数|介绍|
|-|-|-|
|change|`(currentValue: [number, number] \| null)`||
|blur|`(currentValue: [number, number] \| null)`||

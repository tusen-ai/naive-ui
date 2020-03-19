# Date Picker
People has too many ideas about how to set a time.

## Demos
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
### All Types Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark'`|`null`||
|value|`number`|`null`||
|actions|`Array<'clear' \| 'now' \| 'confirm'>`|`null`||
|clearable|`boolean`|`false`||
|disabled|`boolean`|`false`||
|type|`'date' \| 'datetime' \| 'daterange' \|'datetimerange'`|`'date`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||

### Date Type Props
|Name|Type|Default|Description|
|-|-|-|-|
|placeholder|`string`|`'Select Date'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|format|`string`|`'yyyy-MM-dd'`||

### DateTime Type Props
|Name|Type|Default|Description|
|-|-|-|-|
|placeholder|`string`|`'Select Date and Time'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|is-time-disabled|`(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }`|`() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})`||
|format|`string`|`'yyyy-MM-dd HH:mm:ss'`||

### DateRange Type Props
|Name|Type|Default|Description|
|-|-|-|-|
|seperator|`string`|`'to'`||
|start-placeholder|`string`|`'Start Date'`||
|end-placeholder|`string`|`'End Date'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|is-time-disabled|`(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }`|`() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})`||
|format|`string`|`'yyyy-MM-dd'`||


### DateTimeRange Type Props
|Name|Type|Default|Description|
|-|-|-|-|
|seperator|`string`|`'to'`||
|start-placeholder|`string`|`'Start Date and Time'`||
|end-placeholder|`string`|`'End Date and Time'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|is-time-disabled|`(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }`|`() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})`||
|format|`string`|`'yyyy-MM-dd HH:mm:ss'`||

## Events
### Date, DateTime Type Events
|Name|Parameters|Description|
|-|-|-|
|change|`(value: number \| null)`||
|blur|`()`||

### DateRange, DateTimeRange Type Events
|Name|Parameters|Description|
|-|-|-|
|change|`(value: [number, number] \| null)`||
|blur|`()`||

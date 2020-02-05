# Date Picker
People has too many ideas about how to set a time.

## Demos
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
### All Types Props
|Name|Type|Default|Description|
|-|-|-|-|
|value|`number`|`null`||
|actions|`Array<'clear' \| 'now' \| 'confirm'>`|`null`||
|disabled|`boolean`|`false`||
|type|`'date' \| 'datetime' \| 'daterange' \|'datetimerange'`|`'date`||


### Date Type Props
|Name|Type|Default|Description|
|-|-|-|-|
|placeholder|`string`|`'Select Date'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||

### DateTime Type Props
|Name|Type|Default|Description|
|-|-|-|-|
|placeholder|`string`|`'Select Date and Time'`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|is-time-disabled|`(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }`|`() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})`||

### DateRange Type Props
|Name|Type|Default|Description|
|-|-|-|-|
|seperator|`string`|`'to'`||
|start-placeholder|`string`|`'Start Date and Time`||
|end-placeholder|`string`|`End Date and Time`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|is-time-disabled|`(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }`|`() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})`||


### DateTimeRange Type Props
|Name|Type|Default|Description|
|-|-|-|-|
|seperator|`string`|`'to'`||
|start-placeholder|`string`|`'Start Date and Time`||
|end-placeholder|`string`|`End Date and Time`||
|is-date-disabled|`(current: number) => boolean`|`() => false`||
|is-time-disabled|`(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }`|`() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})`||

## Events
### Date, DateTime Type Events
|Name|Parameters|Description|
|-|-|-|
|change|`(currentValue: number \| null)`||
|blur|`(currentValue: number \| null)`||

### DateRange, DateTimeRange Type Events
|Name|Parameters|Description|
|-|-|-|
|change|`(currentValue: [number, number] \| null)`||
|blur|`(currentValue: [number, number] \| null)`||

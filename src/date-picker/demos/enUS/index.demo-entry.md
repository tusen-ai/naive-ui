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
disabled-time
actions
events
format
ranges
footerslot
```

## Props

### General Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| clearable | `boolean` | `false` | Whether the date picker is clearable. |
| default-value | `number \| [number, number] \| null` | `null` | Date picker's default value. |
| disabled | `boolean` | `false` | Whether the date picker is disabled. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Date picker size. |
| type | `'date' \| 'datetime' \| 'daterange' \|'datetimerange'` | `'date'` | Date picker type. |
| value | `number \| [number, number] \| null` | `undefined` | Value of the date picker in controlled mode. |
| on-blur | `() => void` | `undefined` | Callback function triggered on blur. |
| on-focus | `() => void` | `undefined` | Callback function triggered on focus. |

### Date Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now', 'confirm']` | Operations supported in date picker of date type. |
| format | `string` | `'yyyy-MM-dd'` | Customize format type. |
| is-date-disabled | `(current: number) => boolean` | `() => false` | Validator of the date. |
| placeholder | `string` | `'Select Date'` | Prompt information. |
| on-update:value | `(value: number \| null) => void` | `undefined` | Callback when date is selected. |

### DateTime Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now', 'confirm']` | Operations supported in date picker of dateTime type. |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` | Customize format type. |
| is-date-disabled | `(current: number) => boolean` | `() => false` | Validator of the date. |
| is-time-disabled | `(current: number) => { isHourDisabled?: () => boolean, isMinuteDisabled?: () => boolean, isSecondDisabled?: () => boolean }` | `undefined` | Validator of the time. |
| placeholder | `string` | `'Select Date and Time'` | Prompt information. |
| on-update:value | `(value: number \| null) => void` | `undefined` | Callback when date is selected. |

### DateRange Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | Operations supported in date picker of dateRange type. |
| end-placeholder | `string` | `'End Date'` | The prompt information of the end select in dateRange. |
| format | `string` | `'yyyy-MM-dd'` | Customize format type. |
| is-date-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => boolean` | `undefined` | Validator of the date. |
| is-time-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => { isHourDisabled?: () => boolean, isMinuteDisabled?: () => boolean, isSecondDisabled?: () => boolean }` | `undefined` | Validator of the time. |
| ranges | `Record<string, [number, number]>` | `undefined` | Customize ranges. |
| separator | `string` | `'to'` | The separator between the start select and the end select. |
| start-placeholder | `string` | `'Start Date'` | The prompt information of the start select in dateRange. |
| on-update:value | `(value: [number, number] \| null) => void` | `undefined` | Callback when date is selected. |

### DateTimeRange Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | Operations supported in date picker of dateTimeRange type. |
| end-placeholder | `string` | `'End Date and Time'` | The prompt information of the end select in dateRange. |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` | Customize format type. |
| is-date-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => boolean` | `undefined` | Validator of the date. |
| is-time-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number]) => { isHourDisabled?: () => boolean, isMinuteDisabled?: () => boolean, isSecondDisabled?: () => boolean }` | `undefined` | Validator of the time. |
| ranges | `Record<string, [number, number]>` | `undefined` | Customize ranges. |
| separator | `string` | `'to'` | The separator between the start select and the end select. |
| start-placeholder | `string` | `'Start Date and Time'` | The prompt information of the start select in dateTimeRange. |
| on-update:value | `(value: [number, number] \| null) => void` | `undefined` | Callback when date is selected. |

## Slots

| 名称   | 参数 | 说明          |
| ------ | ---- | ------------- |
| footer | `()` | Extra Footer. |

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
```

## Props

### General Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| clearable | `boolean` | `false` |  |
| disabled | `boolean` | `false` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| theme | `'light' \| 'dark' \| string` | `undefined` |  |
| type | `'date' \| 'datetime' \| 'daterange' \|'datetimerange'` | `'date` |  |
| value | `number` | `null` |  |
| on-blur | `() => any` | `undefined` |  |
| on-focus | `() => any` | `undefined` |  |

### Date Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now', 'confirm']` |  |
| format | `string` | `'yyyy-MM-dd'` |  |
| is-date-disabled | `(current: number) => boolean` | `() => false` |  |
| placeholder | `string` | `'Select Date'` |  |
| on-update:value | `(value: number \| null) => any` | `undefined` |  |

### DateTime Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now', 'confirm']` |  |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` |  |
| is-date-disabled | `(current: number) => boolean` | `() => false` |  |
| is-time-disabled | `(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }` | `() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})` |  |
| placeholder | `string` | `'Select Date and Time'` |  |
| on-update:value | `(value: number \| null) => any` | `undefined` |  |

### DateRange Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` |  |
| end-placeholder | `string` | `'End Date'` |  |
| format | `string` | `'yyyy-MM-dd'` |  |
| is-date-disabled | `(current: number) => boolean` | `() => false` |  |
| is-time-disabled | `(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }` | `() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})` |  |
| separator | `string` | `'to'` |  |
| start-placeholder | `string` | `'Start Date'` |  |
| on-update:value | `(value: [number, number] \| null) => any` | `undefined` |  |

### DateTimeRange Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` |  |
| end-placeholder | `string` | `'End Date and Time'` |  |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` |  |
| is-date-disabled | `(current: number) => boolean` | `() => false` |  |
| is-time-disabled | `(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }` | `() => ({ isHourDisabled: () => false, isMinuteDisabled: () => false, isSecondDisabled: () => false }})` |  |
| separator | `string` | `'to'` |  |
| start-placeholder | `string` | `'Start Date and Time'` |  |
| on-update:value | `(value: [number, number] \| null) => any` | `undefined` |  |

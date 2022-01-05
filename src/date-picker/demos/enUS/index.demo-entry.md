# Date Picker

People have too many ideas on how to set the time.

## Demos

```demo
date
datetime
daterange
datetimerange
month
year
quarter
size
default-time
disabled
disabled-time
actions
shortcuts
events
format
footerslot
update-on-close
```

## API

### General Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| clearable | `boolean` | `false` | Whether the date picker is clearable. |  |
| default-value | `number \| [number, number] \| null` | `null` | Date picker's default value. |  |
| disabled | `boolean` | `false` | Whether the date picker is disabled. |  |
| first-day-of-week | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `undefined` | The first day of a week on calendar, 0 means Monday. |  |
| input-readonly | `boolean` | `false` | Set the `readonly` attribute of the input (avoids virtual keyboard on touch devices). |  |
| shortcuts | `Record<string, number \| (() => number)> \| Record<string, [number, number] \| (() => [number, number])>` | `undefined` | Shortcut button customizations. |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Date picker size. |  |
| type | `'date' \| 'datetime' \| 'daterange' \| 'datetimerange' \| 'month' \| 'year' \| 'quarter'` | `'date'` | Date picker type. | `'quarter'` v2.22.0 |
| value | `number \| [number, number] \| null` | `undefined` | Value of the date picker when being manually set. |  |
| on-blur | `() => void` | `undefined` | On blur callback. |  |
| on-focus | `() => void` | `undefined` | On focus callback. |  |

### Date Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now'> \| null` | `['clear', 'now']` | Operations supported for the `date` type date picker. |
| format | `string` | `'yyyy-MM-dd'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |
| is-date-disabled | `(current: number) => boolean` | `() => false` | Validator of the date. |
| placeholder | `string` | `'Select Date'` | Placeholder. |
| on-update:value | `(value: number \| null) => void` | `undefined` | Date selected callback. |

### DateTime Type Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now', 'confirm']` | Operations supported for the `datetime` type date picker. |  |
| default-time | `string` | `undefined` | Default time of the selected date. It's format is `HH:mm:ss`. | 2.22.0 |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |  |
| is-date-disabled | `(current: number) => boolean` | `() => false` | Validator of the date. |  |
| is-time-disabled | `(current: number) => { isHourDisabled?: () => boolean, isMinuteDisabled?: () => boolean, isSecondDisabled?: () => boolean }` | `undefined` | Validator of the time. |  |
| placeholder | `string` | `'Select Date and Time'` | Placeholder. |  |
| update-value-on-close | `boolean` | `false` | Whether to update value on close. |  |
| on-update:value | `(value: number \| null) => void` | `undefined` | Date selected callback. |  |

### DateRange Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | Operations supported for the `daterange` type date picker. |
| end-placeholder | `string` | `'End Date'` | Placeholder at the end of the input. |
| format | `string` | `'yyyy-MM-dd'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |
| is-date-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => boolean` | `undefined` | Validator of the date. |
| is-time-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => { isHourDisabled?: () => boolean, isMinuteDisabled?: () => boolean, isSecondDisabled?: () => boolean }` | `undefined` | Validator of the time. |
| close-on-select | `boolean` | `false` | Whether to close the panel after the user has selected a time range. |
| separator | `string` | `'to'` | The separator between the start input and the end input. |
| start-placeholder | `string` | `'Start Date'` | The prompt information at the beginning of the input. |
| update-value-on-close | `boolean` | `false` | Whether to update the value on close. |
| on-update:value | `(value: [number, number] \| null) => void` | `undefined` | Range changed callback. |

### DateTimeRange Type Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | Operations supported for the `datetimerange` type. |  |
| default-time | `string \| Array<string \| undefined>` | `undefined` | Default time of the selected date. It's format is `HH:mm:ss`. | 2.22.0 |
| end-placeholder | `string` | `'End Date and Time'` | Placeholder at the end of the input. |  |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |  |
| is-date-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => boolean` | `undefined` | Validator of the date. |  |
| is-time-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number]) => { isHourDisabled?: () => boolean, isMinuteDisabled?: () => boolean, isSecondDisabled?: () => boolean }` | `undefined` | Validator of the time. |  |
| separator | `string` | `'to'` | The separator between the start input and the end input. |  |
| start-placeholder | `string` | `'Start Date and Time'` | The prompt information at the beginning of the input. |  |
| update-value-on-close | `boolean` | `false` | Whether to update value on close. |  |
| on-update:value | `(value: [number, number] \| null) => void` | `undefined` | Value changed callback. |  |

### Month Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now']` | Operations supported for the `month` type date picker. |
| format | `string` | `'yyyy-MM'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |
| is-date-disabled | `(current: number) => boolean` | `() => false` | Validator of the month. |
| placeholder | `string` | `'Select Month'` | Placeholder. |
| on-update:value | `(value: number \| null) => void` | `undefined` | Value changed callback. |

### Year Type Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now'> \| null` | `['clear', 'now']` | Operations supported for the `year` type date picker. |
| format | `string` | `'yyyy'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |
| is-date-disabled | `(current: number) => boolean` | `() => false` | Validator of the year. |
| placeholder | `string` | `'Select Year'` | Placeholder. |
| on-update:value | `(value: number \| null) => void` | `undefined` | Value changed callback. |

### DatePicker Slots

| Name   | Parameters | Description   |
| ------ | ---------- | ------------- |
| footer | `()`       | Extra Footer. |

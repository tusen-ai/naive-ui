# Date Picker

People have too many ideas on how to set the time.

## Demos

```demo
date.vue
datetime.vue
datetimeformat.vue
daterange.vue
datetimerange.vue
month.vue
monthrange.vue
year.vue
yearrange.vue
quarter.vue
quarterrange.vue
week.vue
size.vue
default-time.vue
disabled.vue
disabled-time.vue
actions.vue
shortcuts.vue
events.vue
format.vue
footerslot.vue
update-on-close.vue
focus.vue
status.vue
icon.vue
panel.vue
```

## API

### General Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| clearable | `boolean` | `false` | Whether the date picker is clearable. |  |
| default-value | `number \| [number, number] \| null` | `undefined` | Date picker's default value. |  |
| default-formatted-value | `string \| [string, string] \| null` | `undefined` | Date picker's default formatted value. | 2.24.0 |
| disabled | `boolean` | `false` | Whether the date picker is disabled. |  |
| first-day-of-week | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `undefined` | The first day of a week on calendar, 0 means Monday. |  |
| input-readonly | `boolean` | `false` | Set the `readonly` attribute of the input (avoids virtual keyboard on touch devices). |  |
| panel | `boolean` | `false` | Whether to use date-picker as panel. | 2.29.1 |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'bottom-start'` | Panel's placement. | 2.25.0 |
| shortcuts | `Record<string, number \| (() => number)> \| Record<string, [number, number] \| (() => [number, number])>` | `undefined` | Shortcut button customizations. |  |
| show | `boolean` | `undefined` | Whether to show panel. | 2.28.3 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Date picker size. |  |
| status | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status. | 2.27.0 |
| to | `string \| HTMLElement \| false` | `body` | Container node of the panel. `false` will keep it not detached. |  |
| type | `'date' \| 'datetime' \| 'daterange' \| 'datetimerange' \| 'month' \| 'monthrange' \| 'year' \| 'quarter'` | `'date'` | Date picker type. | `'quarter'` v2.22.0, `'monthrange'` 2.28.3 |
| value | `number \| [number, number] \| null` | `undefined` | Value of the date picker when being manually set. |  |
| value-format | `string` | Follow `format` prop | Format of the binding value. see [format](https://date-fns.org/v2.23.0/docs/format). | 2.24.0 |
| on-clear | `() => void` | `undefined` | On clear callback. | 2.28.3 |
| on-confirm | `(value: number \| [number, number] \| null, formattedValue: string \| [string, string] \| null) => void` | `undefined` | On confirm callback. | 2.28.3 |
| on-blur | `() => void` | `undefined` | On blur callback. |  |
| on-focus | `() => void` | `undefined` | On focus callback. |  |
| on-update:show | `(show: boolean) => void` | `undefined` | Callback when panel shows & hides. | 2.28.3 |
| on-prev-month | `() => void` | `undefined` | Callback when click prev month button. | NEXT_VERSION |
| on-next-month | `() => void` | `undefined` | Callback when click next month button. | NEXT_VERSION |
| on-prev-year | `() => void` | `undefined` | Callback when click prev year button. | NEXT_VERSION |
| on-next-year | `() => void` | `undefined` | Callback when click next year button. | NEXT_VERSION |

### Date Type Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now'> \| null` | `['clear', 'now']` | Operations supported for the `date` type date picker. |  |
| format | `string` | `'yyyy-MM-dd'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |  |
| is-date-disabled | `(current: number) => boolean` | `() => false` | Validator of the date. |  |
| placeholder | `string` | `'Select Date'` | Placeholder. |  |
| on-update:formatted-value | `(value: string \| null, timestampValue: number \| null) => void` | `undefined` | Date selected callback. | 2.24.0 |
| on-update:value | `(value: number \| null, formattedValue: string \| null) => void` | `undefined` | Date selected callback. | `formattedValue` 2.24.0 |

### DateTime Type Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now', 'confirm']` | Operations supported for the `datetime` type date picker. |  |
| default-time | `string` | `undefined` | Default time of the selected date. It's format is `HH:mm:ss`. | 2.22.0 |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |  |
| is-date-disabled | `(current: number) => boolean` | `() => false` | Validator of the date. |  |
| is-time-disabled | `(current: number) => { isHourDisabled?: () => boolean, isMinuteDisabled?: () => boolean, isSecondDisabled?: () => boolean }` | `undefined` | Validator of the time. |  |
| placeholder | `string` | `'Select Date and Time'` | Placeholder. |  |
| time-picker-props | `TimePickerProps` | `undefined` | Time picker props in the panel. | 2.27.0 |
| update-value-on-close | `boolean` | `false` | Whether to update value on close. |  |
| on-update:formatted-value | `(value: string \| null, timestampValue: number \| null) => void` | `undefined` | Date selected callback. | MEXT_VERSION |
| on-update:value | `(value: number \| null, formattedValue: string \| null) => void` | `undefined` | Date selected callback. | `formattedValue` 2.24.0 |

### DateRange Type Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | Operations supported for the `daterange` type date picker. |  |
| bind-calendar-months | `boolean` | `false` | Whether months in panel calendar are consecutive. | 2.28.3 |
| default-calendar-start-time | `number` | `undefined` | Default panel calendar start month timestamp. | 2.28.3 |
| default-calendar-end-time | `number` | `undefined` | Default panel calendar end month timestamp. | 2.28.3 |
| end-placeholder | `string` | `'End Date'` | Placeholder at end part of the input. |  |
| format | `string` | `'yyyy-MM-dd'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |  |
| is-date-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => boolean` | `undefined` | Validator of the date. |  |
| is-time-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number]) => { isHourDisabled?: (hour: number) => boolean, isMinuteDisabled?: (minute: number, hour: number \| null) => boolean, isSecondDisabled?: (second: number, minute: number \| null, hour: number \| null) => boolean }` | `undefined` | Validator of the time. `null` in validators means value of picker is empty. |  |
| close-on-select | `boolean` | `false` | Whether to close the panel after the user has selected a time range. |  |
| separator | `string` | internal icon | The separator between the start input and the end input. |  |
| start-placeholder | `string` | `'Start Date'` | The prompt information at the beginning of the input. |  |
| update-value-on-close | `boolean` | `false` | Whether to update the value on close. |  |
| on-update:formatted-value | `(value: [string, string] \| null, timestampValue: [number, number] \| null) => void` | `undefined` | Formatted range changed callback. | 2.24.0 |
| on-update:value | `(value: [number, number] \| null, formattedValue: [string, string] \| null) => void` | `undefined` | Range changed callback. | `formattedValue` 2.24.0 |

### DateTimeRange Type Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | Operations supported for the `datetimerange` type. |  |
| bind-calendar-months | `boolean` | `false` | Whether months in panel calendar are consecutive. | 2.28.3 |
| default-calendar-start-time | `number` | `undefined` | Default panel calendar start month timestamp. | 2.28.3 |
| default-calendar-end-time | `number` | `undefined` | Default panel calendar end month timestamp. | 2.28.3 |
| default-time | `string \| Array<string \| undefined>` | `undefined` | Default time of the selected date. It's format is `HH:mm:ss`. | 2.22.0 |
| end-placeholder | `string` | `'End Date and Time'` | Placeholder at end part of the input. |  |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |  |
| is-date-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => boolean` | `undefined` | Validator of the date. |  |
| is-time-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number]) => { isHourDisabled?: (hour: number) => boolean, isMinuteDisabled?: (minute: number, hour: number \| null) => boolean, isSecondDisabled?: (second: number, minute: number \| null, hour: number \| null) => boolean }` | `undefined` | Validator of the time. `null` in validators means value of picker is empty. |  |
| separator | `string` | internal icon | The separator between the start input and the end input. |  |
| start-placeholder | `string` | `'Start Date and Time'` | The prompt information at the beginning of the input. |  |
| time-picker-props | `TimePickerProps \| [TimePickerProps, TimePickerProps]` | `undefined` | Time picker props in the panel. | 2.27.0 |
| update-value-on-close | `boolean` | `false` | Whether to update value on close. |  |
| on-update:formatted-value | `(value: [string, string] \| null, timestampValue: [number, number] \| null) => void` | `undefined` | Formatted value changed callback. | 2.24.0 |
| on-update:value | `(value: [number, number] \| null, formattedValue: [string, string] \| null) => void` | `undefined` | Value changed callback. | `formattedValue` 2.24.0 |

### Month Type Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now']` | Operations supported for the `month` type date picker. |  |
| format | `string` | `'yyyy-MM'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |  |
| is-date-disabled | `(current: number) => boolean` | `() => false` | Validator of the month. |  |
| placeholder | `string` | `'Select Month'` | Placeholder. |  |
| on-update:formatted-value | `(value: string \| null, timestampValue: number \| null) => void` | `undefined` | Formatted value changed callback. | 2.24.0 |
| on-update:value | `(value: number \| null, formattedValue: string \| null) => void` | `undefined` | Value changed callback. | `formattedValue` 2.24.0 |

### MonthRange, QuarterRange, YearRange Type Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | Operations supported for the `monthrange` type date picker. | 2.28.3 |
| end-placeholder | `string` | `'End Month'` | Placeholder at end part of the input. | 2.28.3 |
| format | `string` | `'yyyy-MM-dd'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). | 2.28.3 |
| close-on-select | `boolean` | `false` | Whether to close the panel after the user has selected a time range. | 2.28.3 |
| separator | `string` | internal icon | The separator between the start input and the end input. | 2.28.3 |
| start-placeholder | `string` | `'Start Month'` | The prompt information at the beginning of the input. | 2.28.3 |
| update-value-on-close | `boolean` | `false` | Whether to update the value on close. | 2.28.3 |
| on-update:formatted-value | `(value: [string, string] \| null, timestampValue: [number, number] \| null) => void` | `undefined` | Formatted range changed callback. | 2.28.3 |
| on-update:value | `(value: [number, number] \| null, formattedValue: [string, string] \| null) => void` | `undefined` | Range changed callback. | 2.28.3 |

### Year Type Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now'> \| null` | `['clear', 'now']` | Operations supported for the `year` type date picker. |  |
| format | `string` | `'yyyy'` | Format of the input. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |  |
| is-date-disabled | `(current: number) => boolean` | `() => false` | Validator of the year. |  |
| placeholder | `string` | `'Select Year'` | Placeholder. |  |
| on-update:formatted-value | `(value: string \| null, timestampValue: number \| null) => void` | `undefined` | Formatted value changed callback. | 2.24.0 |
| on-update:value | `(value: number \| null, formattedValue: string \| null) => void` | `undefined` | Value changed callback. | `formattedValue` 2.24.0 |

### DatePicker Slots

| Name       | Parameters | Description                       | Version |
| ---------- | ---------- | --------------------------------- | ------- |
| date-icon  | `()`       | Date icon of the input box.       | 2.29.0  |
| footer     | `()`       | Extra Footer.                     |         |
| next-month | `()`       | Next icon of the date panel.      | 2.33.4  |
| next-year  | `()`       | Fast next icon of the date panel. | 2.33.4  |
| prev-month | `()`       | Prev icon of the date panel.      | 2.33.4  |
| prev-year  | `()`       | Fast prev icon of the date panel. | 2.33.4  |
| separator  | `()`       | Separator of range picker.        | 2.29.0  |

### DatePicker Methods

| Name  | Type         | Description | Version |
| ----- | ------------ | ----------- | ------- |
| focus | `() => void` | Focus.      | 2.24.2  |
| blur  | `() => void` | Blur.       | 2.24.2  |

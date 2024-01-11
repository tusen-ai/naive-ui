# Time Picker

Like a digital clock.

## Demos

```demo
basic.vue
confirm.vue
size.vue
disabled-time.vue
step-time.vue
format.vue
actions.vue
hours12.vue
formatted.vue
focus.vue
status.vue
timezone.vue
```

## API

### TimePicker Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['now', 'confirm']` | Operations supported by the Time Picker. | `'clear'` 2.37.0 |
| clearable | `boolean` | `false` | Whether the value is clearable. |  |
| default-value | `number \| null` | `null` | Default value. |  |
| default-formatted-value | `number \| null` | `undefined` | Default formatted value. | 2.24.0 |
| disabled | `boolean` | `false` | Disabled state. |  |
| format | `string` | `'HH:mm:ss'` | Time format. For possible formats see [date-fns.org](https://date-fns.org/v2.23.0/docs/format). |  |
| formatted-value | `string \| null` | `undefined` | Formatted value. | 2.24.0 |
| hours | `number \| number[]` | `undefined` | The array of hours that can be selected. If a number, it'll be converted into an array of numbers using that increment. |  |
| minutes | `number \| number[]` | `undefined` | The array of minutes that can be selected. If a number, it'll be converted into an array of numbers using that increment. |  |
| seconds | `number \| number[]` | `undefined` | The array of seconds that can be selected. If a number, it'll be converted into an array of numbers using that increment. |  |
| input-readonly | `boolean` | `false` | Readonly state (does not apply to touch devices). |  |
| is-hour-disabled | `(hour: number) => boolean` | `() => false` | Callback function for disabling hours. |  |
| is-minute-disabled | `(minute: number, hour: number \| null) => boolean` | `() => false` | Callback function for disabling minutes. When value is empty, `hour` is `null`. |  |
| is-second-disabled | `(second: number, minute: number \| null, hour: number \| null) => boolean` | `() => false` | Callback function for disabling seconds. When value is empty, `hour` and `minute` are `null`. |  |
| placeholder | `string` | `'Select Time'` | Placeholder. |  |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'bottom-start'` | Time picker panel's placement. | 2.25.0 |
| show | `boolean` | `undefined` | Whether to show panel | 2.28.3 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. |  |
| status | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status. | 2.27.0 |
| time-zone | `string` | `undefined` | Time zone to be used to format the value. It follows [iana time zones](https://www.iana.org/time-zones). You can use `Intl.supportedValuesOf('timeZone')` to check supported values. | 2.30.0 |
| to | `string \| HTMLElement \| false` | `body` | Container node of the menu. `false` will keep it not detached. |  |
| use-12-hours | `boolean` | `false` | Whether to use a 12-hour clock panel. |  |
| value | `number \| null` | `undefined` | Value when being set manually. |  |
| value-format | `string` | follows `format` | Format of formatted value. | 2.24.0 |
| on-blur | `() => void` | `undefined` | Callback when the selection box loses focus. |  |
| on-clear | `() => void` | `undefined` | Callback when value is cleared. | 2.28.3 |
| on-confirm | `(value: number \| null, formattedValue: string \| null) => void` | `undefined` | Callback when the click confirm button. | 2.28.3 |
| on-focus | `() => void` | `undefined` | Callback when the selection box gets focus. |  |
| on-update:formatted-value | `(value: number \| null, timestampValue: number \| null) => void` | `undefined` | Callback when formatted value changes. | 2.24.0 |
| on-update:show | `(show: boolean) => void` | `undefined` | Callback when panel shows & hides. | 2.28.3 |
| on-update:value | `(value: number \| null, formattedValue: string \| null) => void` | `undefined` | Callback when the value changes. | `formattedValue` 2.24.0 |

### TimePicker Slots

| Name | Parameters | Description |
| ---- | ---------- | ----------- |
| icon | `()`       | Custom icon |

### TimePicker Methods

| Name  | Type         | Description | Version |
| ----- | ------------ | ----------- | ------- |
| focus | `() => void` | Focus.      | 2.24.2  |
| blur  | `() => void` | Blur.       | 2.24.2  |

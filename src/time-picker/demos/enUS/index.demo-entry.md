# Time Picker

Like a digital clock.

## Demos

```demo
basic
size
disabled-time
step-time
format
actions
```

## API

### TimePicker Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| actions | `Array<'now' \| 'confirm'> \| null` | `['now', 'confirm']` | Operations supported in Time Picker. |
| clearable | `boolean` | `false` | Whether the value is clearable. |
| default-value | `number \| null` | `null` | Default value in uncontrolled mode. |
| disabled | `boolean` | `false` | Whether to disable. |
| format | `string` | `'HH:mm:ss'` | Time format. For detail please see [format](https://date-fns.org/v2.23.0/docs/format). |
| hours | `number \| number[]` | `undefined` | The hours to be displayed. If it's a number, it'll be viewed as step. |
| minutes | `number \| number[]` | `undefined` | The minutes to be displayed. If it's a number, it'll be viewed as step. |
| seconds | `number \| number[]` | `undefined` | The seconds to be displayed. If it's a number, it'll be viewed as step. |
| input-readonly | `boolean` | `false` | Set the `readonly` attribute of the input (avoids virtual keyboard on touch devices). |
| is-hour-disabled | `(hour: number) => boolean` | `() => false` | Callback function for disabling hours. |
| is-minute-disabled | `(minute: number, hour: number) => boolean` | `() => false` | Callback function for disabling minutes. |
| is-second-disabled | `(second: number, minute: number, hour: number) => boolean` | `() => false` | Callback function for disabling seconds. |
| placeholder | `string` | `'Select Time'` | Placeholder. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. |
| value | `number \| null` | `undefined` | Value in controlled mode. |
| on-blur | `() => void` | `undefined` | Callback when the selection box loses focus. |
| on-focus | `() => void` | `undefined` | Callback when the selection box gets focus. |
| on-update:value | `(value: number \| null) => void` | `undefined` | Callback when the value changes. |

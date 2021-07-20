# Time Picker

Like a digital clock.

## Demos

```demo
basic
size
disabled-time
step-time
format
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| clearable | `boolean` | `false` | Whether to allow to be emptied. |
| default-value | `number \| null` | `null` | Default value. |
| disabled | `boolean` | `false` | Disabled status. |
| format | `string` | `'HH:mm:ss'` | Time format. |
| hours | `number \| number[]` | `undefined` | The hours to be displayed. If it's a number, it'll be viewed as step. |
| minutes | `number \| number[]` | `undefined` | The minutes to be displayed. If it's a number, it'll be viewed as step. |
| seconds | `number \| number[]` | `undefined` | The seconds to be displayed. If it's a number, it'll be viewed as step. |
| is-hour-disabled | `(hour: number) => boolean` | `() => false` | Hour column callback function. |
| is-minute-disabled | `(minute: number, hour: number) => boolean` | `() => false` | Minute column callback function. |
| is-second-disabled | `(second: number, minute: number, hour: number) => boolean` | `() => false` | Second column callback function. |
| placeholder | `string` | `'Select Time'` | Placeholder. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. |
| value | `number \| null` | `undefined` | Selected value. |
| on-blur | `() => void` | `undefined` | Callback when the selection box loses focus. |
| on-focus | `() => void` | `undefined` | Callback when the selection box gets focus. |
| on-update:value | `(value: number \| null) => void` | `undefined` | Callback when the value changes. |

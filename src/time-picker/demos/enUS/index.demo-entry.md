# Time Picker

Like a digital clock.

## Demos

```demo
basic
size
disabled-time
format
step-time
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| clearable | `boolean` | `false` |  |
| default-value | `number \| null` | `null` |  |
| disabled | `boolean` | `false` |  |
| format | `string` | `'HH:mm:ss'` |  |
|hours|`number[] \| number \| null`|`null`|if value is number array `[8, 9, 10]`, shows 8 to 10 o'clock. Else value is single number for step `2`, every 2 o'clock.|
|minutes|`number[] \| number \| null`|`null`|if value is number array `[0, 15, 30, 45]`, show 0, 15, 30, 45 minutes. Else value is single number for step `5`, every 5 minutes.|
|seconds|`number[] \| number \| null`|`null`|if value is number array `[0, 30]`, shows 0, 30 seconds. Else value is single number for step `10`, every 10 seconds.|
| is-hour-disabled | `(hour: number) => boolean` | `() => false` |  |
| is-minute-disabled | `(minute: number, hour: number) => boolean` | `() => false` |  |
| is-second-disabled | `(second: number, minute: number, hour: number) => boolean` | `() => false` |  |
| placeholder | `string` | `'Select Time'` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| value | `number \| null` | `undefined` |  |
| on-blur | `() => void` | `undefined` |  |
| on-focus | `() => void` | `undefined` |  |
| on-update:value | `(value: number \| null) => void` | `undefined` |  |

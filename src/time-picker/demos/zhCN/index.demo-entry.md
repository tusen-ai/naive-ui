# 时间选择器 Time Picker

就像一块数码表。

## 演示

```demo
basic
size
disabled-time
format
step-time
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| clearable | `boolean` | `false` |  |
| default-value | `number \| null` | `null` |  |
| disabled | `boolean` | `false` |  |
| format | `string` | `'HH:mm:ss'` |  |
|hours|`number[] \| number \| null`|`null`|值为数组时是要显示的小时数值，如:`[8, 9, 10]`显示8点到10点。值为单个数字为时间间隔步长，如:`2`每隔两小时显示0点，2点，4点等|
|minutes|`number[] \| number \| null`|`null`|值为数组时是要显示的小时数值，如:`[0, 15, 30, 45]`显示0分，15分，30分，45分。值为单个数字为时间间隔步长，如:`5`每隔5分钟显示0分，5分，10分等|
|seconds|`number[] \| number \| null`|`null`|值为数组时是要显示的秒数值，如:`[0, 30]`显示0秒和30秒。值为单个数字为时间间隔步长，如:`10`每隔10秒显示0秒，10秒，20秒等|
| is-hour-disabled | `(hour: number) => boolean` | `() => false` |  |
| is-minute-disabled | `(minute: number, hour: number) => boolean` | `() => false` |  |
| is-second-disabled | `(second: number, minute: number, hour: number) => boolean` | `() => false` |  |
| placeholder | `string` | `'Select Time'` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| value | `number \| null` | `undefined` |  |
| on-blur | `() => void` | `undefined` |  |
| on-focus | `() => void` | `undefined` |  |
| on-update:value | `(value: number \| null) => void` | `undefined` |  |

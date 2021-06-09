# 时间选择器 Time Picker

就像一块数码表。

## 演示

```demo
basic
size
disabled-time
step-time
format
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| clearable | `boolean` | `false` |  |
| default-value | `number \| null` | `null` |  |
| disabled | `boolean` | `false` |  |
| format | `string` | `'HH:mm:ss'` |  |
| hours | `number \| number[]` | `undefined` | 通过数组指定显示的小时。当值为 number 时，将被当做时间步进处理。 |
| minutes | `number \| number[]` | `undefined` | 通过数组指定显示的分钟。当值为 number 时，将被当做时间步进处理。 |
| seconds | `number \| number[]` | `undefined` | 通过数组指定显示的秒。当值为 number 时，将被当做时间步进处理。 |
| is-hour-disabled | `(hour: number) => boolean` | `() => false` |  |
| is-minute-disabled | `(minute: number, hour: number) => boolean` | `() => false` |  |
| is-second-disabled | `(second: number, minute: number, hour: number) => boolean` | `() => false` |  |
| placeholder | `string` | `'Select Time'` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| value | `number \| null` | `undefined` |  |
| on-blur | `() => void` | `undefined` |  |
| on-focus | `() => void` | `undefined` |  |
| on-update:value | `(value: number \| null) => void` | `undefined` |  |

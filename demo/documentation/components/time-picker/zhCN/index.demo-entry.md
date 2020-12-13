# 时间选择器 Time Picker

就像一块数码表。

## 演示

```demo
basic
size
disabled-time
format
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| clearable | `boolean` | `false` |  |
| default-value | `number \| null` | `null` |  |
| disabled | `boolean` | `false` |  |
| format | `string` | `'HH:mm:ss'` |  |
| is-hour-disabled | `(hour: number) => boolean` | `() => false` |  |
| is-minute-disabled | `(minute: number, hour: number) => boolean` | `() => false` |  |
| is-second-disabled | `(second: number, minute: number, hour: number) => boolean` | `() => false` |  |
| placeholder | `string` | `'Select Time'` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| theme | `'light' \| 'dark' \| string` | `undefined` |  |
| value | `number \| null` | `undefined` |  |
| on-blur | `() => any` | `undefined` |  |
| on-focus | `() => any` | `undefined` |  |
| on-update:value | `(value: number \| null) => any` | `undefined` |  |

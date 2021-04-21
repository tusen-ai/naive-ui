# 日期选择器 Date Picker

关于如何设定时间，大家总有很多种想法。

## 演示

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

### 通用的 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| clearable | `boolean` | `false` |  |
| default-value | `number \| [number, number] \| null` | `null` |  |
| disabled | `boolean` | `false` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| type | `'date' \| 'datetime' \| 'daterange' \|'datetimerange'` | `'date'` |  |
| value | `number \| [number, number] \| null` | `undefined` |  |
| on-blur | `() => void` | `undefined` |  |
| on-focus | `() => void` | `undefined` |  |

### Date 类型的 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now', 'confirm']` |  |
| format | `string` | `'yyyy-MM-dd'` |  |
| is-date-disabled | `(current: number) => boolean` | `undefined` |  |
| placeholder | `string` | `'选择日期'` |  |
| on-update:value | `(value: number \| null) => void` | `undefined` |  |

### DateTime 类型的 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now', 'confirm']` |  |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` |  |
| is-date-disabled | `(current: number) => boolean` | `undefined` |  |
| is-time-disabled | `(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }` | `undefined` |  |
| placeholder | `string` | `'选择日期时间'` |  |
| on-update:value | `(value: number \| null) => void` | `undefined` |  |

### DateRange 类型的 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` |  |
| end-placeholder | `string` | `'结束日期'` |  |
| format | `string` | `'yyyy-MM-dd'` |  |
| is-date-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => boolean` | `undefined` |  |
| is-time-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => { isHourDisabled?: () => boolean, isMinuteDisabled?: () => boolean, isSecondDisabled?: () => boolean }` | `undefined` |  |
| separator | `string` | `'至'` |  |
| start-placeholder | `string` | `'开始日期'` |  |
| on-update:value | `(value: [number, number] \| null) => void` | `undefined` |  |

### DateTimeRange 类型的 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` |  |
| end-placeholder | `string` | `'结束日期时间'` |  |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` |  |
| is-date-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => boolean` | `undefined` |  |
| is-time-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number]) => { isHourDisabled?: () => boolean, isMinuteDisabled?: () => boolean, isSecondDisabled?: () => boolean }` | `undefined` |  |
| separator | `string` | `'to'` |  |
| start-placeholder | `string` | `'开始日期时间'` |  |
| on-update:value | `(value: [number, number] \| null) => void` | `undefined` |  |

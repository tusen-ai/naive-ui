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
| disabled | `boolean` | `false` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| theme | `'light' \| 'dark' \| string` | `undefined` |  |
| type | `'date' \| 'datetime' \| 'daterange' \|'datetimerange'` | `'date` |  |
| value | `number` | `null` |  |
| on-blur | `() => any` | `undefined` |  |
| on-focus | `() => any` | `undefined` |  |

### Date 类型的 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now', 'confirm']` |  |
| format | `string` | `'yyyy-MM-dd'` |  |
| is-date-disabled | `(current: number) => boolean` | `undefined` |  |
| placeholder | `string` | `'选择日期'` |  |
| on-update:value | `(value: number \| null) => any` | `undefined` |  |

### DateTime 类型的 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now', 'confirm']` |  |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` |  |
| is-date-disabled | `(current: number) => boolean` | `undefined` |  |
| is-time-disabled | `(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }` | `undefined` |  |
| placeholder | `string` | `'选择日期时间'` |  |
| on-update:value | `(value: number \| null) => any` | `undefined` |  |

### DateRange 类型的 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` |  |
| end-placeholder | `string` | `'结束日期'` |  |
| format | `string` | `'yyyy-MM-dd'` |  |
| is-date-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number]) => boolean` | `undefined` |  |
| is-time-disabled | `(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }` | `undefined` |  |
| separator | `string` | `'至'` |  |
| start-placeholder | `string` | `'开始日期'` |  |
| on-update:value | `(value: [number, number] \| null) => any` | `undefined` |  |

### DateTimeRange 类型的 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` |  |
| end-placeholder | `string` | `'结束日期时间'` |  |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` |  |
| is-date-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number]) => boolean` | `undefined` |  |
| is-time-disabled | `(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }` | `undefined` |  |
| separator | `string` | `'to'` |  |
| start-placeholder | `string` | `'开始日期时间'` |  |
| on-update:value | `(value: [number, number] \| null) => any` | `undefined` |  |

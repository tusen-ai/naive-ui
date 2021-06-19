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
ranges
footerslot
```

## Props

### 通用的 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| clearable | `boolean` | `false` | 是否支持清除 |
| default-value | `number \| [number, number] \| null` | `null` | 默认被选中的日期的时间戳 |
| disabled | `boolean` | `false` | 是否禁用 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Date Picker 的尺寸 |
| type | `'date' \| 'datetime' \| 'daterange' \|'datetimerange'` | `'date'` | Date Picker 的类型 |
| value | `number \| [number, number] \| null` | `undefined` | Date Picker 的选中值 |
| on-blur | `() => void` | `undefined` | 用户 blur 时执行的回调 |
| on-focus | `() => void` | `undefined` | 用户 focus 时执行的回调 |

### Date 类型的 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now', 'confirm']` | Date 类型的 Date Picker 中支持的操作 |
| format | `string` | `'yyyy-MM-dd'` | 时间格式化字符串 |
| is-date-disabled | `(current: number) => boolean` | `undefined` | 日期禁用的校验函数 |
| placeholder | `string` | `'选择日期'` | 自动填充的提示信息 |
| on-update:value | `(value: number \| null) => void` | `undefined` | 可控数据更新时触发的回调函数 |

### DateTime 类型的 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now', 'confirm']` | DateTime 类型的 Date Picker 中支持的操作 |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` | 用户自定义的数据格式化方式 |
| is-date-disabled | `(current: number) => boolean` | `undefined` | 日期禁用的校验函数 |
| is-time-disabled | `(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }` | `undefined` | 时间禁用的校验函数 |
| placeholder | `string` | `'选择日期时间'` | 提示信息 |
| on-update:value | `(value: number \| null) => void` | `undefined` | 数据更新时触发的回调函数 |

### DateRange 类型的 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | DateRange 类型的 Date Picker 中支持的用户操作 |
| end-placeholder | `string` | `'结束日期'` | DateRange 中 end 选框的提示信息 |
| format | `string` | `'yyyy-MM-dd'` | 用户自定义的数据格式化方式 |
| is-date-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => boolean` | `undefined` | 日期禁用的校验函数 |
| is-time-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => { isHourDisabled?: () => boolean, isMinuteDisabled?: () => boolean, isSecondDisabled?: () => boolean }` | `undefined` | 时间禁用的校验函数 |
| ranges | `Record<string, [number, number]>` | `undefined` | 用户自定义的快捷选择范围 |
| separator | `string` | `'至'` | start 选框与 end 选框之间的分隔符 |
| start-placeholder | `string` | `'开始日期'` | DateRange 中 start 选框的提示信息 |
| on-update:value | `(value: [number, number] \| null) => void` | `undefined` | 数据更新时触发的回调函数 |

### DateTimeRange 类型的 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | DateTimeRange 类型的 Date Picker 中支持的用户操作 |
| end-placeholder | `string` | `'结束日期时间'` | DateTimeRange 中 end 选框的提示信息 |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` | 用户自定义的数据格式化方式 |
| is-date-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => boolean` | `undefined` | 日期禁用的校验函数 |
| is-time-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number]) => { isHourDisabled?: () => boolean, isMinuteDisabled?: () => boolean, isSecondDisabled?: () => boolean }` | `undefined` | 时间禁用的校验函数 |
| ranges | `Record<string, [number, number]>` | `undefined` | 用户自定义 DateTimeRange 范围 |
| separator | `string` | `'to'` | start 选框与 end 选框之间的分隔符 |
| start-placeholder | `string` | `'开始日期时间'` | DateTimeRange 中 start 选框的提示信息 |
| on-update:value | `(value: [number, number] \| null) => void` | `undefined` | 数据更新时触发的回调函数 |

## Slots

| 名称   | 参数 | 说明           |
| ------ | ---- | -------------- |
| footer | `()` | 添加额外的页脚 |

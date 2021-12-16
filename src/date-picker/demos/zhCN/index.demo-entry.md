# 日期选择器 Date Picker

关于如何设定时间，大家总有很多种想法。

## 演示

```demo
date
datetime
daterange
datetimerange
month
year
quarter
size
default-time
disabled
disabled-time
actions
shortcuts
events
format
footerslot
update-on-close
```

## API

### 通用的 Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| clearable | `boolean` | `false` | 是否支持清除 |  |
| default-value | `number \| [number, number] \| null` | `null` | 默认被选中的日期的时间戳 |  |
| disabled | `boolean` | `false` | 是否禁用 |  |
| first-day-of-week | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `undefined` | 日历上一周的开始，0 代表周一 |  |
| input-readonly | `boolean` | `false` | 设置输入框为只读（避免在移动设备上打开虚拟键盘） |  |
| shortcuts | `Record<string, number \| (() => number)> \| Record<string, [number, number] \| (() => [number, number])>` | `undefined` | 自定义快捷按钮 |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |  |
| type | `'date' \| 'datetime' \| 'daterange' \| 'datetimerange' \| 'month' \| 'year' \| 'quarter'` | `'date'` | Date Picker 的类型 | `'quarter'` v2.22.0 |
| value | `number \| [number, number] \| null` | `undefined` | Date Picker 的值 |  |
| on-blur | `() => void` | `undefined` | 用户 blur 时执行的回调 |  |
| on-focus | `() => void` | `undefined` | 用户 focus 时执行的回调 |  |

### Date 类型的 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now'> \| null` | `['clear', 'now']` | Date 类型的 Date Picker 中支持的操作 |
| format | `string` | `'yyyy-MM-dd'` | 时间格式化字符串，详情见 [format](https://date-fns.org/v2.23.0/docs/format) |
| is-date-disabled | `(current: number) => boolean` | `undefined` | 日期禁用的校验函数 |
| placeholder | `string` | `'选择日期'` | 自动填充的提示信息 |
| on-update:value | `(value: number \| null) => void` | `undefined` | 可控数据更新时触发的回调函数 |

### DateTime 类型的 Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now', 'confirm']` | DateTime 类型的 Date Picker 中支持的操作 |  |
| default-time | `string` | `undefined` | 默认时间，格式为 `HH:mm:ss` | 2.22.0 |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` | 时间格式化字符串，详情见 [format](https://date-fns.org/v2.23.0/docs/format) |  |
| is-date-disabled | `(current: number) => boolean` | `undefined` | 日期禁用的校验函数 |  |
| is-time-disabled | `(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }` | `undefined` | 时间禁用的校验函数 |  |
| placeholder | `string` | `'选择日期时间'` | 提示信息 |  |
| update-value-on-close | `boolean` | `false` | 关闭面板时更新值 |  |
| on-update:value | `(value: number \| null) => void` | `undefined` | 数据更新时触发的回调函数 |  |

### DateRange 类型的 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | DateRange 类型的 Date Picker 中支持的用户操作 |
| end-placeholder | `string` | `'结束日期'` | DateRange 中 end 选框的提示信息 |
| format | `string` | `'yyyy-MM-dd'` | 时间格式化字符串，详情见 [format](https://date-fns.org/v2.23.0/docs/format) |
| is-date-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => boolean` | `undefined` | 日期禁用的校验函数 |
| is-time-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => { isHourDisabled?: () => boolean, isMinuteDisabled?: () => boolean, isSecondDisabled?: () => boolean }` | `undefined` | 时间禁用的校验函数 |
| close-on-select | `boolean` | `false` | 用户选择时间范围后是否自动关闭面板 |
| separator | `string` | `'至'` | start 选框与 end 选框之间的分隔符 |
| start-placeholder | `string` | `'开始日期'` | DateRange 中 start 选框的提示信息 |
| update-value-on-close | `boolean` | `false` | 关闭面板时是否更新值 |
| on-update:value | `(value: [number, number] \| null) => void` | `undefined` | 数据更新时触发的回调函数 |

### DateTimeRange 类型的 Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | DateTimeRange 类型的 Date Picker 中支持的用户操作 |  |
| default-time | `string \| Array<string \| undefined>` | `undefined` | 默认时间，格式为 `HH:mm:ss` | 2.22.0 |
| end-placeholder | `string` | `'结束日期时间'` | DateTimeRange 中 end 选框的提示信息 |  |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` | 时间格式化字符串，详情见 [format](https://date-fns.org/v2.23.0/docs/format) |  |
| is-date-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => boolean` | `undefined` | 日期禁用的校验函数 |  |
| is-time-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number]) => { isHourDisabled?: () => boolean, isMinuteDisabled?: () => boolean, isSecondDisabled?: () => boolean }` | `undefined` | 时间禁用的校验函数 |  |
| separator | `string` | `'to'` | start 选框与 end 选框之间的分隔符 |  |
| start-placeholder | `string` | `'开始日期时间'` | DateTimeRange 中 start 选框的提示信息 |  |
| update-value-on-close | `boolean` | `false` | 关闭面板时是否更新值 |  |
| on-update:value | `(value: [number, number] \| null) => void` | `undefined` | 数据更新时触发的回调函数 |  |

### Month 类型的 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now']` | Month 类型的 Date Picker 中支持的操作 |
| format | `string` | `'yyyy-MM'` | 时间格式化字符串，详情见 [format](https://date-fns.org/v2.23.0/docs/format) |
| is-date-disabled | `(current: number) => boolean` | `undefined` | 月份禁用的校验函数 |
| placeholder | `string` | `'选择月份'` | 自动填充的提示信息 |
| on-update:value | `(value: number \| null) => void` | `undefined` | 可控数据更新时触发的回调函数 |

### Year 类型的 Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now'> \| null` | `['clear', 'now']` | Year 类型的 Date Picker 中支持的操作 |
| format | `string` | `'yyyy'` | 时间格式化字符串，详情见 [format](https://date-fns.org/v2.23.0/docs/format) |
| is-date-disabled | `(current: number) => boolean` | `undefined` | 年份禁用的校验函数 |
| placeholder | `string` | `'选择年份'` | 自动填充的提示信息 |
| on-update:value | `(value: number \| null) => void` | `undefined` | 可控数据更新时触发的回调函数 |

### DatePicker Slots

| 名称   | 参数 | 说明           |
| ------ | ---- | -------------- |
| footer | `()` | 添加额外的页脚 |

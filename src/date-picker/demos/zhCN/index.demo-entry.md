# 日期选择器 Date Picker

关于如何设定时间，大家总有很多种想法。

## 演示

```demo
date.vue
datetime.vue
datetimeformat.vue
daterange.vue
datetimerange.vue
month.vue
monthrange.vue
year.vue
yearrange.vue
quarter.vue
quarterrange.vue
week.vue
size.vue
default-time.vue
disabled.vue
disabled-time.vue
actions.vue
shortcuts.vue
events.vue
format.vue
footerslot.vue
status.vue
icon.vue
panel.vue
panel-debug.vue
form-debug.vue
```

## API

### 通用的 Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| clearable | `boolean` | `false` | 是否支持清除 |  |
| default-value | `number \| [number, number] \| null` | `undefined` | 默认被选中的日期的时间戳 |  |
| default-formatted-value | `string \| [string, string] \| null` | `undefined` | Date Picker 格式化后的值 |  |
| disabled | `boolean` | `false` | 是否禁用 |  |
| first-day-of-week | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `undefined` | 日历上一周的开始，0 代表周一 |  |
| formatted-value | `string \| [string, string] \| null` | `undefined` | 格式化之后的值 | 2.24.0 |
| input-readonly | `boolean` | `false` | 设置输入框为只读（避免在移动设备上打开虚拟键盘） |  |
| month-string-type | `'numeric' \| '2-digit' \| 'long' \| 'short' \| 'narrow'` | `'numeric'` | 设置面板中月份的显示方式 | NEXT_VERSION |
| panel | `boolean` | `false` | 是否只使用面板 | 2.29.1 |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'bottom-start'` | 面板的弹出位置 | 2.25.0 |
| shortcuts | `Record<string, number \| (() => number)> \| Record<string, [number, number] \| (() => [number, number])>` | `undefined` | 自定义快捷按钮 |  |
| show | `boolean` | `undefined` | 是否展示面板 | 2.28.3 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |  |
| status | `'success' \| 'warning' \| 'error'` | `undefined` | 验证状态 | 2.27.0 |
| to | `string \| HTMLElement \| false` | `body` | 面板的容器节点，`false` 会待在原地 |  |
| type | `'date' \| 'datetime' \| 'daterange' \| 'datetimerange' \| 'month' \| 'monthrange' \| 'year' \| 'quarter'` | `'date'` | Date Picker 的类型 | `'quarter'` v2.22.0, `'monthrange'` 2.28.3 |
| value | `number \| [number, number] \| null` | `undefined` | Date Picker 的值 |  |
| value-format | `string` | 跟随 `format` 属性 | 绑定值的格式，详情见 [format](https://date-fns.org/v2.23.0/docs/format) |
| on-clear | `() => void` | `undefined` | 用户 clear 时执行的回调 | 2.28.3 |
| on-confirm | `(value: number \| [number, number] \| null, formattedValue: string \| [string, string] \| null) => void` | `undefined` | 用户 confirm 时执行的回调 | 2.28.3 |
| on-blur | `() => void` | `undefined` | 用户 blur 时执行的回调 |  |
| on-focus | `() => void` | `undefined` | 用户 focus 时执行的回调 |  |
| on-update:show | `(show: boolean) => void` | `undefined` | 面板打开、关闭时的回调 | 2.28.3 |
| on-prev-month | `() => void` | `undefined` | 点击上一个月时的回调 | NEXT_VERSION |
| on-next-month | `() => void` | `undefined` | 点击下一个月时的回调 | NEXT_VERSION |
| on-prev-year | `() => void` | `undefined` | 点击上一年时的回调 | NEXT_VERSION |
| on-next-year | `() => void` | `undefined` | 点击下一年时的回调 | NEXT_VERSION |

### Date 类型的 Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now'> \| null` | `['clear', 'now']` | Date 类型的 Date Picker 中支持的操作 |  |
| format | `string` | `'yyyy-MM-dd'` | 时间格式化字符串，详情见 [format](https://date-fns.org/v2.23.0/docs/format) |  |
| is-date-disabled | `(current: number) => boolean` | `undefined` | 日期禁用的校验函数 |  |
| placeholder | `string` | `'选择日期'` | 自动填充的提示信息 |  |
| on-update:formatted-value | `(value: string \| null, timestampValue: number \| null) => void` | `undefined` | 可控数据更新时触发的回调函数 | 2.24.0 |
| on-update:value | `(value: number \| null, formattedValue: string \| null) => void` | `undefined` | 可控数据更新时触发的回调函数 | `formattedValue` 2.24.0 |

### DateTime 类型的 Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now', 'confirm']` | DateTime 类型的 Date Picker 中支持的操作 |  |
| default-time | `string` | `undefined` | 默认时间，格式为 `HH:mm:ss` | 2.22.0 |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` | 时间格式化字符串，详情见 [format](https://date-fns.org/v2.23.0/docs/format) |  |
| is-date-disabled | `(current: number) => boolean` | `undefined` | 日期禁用的校验函数 |  |
| is-time-disabled | `(current: number) => { isHourDisabled: boolean, isMinuteDisabled: boolean, isSecondDisabled: boolean }` | `undefined` | 时间禁用的校验函数 |  |
| placeholder | `string` | `'选择日期时间'` | 提示信息 |  |
| time-picker-props | `TimePickerProps` | `undefined` | 面板中时间选择器的属性 | 2.27.0 |
| update-value-on-close | `boolean` | `false` | 关闭面板时更新值 |  |
| on-update:formatted-value | `(value: string \| null, timestampValue: number \| null) => void` | `undefined` | 数据更新时触发的回调函数 | 2.24.0 |
| on-update:value | `(value: number \| null, formattedValue: string \| null) => void` | `undefined` | 数据更新时触发的回调函数 | `formattedValue` 2.24.0 |

### DateRange 类型的 Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | DateRange 类型的 Date Picker 中支持的用户操作 |  |
| bind-calendar-months | `boolean` | `false` | 面板月份是否连续 | 2.28.3 |
| default-calendar-start-time | `number` | `undefined` | 面板日历默认开始的月份时间戳 | 2.28.3 |
| default-calendar-end-time | `number` | `undefined` | 面板日历默认结束的月份时间戳 | 2.28.3 |
| format | `string` | `'yyyy-MM-dd'` | 时间格式化字符串，详情见 [format](https://date-fns.org/v2.23.0/docs/format) |  |
| is-date-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => boolean` | `undefined` | 日期禁用的校验函数 |  |
| is-time-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number]) => { isHourDisabled?: (hour: number) => boolean, isMinuteDisabled?: (minute: number, hour: number \| null) => boolean, isSecondDisabled?: (second: number, minute: number \| null, hour: number \| null) => boolean }` | `undefined` | 时间禁用的校验函数，校验函数中的 `null` 表示当前没有选中值 |  |
| close-on-select | `boolean` | `false` | 用户选择时间范围后是否自动关闭面板 |  |
| separator | `string` | 内置图标 | start 选框与 end 选框之间的分隔符 |  |
| start-placeholder | `string` | `'开始日期'` | DateRange 中 start 选框的提示信息 |  |
| update-value-on-close | `boolean` | `false` | 关闭面板时是否更新值 |  |
| on-update:formatted-value | `(value: [string, string] \| null, timestampValue: [number, number] \| null) => void` | `undefined` | 数据更新时触发的回调函数 | 2.24.0 |
| on-update:value | `(value: [number, number] \| null, formattedValue: [string, string] \| null) => void` | `undefined` | 数据更新时触发的回调函数 | `formattedValue` 2.24.0 |

### DateTimeRange 类型的 Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | DateTimeRange 类型的 Date Picker 中支持的用户操作 |  |
| bind-calendar-months | `boolean` | `false` | 面板月份是否连续 | 2.28.3 |
| default-calendar-start-time | `number` | `undefined` | 面板日历默认开始的月份时间戳 | 2.28.3 |
| default-calendar-end-time | `number` | `undefined` | 面板日历默认结束的月份时间戳 | 2.28.3 |
| default-time | `string \| Array<string \| undefined>` | `undefined` | 默认时间，格式为 `HH:mm:ss` | 2.22.0 |
| end-placeholder | `string` | `'结束日期时间'` | DateTimeRange 中 end 选框的提示信息 |  |
| format | `string` | `'yyyy-MM-dd HH:mm:ss'` | 时间格式化字符串，详情见 [format](https://date-fns.org/v2.23.0/docs/format) |  |
| is-date-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number] \| null) => boolean` | `undefined` | 日期禁用的校验函数 |  |
| is-time-disabled | `(current: number, phase: 'start' \| 'end', value: [number, number]) => { isHourDisabled?: (hour: number) => boolean, isMinuteDisabled?: (minute: number, hour: number \| null) => boolean, isSecondDisabled?: (second: number, minute: number \| null, hour: number \| null) => boolean }` | `undefined` | 时间禁用的校验函数，校验函数中的 `null` 表示当前没有选中值 |  |
| separator | `string` | 内置图标 | start 选框与 end 选框之间的分隔符 |  |
| start-placeholder | `string` | `'开始日期时间'` | DateTimeRange 中 start 选框的提示信息 |  |
| time-picker-props | `TimePickerProps \| [TimePickerProps, TimePickerProps]` | `undefined` | 面板中时间选择器的属性 | 2.27.0 |
| update-value-on-close | `boolean` | `false` | 关闭面板时是否更新值 |  |
| on-update:formatted-value | `(value: [string, string] \| null, timestampValue: [number, number] \| null) => void` | `undefined` | 数据更新时触发的回调函数 | 2.24.0 |
| on-update:value | `(value: [number, number] \| null, formattedValue: [string, string] \| null) => void` | `undefined` | 数据更新时触发的回调函数 | `formattedValue` 2.24.0 |

### Month 类型的 Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now' \| 'confirm'> \| null` | `['clear', 'now']` | Month 类型的 Date Picker 中支持的操作 |  |
| format | `string` | `'yyyy-MM'` | 时间格式化字符串，详情见 [format](https://date-fns.org/v2.23.0/docs/format) |  |
| is-date-disabled | `(current: number) => boolean` | `undefined` | 月份禁用的校验函数 |  |
| placeholder | `string` | `'选择月份'` | 自动填充的提示信息 |  |
| on-update:formatted-value | `(value: string \| null, timestampValue: number \| null) => void` | `undefined` | 可控数据更新时触发的回调函数 | 2.24.0 |
| on-update:value | `(value: number \| null, formattedValue: string \| null) => void` | `undefined` | 可控数据更新时触发的回调函数 | `formattedValue` 2.24.0 |

### MonthRange、QuarterRange、YearRange 类型的 Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'confirm'> \| null` | `['clear', 'confirm']` | MonthRange 类型的 Date Picker 中支持的用户操作 | 2.28.3 |
| end-placeholder | `string` | `'结束月份'` | MonthRange 中 end 选框的提示信息 | 2.28.3 |
| format | `string` | `'yyyy-MM-dd'` | 时间格式化字符串，详情见 [format](https://date-fns.org/v2.23.0/docs/format) | 2.28.3 |
| close-on-select | `boolean` | `false` | 用户选择时间范围后是否自动关闭面板 | 2.28.3 |
| separator | `string` | 内置图标 | start 选框与 end 选框之间的分隔符 | 2.28.3 |
| start-placeholder | `string` | `'开始月份'` | MonthRange 中 start 选框的提示信息 | 2.28.3 |
| update-value-on-close | `boolean` | `false` | 关闭面板时是否更新值 | 2.28.3 |
| on-update:formatted-value | `(value: [string, string] \| null, timestampValue: [number, number] \| null) => void` | `undefined` | 数据更新时触发的回调函数 | 2.28.3 |
| on-update:value | `(value: [number, number] \| null, formattedValue: [string, string] \| null) => void` | `undefined` | 数据更新时触发的回调函数 | 2.28.3 |

### Year 类型的 Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| actions | `Array<'clear' \| 'now'> \| null` | `['clear', 'now']` | Year 类型的 Date Picker 中支持的操作 |  |
| format | `string` | `'yyyy'` | 时间格式化字符串，详情见 [format](https://date-fns.org/v2.23.0/docs/format) |  |
| is-date-disabled | `(current: number) => boolean` | `undefined` | 年份禁用的校验函数 |  |
| placeholder | `string` | `'选择年份'` | 自动填充的提示信息 |  |
| on-update:formatted-value | `(value: string \| null, timestampValue: number \| null) => void` | `undefined` | 可控数据更新时触发的回调函数 | 2.24.0 |
| on-update:value | `(value: number \| null, formattedValue: string \| null) => void` | `undefined` | 可控数据更新时触发的回调函数 | `formattedValue` 2.24.0 |

### DatePicker Slots

| 名称       | 参数 | 说明                         | 版本   |
| ---------- | ---- | ---------------------------- | ------ |
| date-icon  | `()` | 日期输入框的图标             | 2.29.0 |
| footer     | `()` | 添加额外的页脚               |        |
| next-month | `()` | 日期面板的 `下一个` 图标     | 2.33.4 |
| next-year  | `()` | 日期面板的 `快速下一个` 图标 | 2.33.4 |
| prev-month | `()` | 日期面板的 `上一个` 图标     | 2.33.4 |
| prev-year  | `()` | 日期面板的 `快速上一个` 图标 | 2.33.4 |
| separator  | `()` | 日期范围分隔符号             | 2.29.0 |

### DatePicker Methods

| 名称  | 类型         | 说明 | 版本   |
| ----- | ------------ | ---- | ------ |
| focus | `() => void` | 聚焦 | 2.24.2 |
| blur  | `() => void` | 失焦 | 2.24.2 |

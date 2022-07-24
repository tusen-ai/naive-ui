# 时间选择器 Time Picker

就像一块数码表。

## 演示

```demo
basic.vue
confirm.vue
size.vue
disabled-time.vue
step-time.vue
format.vue
actions.vue
hours12.vue
formatted.vue
focus.vue
status.vue
timezone.vue
timezone-debug.vue
```

## API

### TimePicker Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| actions | `Array<'now' \| 'confirm'> \| null` | `['now', 'confirm']` | Time Picker 中支持的操作 |  |
| clearable | `boolean` | `false` | 是否可清空 |  |
| default-value | `number \| null` | `null` | 非受控模式下的默认值 |  |
| default-formatted-value | `string \| null` | `undefined` | 非受控模式下的默认格式化后的值 | 2.24.0 |
| disabled | `boolean` | `false` | 是否禁用 |  |
| format | `string` | `'HH:mm:ss'` | 时间格式化字符串，详情见 [format](https://date-fns.org/v2.23.0/docs/format) |  |
| formatted-value | `string \| null` | `undefined` | 格式化后的值 | 2.24.0 |
| hours | `number \| number[]` | `undefined` | 通过数组指定显示的小时。当值为 `number` 时，将被当做时间步进处理 |  |
| minutes | `number \| number[]` | `undefined` | 通过数组指定显示的分钟。当值为 `number` 时，将被当做时间步进处理 |  |
| seconds | `number \| number[]` | `undefined` | 通过数组指定显示的秒。当值为 `number` 时，将被当做时间步进处理 |  |
| input-readonly | `boolean` | `false` | 设置输入框为只读（避免在移动设备上打开虚拟键盘） |  |
| is-hour-disabled | `(hour: number) => boolean` | `() => false` | 用于禁用小时的回调函数 |  |
| is-minute-disabled | `(minute: number, hour: number \| null) => boolean` | `() => false` | 用于禁用分钟的回调函数，在没有选中值时，`hour` 是 `null` |  |
| is-second-disabled | `(second: number, minute: number \| null, hour: number \| null) => boolean` | `() => false` | 用于禁用秒钟的回调函数，在没有选中值时，`minute` 和 `hour` 是 `null` |  |
| placeholder | `string` | `'请选择时间'` | 选择框的占位符 |  |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'bottom-start'` | 时间选择器的面板的弹出位置 | 2.25.0 |
| show | `boolean` | `undefined` | 是否展示面板 | 2.28.3 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 选择框的尺寸 |  |
| status | `'success' \| 'warning' \| 'error'` | `undefined` | 验证状态 | 2.27.0 |
| time-zone | `string` | `undefined` | 格式化值时使用的市区，遵循 [iana time zones](https://www.iana.org/time-zones) 格式。你可以使用 `Intl.supportedValuesOf('timeZone')` 来查看支持的时区 | 2.30.0 |
| to | `string \| HTMLElement \| false` | `body` | 菜单的容器节点，`false` 会待在原地 |  |
| use-12-hours | `boolean` | `false` | 是否使用 12 小时制的面板 |  |
| value | `number \| null` | `undefined` | 受控模式下的值 |  |
| value-format | `string` | 跟随 `format` | 格式化后值的格式 | 2.24.0 |
| on-blur | `() => void` | `undefined` | 选择框失去焦点时的回调 |  |
| on-clear | `() => void` | `undefined` | 清除值时的回调 | 2.28.3 |
| on-confirm | `(value: number \| null, formattedValue: string \| null) => void` | `undefined` | 点击确认按钮时的回调 | 2.28.3 |
| on-focus | `() => void` | `undefined` | 选择框获得焦点时的回调 |  |
| on-update:formatted-value | `(value: number \| null, timestampValue: number \| null) => void` | `undefined` | 格式化的值发生改变时的回调 | 2.24.0 |
| on-update:show | `(show: boolean) => void` | `undefined` | 面板打开、关闭时的回调 | 2.28.3 |
| on-update:value | `(value: number \| null, formattedValue: string \| null) => void` | `undefined` | 值发生改变时的回调 | `formattedValue` 2.24.0 |

### TimePicker Slots

| 名称 | 参数 | 说明       |
| ---- | ---- | ---------- |
| icon | `()` | 自定义图标 |

### TimePicker Methods

| 名称  | 类型         | 说明 | 版本   |
| ----- | ------------ | ---- | ------ |
| focus | `() => void` | 聚焦 | 2.24.2 |
| blur  | `() => void` | 失焦 | 2.24.2 |

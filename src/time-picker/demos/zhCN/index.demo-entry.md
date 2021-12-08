# 时间选择器 Time Picker

就像一块数码表。

## 演示

```demo
basic
size
disabled-time
step-time
format
actions
hours12
```

## API

### TimePicker Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| actions | `Array<'now' \| 'confirm'> \| null` | `['now', 'confirm']` | Time Picker 中支持的操作 |
| clearable | `boolean` | `false` | 是否可清空 |
| default-value | `number \| null` | `null` | 非受控模式下的默认值 |
| disabled | `boolean` | `false` | 是否禁用 |
| format | `string` | `'HH:mm:ss'` | 时间格式化字符串，详情见 [format](https://date-fns.org/v2.23.0/docs/format) |
| hours | `number \| number[]` | `undefined` | 通过数组指定显示的小时。当值为 `number` 时，将被当做时间步进处理 |
| minutes | `number \| number[]` | `undefined` | 通过数组指定显示的分钟。当值为 `number` 时，将被当做时间步进处理 |
| seconds | `number \| number[]` | `undefined` | 通过数组指定显示的秒。当值为 `number` 时，将被当做时间步进处理 |
| input-readonly | `boolean` | `false` | 设置输入框为只读（避免在移动设备上打开虚拟键盘） |
| is-hour-disabled | `(hour: number) => boolean` | `() => false` | 用于禁用小时的回调函数 |
| is-minute-disabled | `(minute: number, hour: number) => boolean` | `() => false` | 用于禁用分钟的回调函数 |
| is-second-disabled | `(second: number, minute: number, hour: number) => boolean` | `() => false` | 用于禁用秒钟的回调函数 |
| placeholder | `string` | `'请选择时间'` | 选择框的占位符 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 选择框的尺寸 |
| use-12-hours | `boolean` | `false` | 是否使用 12 小时制的面板 |
| value | `number \| null` | `undefined` | 受控模式下的值 |
| on-blur | `() => void` | `undefined` | 选择框失去焦点时的回调 |
| on-focus | `() => void` | `undefined` | 选择框获得焦点时的回调 |
| on-update:value | `(value: number \| null) => void` | `undefined` | 值发生改变时的回调 |

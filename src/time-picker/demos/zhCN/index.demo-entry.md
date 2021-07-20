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
| clearable | `boolean` | `false` | 是否允许被清空 |
| default-value | `number \| null` | `null` | 默认值 |
| disabled | `boolean` | `false` | 禁用状态 |
| format | `string` | `'HH:mm:ss'` | 时间格式化 |
| hours | `number \| number[]` | `undefined` | 通过数组指定显示的小时。当值为 `number` 时，将被当做时间步进处理 |
| minutes | `number \| number[]` | `undefined` | 通过数组指定显示的分钟。当值为 `number` 时，将被当做时间步进处理 |
| seconds | `number \| number[]` | `undefined` | 通过数组指定显示的秒。当值为 `number` 时，将被当做时间步进处理 |
| is-hour-disabled | `(hour: number) => boolean` | `() => false` | 小时列回调函数 |
| is-minute-disabled | `(minute: number, hour: number) => boolean` | `() => false` | 分钟列回调函数 |
| is-second-disabled | `(second: number, minute: number, hour: number) => boolean` | `() => false` | 秒钟列回调函数 |
| placeholder | `string` | `'Select Time'` | 选择框的占位符 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 选择框的尺寸 |
| value | `number \| null` | `undefined` | 选择的值 |
| on-blur | `() => void` | `undefined` | 选择框失去焦点时的回调 |
| on-focus | `() => void` | `undefined` | 选择框获得焦点时的回调 |
| on-update:value | `(value: number \| null) => void` | `undefined` | 值发生改变时的回调 |

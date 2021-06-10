# 数字输入 Input Number

输入数字就用它。

## 演示

```demo
basic
disabled
event
min-max
size
step
validator
show-button
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | 是否有边框 |
| show-button | `boolean` | `true` | 是否有按钮 |
| default-value | `number \| null` | `null` | 初始值 |
| disabled | `boolean` | `false` | 禁用 |
| max | `number` | `undefined` | 最大值 |
| min | `number` | `undefined` | 最小值 |
| placeholder | `string` | `'请输入'` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 输入框大小 |
| step | `number` | `1` | 每次改变步数，可以为小数 |
| validator | `(value) => boolean` | `undefined` |  |
| value | `number \| null` | `undefined` |  |
| on-blur | `(event: FocusEvent) => void` | `undefined` | 移除焦点 |
| on-focus | `(event: FocusEvent) => void` | `undefined` | 获取焦点 |
| on-update:value | `(value: number) => void` | `undefined` | 组件值发生变化 |

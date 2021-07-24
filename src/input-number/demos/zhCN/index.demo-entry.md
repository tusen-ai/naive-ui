# 数字输入 Input Number

输入数字就用它。

## 演示

```demo
basic
disabled
event
icon
min-max
size
step
validator
show-button
debug
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | 是否有边框 |
| default-value | `number \| null` | `null` | 非受控模式下的默认值 |
| disabled | `boolean` | `false` | 是否禁用 |
| max | `number` | `undefined` | 最大值 |
| min | `number` | `undefined` | 最小值 |
| placeholder | `string` | `'请输入'` |  |
| show-button | `boolean` | `true` | 是否有按钮 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 输入框大小 |
| step | `number` | `1` | 每次改变步数，可以为小数 |
| validator | `(value) => boolean` | `undefined` | 设置自定义验证 |
| value | `number \| null` | `undefined` | 受控模式下的值 |
| on-blur | `(event: FocusEvent) => void` | `undefined` | 移除焦点的回调 |
| on-focus | `(event: FocusEvent) => void` | `undefined` | 获取焦点的回调 |
| on-update:value | `(value: number \| null) => void` | `undefined` | 组件值发生变化的回调 |

### Slots

| 属性   | 类型 | 说明               |
| ------ | ---- | ------------------ |
| prefix | `()` | 输入框头部内容插槽 |
| suffix | `()` | 输入框尾部内容插槽 |

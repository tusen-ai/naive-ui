# 数字输入 Input Number

输入数字就用它。

## 演示

```demo
basic
disabled
event
icon
loading
min-max
size
step
validator
show-button
disable-keyboard
change-timing
debug
```

## API

### InputNumber Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | 是否有边框 |
| clearable | `boolean` | `false` | 是否可清空 |
| default-value | `number \| null` | `null` | 非受控模式下的默认值 |
| disabled | `boolean` | `false` | 是否禁用 |
| keyboard | `{ ArrowUp?: boolean, ArrowDown?: boolean }` | `{}` | 控制允许的键盘操作，属性值设为 `false` 的时候会禁用对应的键盘操作 |
| loading | `boolean` | `undefined` | 是否展示加载图标，设为非 `undefined` 会占据空间 |
| max | `number` | `undefined` | 最大值 |
| min | `number` | `undefined` | 最小值 |
| placeholder | `string` | `'请输入'` | 提示信息 |
| show-button | `boolean` | `true` | 是否有按钮 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 输入框大小 |
| step | `number` | `1` | 每次改变步数，可以为小数 |
| update-value-on-input | `boolean` | `true` | 在输入的过程中，在输入值合法的情况下，是否改变值 |
| validator | `(value) => boolean` | `undefined` | 设置自定义验证 |
| value | `number \| null` | `undefined` | 受控模式下的值 |
| on-blur | `(event: FocusEvent) => void` | `undefined` | 移除焦点的回调 |
| on-clear | `() => void` | `undefined` | 点击清空按钮时的回调 |
| on-focus | `(event: FocusEvent) => void` | `undefined` | 获取焦点的回调 |
| on-update:value | `(value: number \| null) => void` | `undefined` | 组件值发生变化的回调 |

### InputNumber Slots

| 名称   | 参数 | 说明               |
| ------ | ---- | ------------------ |
| prefix | `()` | 输入框头部内容插槽 |
| suffix | `()` | 输入框尾部内容插槽 |

### InputNumber Methods

| 名称  | 类型         | 说明     |
| ----- | ------------ | -------- |
| blur  | `() => void` | 失焦输入 |
| focus | `() => void` | 聚焦输入 |

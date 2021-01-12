# 单选 Radio

<!--single-column-->

我还小的时候，很喜欢听收音机，比如 FM 106.8 或者 FM 92.1。

## 演示

```demo
basic
group
button-group
size
radio-focus-debug
```

## Props

### Radio Props, RadioButton Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| checked | `boolean` | `undefined` |  |
| default-checked | `boolean` | `false` |  |
| disabled | `boolean` | `false` |  |
| name | `string` | `undefined` | 单选按钮 radio 元素的 name 属性。如果没有设定会使用 `n-radio-group` 的 `name` |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 只用于 `n-radio` |
| value | `string` | `undefined` |  |
| on-update:checked-value | `(checked: boolean) => any` | `undefined` |  |

### RadioGroup Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| disabled | `boolean` | `false` |  |
| name | `string` | `undefined` | 选项组内部 radio 元素的 name 属性 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| value | `string \| null` | `null` |  |
| on-update:value | `(value: string) => any` | `undefined` |  |

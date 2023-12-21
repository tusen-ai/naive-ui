# 单选 Radio

<!--single-column-->

我还小的时候，很喜欢听收音机，比如 FM 106.8 或者 FM 92.1。

## 演示

```demo
basic.vue
group.vue
button-group.vue
size.vue
radio-focus-debug.vue
rtl-debug.vue
uncontrolled-debug.vue
```

## API

### Radio Props, RadioButton Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| checked | `boolean` | `undefined` | 选中状态 |  |
| default-checked | `boolean` | `false` | 默认选中的状态 |  |
| disabled | `boolean` | `false` | 禁用状态 |  |
| label | `string` | `undefined` | 标签 | 2.28.0 |
| name | `string` | `undefined` | 单选按钮 radio 元素的 name 属性。如果没有设定会使用 `n-radio-group` 的 `name` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 大小 |  |
| value | `string \| number \| boolean` | `'on'` | 选中的值 | `boolean` 2.33.0 |
| on-update:checked | `(checked: boolean) => void` | `undefined` | 发生变化时触发的回调方法 |  |

### RadioGroup Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| disabled | `boolean` | `false` | 禁用状态 |
| name | `string` | `undefined` | 选项组内部 radio 元素的 name 属性 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 大小 |
| value | `string \| number \| boolean \| null` | `null` | 选中的值 |
| default-value | `string \| number \| boolean \| null` | `null` | 默认选中的值 |
| on-update:value | `(value: string \| number \| boolean) => void` | `undefined` | 发生变化时触发的回调方法 |

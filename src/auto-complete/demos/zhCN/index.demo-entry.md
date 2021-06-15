# 自动填充 Auto Complete

用来当搜索提示或者类似的东西。

## 演示

```demo
basic
size
group
custom-input
after-select
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| blur-after-select | `boolean` | `false` | 选中后是否 blur |
| clear-after-select | `boolean` | `false` | 选中后是否清空 |
| clearable | `boolean` | `false` | 自动填充是否支持可清除 |
| default-value | `string` | `null` | 自动填充的默认值 |
| disabled | `boolean` | `false` | 自动填充是否禁用 |
| options | `Array<string \| AutoCompleteOption \| AutoCompleteGroupOption>` | `[]` | 自动填充的自定义选项 |
| placeholder | `string` | `'请输入'` | 自动填充的提示信息 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 自动填充的尺寸大小 |
| value | `string` | `undefined` | 自动填充的数据用户可控 |
| on-blur | `(event: FocusEvent) => void` | `undefined` | blur 时触发的回调函数 |
| on-focus | `(event: FocusEvent) => void` | `undefined` | focus 时触发的回调函数 |
| on-select | `(value: string) => void` | `undefined` | select 选中时触发的回调函数 |
| on-update:value | `(value: string \| null) => void` | `undefined` | 可控数据更新时触发的回调函数 |

### AutoCompleteOption Properties

| 名称     | 类型               | 介绍            |
| -------- | ------------------ | --------------- |
| disabled | `boolean`          | 是否禁用        |
| label    | `string`           | 显示的 label 值 |
| render   | `Function`         | 自定义渲染函数  |
| value    | `string \| number` | 需要唯一        |

### AutoCompleteGroupOption Properties

| 名称 | 类型 | 介绍 |
| --- | --- | --- |
| children | `Array<string \| AutoCompleteOption>` | AutoCompleteGroup 的 children 项 |
| name | `string` | AutoCompleteGroup 的名字 |
| type | `'group'` | AutoCompleteGroup 的类型 |

## Slots

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | `(options: { handleInput: (value: string) => void, handleFocus: function, handleBlur: function, value: string, theme: string \| null })` | 自定义输入元素，由用户填充 |

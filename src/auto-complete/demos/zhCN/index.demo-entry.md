# 自动填充 Auto Complete

用来当搜索提示或者类似的东西。

## 演示

```demo
basic
size
group
custom-input
after-select
show-options-by-value
```

## API

### AutoComplete Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| blur-after-select | `boolean` | `false` | 选中后是否 blur |
| clear-after-select | `boolean` | `false` | 选中后是否清空 |
| clearable | `boolean` | `false` | 自动填充是否支持可清除 |
| default-value | `string` | `null` | 自动填充的默认值 |
| disabled | `boolean` | `false` | 自动填充是否禁用 |
| get-show | `(value: string) => boolean` | `undefined` | 根据输入值在聚焦的状态中决定是否显示菜单 |
| input-props | `HTMLInputAttributes` | `undefined` | 自动填充中 input 元素的属性 |
| loading | `boolean` | `false` | 是否展示加载状态 |
| options | `Array<string \| AutoCompleteOption \| AutoCompleteGroupOption>` | `[]` | 自动填充的自定义选项 |
| placeholder | `string` | `'请输入'` | 自动填充的提示信息 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 自动填充的尺寸大小 |
| value | `string` | `undefined` | 自动填充的数据用户可控 |
| on-blur | `(event: FocusEvent) => void` | `undefined` | blur 时触发的回调函数 |
| on-focus | `(event: FocusEvent) => void` | `undefined` | focus 时触发的回调函数 |
| on-select | `(value: string) => void` | `undefined` | select 选中时触发的回调函数 |
| on-update:value | `(value: string \| null) => void` | `undefined` | 可控数据更新时触发的回调函数 |

#### AutoCompleteOption Properties

| 名称     | 类型      | 介绍            |
| -------- | --------- | --------------- |
| disabled | `boolean` | 是否禁用        |
| label    | `string`  | 显示的 label 值 |
| value    | `string`  | 需要唯一        |

#### AutoCompleteGroupOption Properties

| 名称 | 类型 | 介绍 |
| --- | --- | --- |
| children | `Array<string \| AutoCompleteOption>` | AutoCompleteGroupOption 的 children 项 |
| label | `string` | AutoCompleteGroupOption 的名字 |
| key | `string \| number` | AutoCompleteGroupOption 的 key |
| type | `'group'` | AutoCompleteGroupOption 的类型 |

### AutoComplete Slots

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| default | `(options: { handleInput: (value: string) => void, handleFocus: function, handleBlur: function, value: string, theme: string \| null })` | 自定义输入元素，由用户填充 |
| prefix | `()` | 输入框头部内容 |
| suffix | `()` | 输入框尾部内容 |

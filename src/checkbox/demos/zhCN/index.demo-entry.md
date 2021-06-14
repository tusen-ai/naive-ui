# 复选框 Checkbox

哟，哟，Check it out。

## 演示

```demo
basic
group
grid
indeterminate
controlled
event
```

## Props

### Checkbox Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| checked | `boolean` | `undefined` | 受控状态下是否选中 |
| indeterminate | `boolean` | `false` | 是否部分选中 |
| default-checked | `boolean` | `false` | 默认是否选中 |
| disabled | `boolean` | `false` | 是否禁用 |
| focusable | `boolean` | `true` | 选中时是否聚集 |
| label | `string \| (() => VNodeChild)` | `undefined` | Checkbox 的标签 |
| value | `string \| number` | `undefined` | Checkbox 的标签对应的 value 值,选项组常用 |
| on-update:checked | `(checked: boolean) => void` | `undefined` | 当 checked 改变时触发的回调函数 |

### Checkbox Group Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| disabled | `boolean` | `false` | 选项组是否禁用 |
| default-value | `Array<string \| number>` | `null` | 选项组默认选中值 |
| value | `Array<string \| number> \| null` | `undefined` | 选项组的受控数据 |
| on-update:value | `(value: string \| number)` | `undefined` | 选项组的受控数据改变时的回调 |

## Slots

### Checkbox Slots

| 名称    | 参数 | 说明                    |
| ------- | ---- | ----------------------- |
| default | `()` | Checkbox 的默认填充内容 |

### Checkbox Group Slots

| 名称    | 参数 | 说明                         |
| ------- | ---- | ---------------------------- |
| default | `()` | CheckboxGroup 的默认填充内容 |

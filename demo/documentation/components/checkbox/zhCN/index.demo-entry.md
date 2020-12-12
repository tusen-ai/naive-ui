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
| checked | `boolean` | `undefined` |  |
| default-checked | `boolean` | `false` |  |
| disabled | `boolean` | `false` |  |
| label | `string \| function` | `undefined` | 可以是渲染函数 |
| theme | `'light' \| 'dark' \| string` | `undefined` |  |
| value | `string \| number` | `undefined` |  |
| on-update:checked | `(checked: boolean)` | `undefined` |  |

### Checkbox Group Props

| 名称            | 类型                          | 默认值      | 说明 |
| --------------- | ----------------------------- | ----------- | ---- |
| disabled        | `boolean`                     | `false`     |      |
| theme           | `'light' \| 'dark' \| string` | `undefined` |      |
| value           | `Array<string \| number>`     | `null`      |      |
| on-update:value | `(value: string \| number)`   | `undefined` |      |

## Slots

### Checkbox Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |

### Checkbox Group Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |

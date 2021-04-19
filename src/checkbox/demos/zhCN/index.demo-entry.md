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

| 名称              | 类型                           | 默认值      | 说明 |
| ----------------- | ------------------------------ | ----------- | ---- |
| checked           | `boolean`                      | `undefined` |      |
| default-checked   | `boolean`                      | `false`     |      |
| disabled          | `boolean`                      | `false`     |      |
| focusable         | `boolean`                      | `true`      |      |
| label             | `string \| (() => VNodeChild)` | `undefined` |      |
| value             | `string \| number`             | `undefined` |      |
| on-update:checked | `(checked: boolean) => void`   | `undefined` |      |

### Checkbox Group Props

| 名称            | 类型                              | 默认值      | 说明 |
| --------------- | --------------------------------- | ----------- | ---- |
| disabled        | `boolean`                         | `false`     |      |
| default-value   | `Array<string \| number>`         | `null`      |
| value           | `Array<string \| number> \| null` | `undefined` |
| on-update:value | `(value: string \| number)`       | `undefined` |      |

## Slots

### Checkbox Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |

### Checkbox Group Slots

| 名称    | 参数 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |

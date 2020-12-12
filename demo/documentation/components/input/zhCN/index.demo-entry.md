# 文本输入 Input

很多年前，人们还在用打孔纸卡输入。

<n-alert title="注意" type="warning">`n-input` 是严格受控的组件，如果你修改 `value`，那么它的值永远不会改变。（`v-model:value` 并不会出问题）</n-alert>

## 演示

```demo
basic
size
round
icon
password
disabled
clearable
autosize
pair
input-group
passively-activated
```

## Props

### Input Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| autofocus | `boolean` | `false` |  |
| autosize | `boolean \| { minRows?: number, maxRows?: number }` | `false` |  |
| clearable | `boolean` | `false` |  |
| disabled | `boolean` | `false` |  |
| maxlength | `number` | `undefined` |  |
| minlength | `number` | `undefined` |  |
| pair | `boolean` | `false` | 是否输入成对的值 |
| passively-activated | `boolean` | `false` |  |
| placeholder | `string \| [string, string]` | `undefined` | 文本输入的占位符。如果是 `pair` 是 `true`，`placeholder`是一个数组 |
| readonly | `boolean` | `false` |  |
| round | `boolean` | `false` |  |
| rows | `number` | `3` |  |
| separator | `string` | `undefined` | 成对的值中间的分隔符 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| theme | `'light' \| 'dark' \| string` | `undefined` |  |
| type | `'text' \| 'password' \| 'textarea'` | `'text'` |  |
| value | `string \| [string, string]` | `null` | 文本输入的值。如果是 `pair` 是 `true`，`value` 是一个数组 |
| on-blur | `() => any` | `undefined` |  |
| on-change | `(value: string \| [string, string]) => any` | `undefined` |  |
| on-clear | `() => any` | `undefined` |  |
| on-focus | `() => any` | `undefined` |  |
| on-update:value | `(value: string \| [string, string]) => any` | `undefined` |  |

## Slots

### Input Slots

| 属性   | 类型 | 说明 |
| ------ | ---- | ---- |
| prefix | `()` |      |
| suffix | `()` |      |

### Input Group Slots

| 属性    | 类型 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |

### Input Group Label Slots

| 属性    | 类型 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |

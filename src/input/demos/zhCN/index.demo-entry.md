# 文本输入 Input

很多年前，人们还在用打孔纸卡输入。

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
count
```

## Props

### Input Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| autofocus | `boolean` | `false` |  |
| autosize | `boolean \| { minRows?: number, maxRows?: number }` | `false` |  |
| clearable | `boolean` | `false` |  |
| default-value | `string \| [string, string] \| null` | `null` |  |
| disabled | `boolean` | `false` |  |
| show-password-toggle | `boolean` | `false` | 控制密码的显示隐藏 |
| maxlength | `number` | `undefined` |  |
| minlength | `number` | `undefined` |  |
| pair | `boolean` | `false` | 是否输入成对的值 |
| passively-activated | `boolean` | `false` |  |
| placeholder | `string \| [string, string]` | `undefined` | 文本输入的占位符。如果是 `pair` 是 `true`，`placeholder`是一个数组 |
| readonly | `boolean` | `false` |  |
| round | `boolean` | `false` |  |
| rows | `number` | `3` |  |
| separator | `string` | `undefined` | 成对的值中间的分隔符 |
| show-count | `boolean` | `false` | 是否显示字数统计 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| type | `'text' \| 'password' \| 'textarea'` | `'text'` |  |
| value | `string \| [string, string] \| null` | `undefined` | 文本输入的值。如果是 `pair` 是 `true`，`value` 是一个数组 |
| on-blur | `() => void` | `undefined` |  |
| on-change | `(value: string \| [string, string]) => void` | `undefined` |  |
| on-clear | `() => void` | `undefined` |  |
| on-focus | `() => void` | `undefined` |  |
| on-update:value | `(value: string \| [string, string]) => void` | `undefined` |  |

## Slots

### Input Slots

| 属性      | 类型 | 说明 |
| --------- | ---- | ---- |
| prefix    | `()` |      |
| suffix    | `()` |      |
| separator | `()` |      |

### Input Group Slots

| 属性    | 类型 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |

### Input Group Label Slots

| 属性    | 类型 | 说明 |
| ------- | ---- | ---- |
| default | `()` |      |

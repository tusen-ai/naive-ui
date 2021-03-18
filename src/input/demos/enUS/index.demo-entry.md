# Input

Many years ago, people used punched card to input.

## Demos

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

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| autofocus | `boolean` | `false` |  |
| autosize | `boolean \| { minRows?: number, maxRows?: number }` | `false` |  |
| clearable | `boolean` | `false` |  |
| default-value | `string \| [string, string] \| null` | `null` |  |
| disabled | `boolean` | `false` |  |
| maxlength | `number` | `undefined` |  |
| minlength | `number` | `undefined` |  |
| pair | `boolean` | `false` | Whether to input pairwise value. |
| passively-activated | `boolean` | `false` |  |
| placeholder | `string \| [string, string]` | `undefined` | Placeholder of input. When `pair` is `true`, placeholder is an array. |
| readonly | `boolean` | `false` |  |
| round | `boolean` | `false` |  |
| rows | `number` | `3` |  |
| separator | `string` | `undefined` | The separator bewteen pairwise inputs. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| type | `'text' \| 'password' \| 'textarea'` | `'text'` |  |
| value | `string \| [string, string] \| null` | `undefined` | Value of input. When `pair` is `true`, `value` is an array. |
| on-blur | `() => void` | `undefined` |  |
| on-change | `(value: string \| [string, string]) => void` | `undefined` |  |
| on-clear | `() => void` | `undefined` |  |
| on-focus | `() => void` | `undefined` |  |
| on-update:value | `(value: string \| [string, string]) => void` | `undefined` |  |

## Slots

### Input Slots

| Name      | Parameters | Description |
| --------- | ---------- | ----------- |
| prefix    | `()`       |             |
| suffix    | `()`       |             |
| separator | `()`       |             |

### Input Group Slots

| Name    | Parameters | Description |
| ------- | ---------- | ----------- |
| default | `()`       |             |

### Input Group Label Slots

| Name    | Parameters | Description |
| ------- | ---------- | ----------- |
| default | `()`       |             |

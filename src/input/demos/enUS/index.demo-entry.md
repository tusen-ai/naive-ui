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
count
focus
```

## API

### Input Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| autofocus | `boolean` | `false` | Whether to autofocus. |
| autosize | `boolean \| { minRows?: number, maxRows?: number }` | `false` | When type is textarea works, for example `{ minRows: 1, maxRows: 3 }`. |
| clearable | `boolean` | `false` | Whether the input is clearable. |
| default-value | `string \| [string, string] \| null` | `null` | Default value in uncontrolled mode. |
| disabled | `boolean` | `false` | Whether to disable the input. |
| input-props | `object` | `undefined` | The props of the input element inside the component. It doesn't work with `pair` input. |
| loading | `boolean` | `undefined` | Whether to show loading indicator. Set to non `undefined` value will take space for loading indicator. |
| maxlength | `number` | `undefined` | Maximum input length. |
| minlength | `number` | `undefined` | Minimum input length. |
| pair | `boolean` | `false` | Whether to input pairwise value. |
| passively-activated | `boolean` | `false` | Whether to passively activate the input. |
| placeholder | `string \| [string, string]` | `undefined` | Placeholder of input. When `pair` is `true`, placeholder is an array. |
| readonly | `boolean` | `false` | Read only. |
| round | `boolean` | `false` | Whether the input show round. |
| rows | `number` | `3` | Input rows, only works when type is `textarea`. |
| separator | `string` | `undefined` | The separator bewteen pairwise inputs. |
| show-count | `boolean` | `false` | Whether to show word count. |
| show-password-on | `'click' \| 'mousedown'` | `undefined` | The timing to show the password. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Input size. |
| type | `'text' \| 'password' \| 'textarea'` | `'text'` | Input type. |
| value | `string \| [string, string] \| null` | `undefined` | Value of input. When `pair` is `true`, `value` is an array. |
| on-blur | `() => void` | `undefined` | Callback triggered when the input blur. |
| on-change | `(value: string \| [string, string]) => void` | `undefined` | Callback triggered when the input blur and value changes. |
| on-clear | `() => void` | `undefined` | Callback triggered when the input clear. |
| on-focus | `() => void` | `undefined` | Callback triggered when the input focus. |
| on-update:value | `(value: string \| [string, string]) => void` | `undefined` | Callback triggered when the input value changes. |

### Input Slots

| Name | Parameters | Description |
| --- | --- | --- |
| prefix | `()` | The prefix content of the input. |
| suffix | `()` | The suffix content of the input. |
| separator | `()` | The separator content of the input, only works when `pare` is true and it's priority higher than the separator prop. |

### InputGroup Slots

| Name    | Parameters | Description                     |
| ------- | ---------- | ------------------------------- |
| default | `()`       | The content of the input group. |

### InputGroupLabel Slots

| Name    | Parameters | Description                           |
| ------- | ---------- | ------------------------------------- |
| default | `()`       | The content of the input group label. |

### Input Methods

| Name  | Type       | Description          |
| ----- | ---------- | -------------------- |
| blur  | () => void | Blur input element.  |
| focus | () => void | Focus input element. |

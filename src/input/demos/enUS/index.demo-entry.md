# Input

Many years ago, inputs were just punched cards.

## Demos

```demo
basic
size
round
icon
loading
password
disabled
clearable
autosize
pair
input-group
passively-activated
count
focus
event
input-props
```

## API

### Input Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| autofocus | `boolean` | `false` | Whether to autofocus. |
| autosize | `boolean \| { minRows?: number, maxRows?: number }` | `false` | Sizing property for when the input is of type `textarea`. e.g. `{ minRows: 1, maxRows: 3 }`. |
| clearable | `boolean` | `false` | Whether the input is clearable. |
| default-value | `string \| [string, string] \| null` | `null` | Default value when not manually set. |
| disabled | `boolean` | `false` | Whether to disable the input. |
| input-props | `HTMLInputAttributes` | `undefined` | The dom props of the input element inside the component. This is disabled if the `pair` property is true. For avaiable attributes, [see here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input). Warning：It won't override internal props with the same name (except `type`). |
| loading | `boolean` | `undefined` | Set loading state. If set (true/false), the element will always take up enough space for the loading indicator. |
| maxlength | `number` | `undefined` | Maximum input length. |
| minlength | `number` | `undefined` | Minimum input length. |
| pair | `boolean` | `false` | Whether to use the pairwise type input. |
| passively-activated | `boolean` | `false` | Whether to passively activate the input. |
| placeholder | `string \| [string, string]` | `undefined` | Placeholder of input. When `pair` is `true`, this is an array. |
| readonly | `boolean` | `false` | Set the readonly state. |
| round | `boolean` | `false` | Use a rounded input style. |
| rows | `number` | `3` | Rows property for when the input is of type `textarea`. |
| separator | `string` | `undefined` | The separator between pairwise inputs. |
| show-count | `boolean` | `false` | Whether to show the word count. |
| show-password-on | `'click' \| 'mousedown'` | `undefined` | The event to show the password. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Input size. |
| type | `'text' \| 'password' \| 'textarea'` | `'text'` | Input type. |
| value | `string \| [string, string] \| null` | `undefined` | Manually set the input value. When `pair` is `true`, this is an array. |
| on-blur | `() => void` | `undefined` | Callback triggered when the input is blurred. |
| on-change | `(value: string \| [string, string]) => void` | `undefined` | Callback triggered when native change event is fired. |
| on-clear | `() => void` | `undefined` | Callback triggered when the input is cleared. |
| on-focus | `() => void` | `undefined` | Callback triggered when the input is focussed on. |
| on-input | `(value: string \| [string, string]) => void` | `undefined` | Callback triggered when the input gets user input. |
| on-update:value | `(value: string \| [string, string]) => void` | `undefined` | Callback triggered when the input value changes. |

### Input Slots

| Name | Parameters | Description |
| --- | --- | --- |
| count | `(value: string)` | Word count. |
| prefix | `()` | Prefix content slot. |
| separator | `()` | The separator content of the input, only works when `pair` is true. This will take priority over the separator property. |
| suffix | `()` | Suffix content slot. |

### InputGroup Slots

| Name    | Parameters | Description                     |
| ------- | ---------- | ------------------------------- |
| default | `()`       | The content of the input group. |

### InputGroupLabel Slots

| Name    | Parameters | Description                           |
| ------- | ---------- | ------------------------------------- |
| default | `()`       | The content of the input group label. |

### Input Methods

| Name   | Type         | Description               |
| ------ | ------------ | ------------------------- |
| blur   | `() => void` | Blur the input element.   |
| focus  | `() => void` | Focus the input element.  |
| select | `() => void` | Select the input element. |

# Input

Many years ago, inputs were just punched cards.

## Demos

```demo
basic.vue
size.vue
round.vue
icon.vue
loading.vue
password.vue
disabled.vue
clearable.vue
autosize.vue
pair.vue
input-group.vue
passively-activated.vue
count.vue
focus.vue
event.vue
input-props.vue
status.vue
pattern.vue
graphemes.vue
```

## API

### Input Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| allow-input | `(value: string) => boolean` | `undefined` | Check the incoming value, if it returns `false`, input will not be accepted. | 2.30.4 |
| autofocus | `boolean` | `false` | Whether to autofocus. |  |
| autosize | `boolean \| { minRows?: number, maxRows?: number }` | `false` | Sizing property for when the input is of type `textarea`. e.g. `{ minRows: 1, maxRows: 3 }`. |  |
| clearable | `boolean` | `false` | Whether the input is clearable. |  |
| count-graphemes | `(value: string) => number` | `undefined` | Count graphemes of input value. If it's set, native `maxlength` and `minlength` won't be used. | 2.34.0 |
| default-value | `string \| [string, string] \| null` | `null` | Default value when not manually set. |  |
| disabled | `boolean` | `false` | Whether to disable the input. |  |
| input-props | `HTMLInputAttributes` | `undefined` | The dom props of the input element inside the component. This is disabled if the `pair` property is true. For avaiable attributes, [see here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input). Warning：It won't override internal props with the same name (except `type`). |  |
| loading | `boolean` | `undefined` | Set loading state. If set (true/false), the element will always take up enough space for the loading indicator. |  |
| maxlength | `number` | `undefined` | Maximum input length. |  |
| minlength | `number` | `undefined` | Minimum input length. |  |
| pair | `boolean` | `false` | Whether to use the pairwise type input. |  |
| passively-activated | `boolean` | `false` | Whether to passively activate the input. |  |
| placeholder | `string \| [string, string]` | `undefined` | Placeholder of input. When `pair` is `true`, this is an array. |  |
| readonly | `boolean` | `false` | Set the readonly state. |  |
| render-count | `(props: { value: string }) => void` | `undefined` | Render function of word count. | 2.32.2 |
| round | `boolean` | `false` | Use a rounded input style. |  |
| rows | `number` | `3` | Rows property for when the input is of type `textarea`. |  |
| separator | `string` | `undefined` | The separator between pairwise inputs. |  |
| show-count | `boolean` | `false` | Whether to show the word count. |  |
| show-password-on | `'click' \| 'mousedown'` | `undefined` | The event to show the password. |  |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Input size. |  |
| status | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status. | 2.25.0 |
| type | `'text' \| 'password' \| 'textarea'` | `'text'` | Input type. |  |
| value | `string \| [string, string] \| null` | `undefined` | Manually set the input value. When `pair` is `true`, this is an array. |  |
| on-blur | `() => void` | `undefined` | Callback triggered when the input is blurred. |  |
| on-change | `(value: string \| [string, string]) => void` | `undefined` | Callback triggered when native change event is fired. |  |
| on-clear | `() => void` | `undefined` | Callback triggered when the input is cleared. |  |
| on-focus | `() => void` | `undefined` | Callback triggered when the input is focussed on. |  |
| on-input | `(value: string \| [string, string]) => void` | `undefined` | Callback triggered when the input gets user input. |  |
| on-update:value | `(value: string \| [string, string]) => void` | `undefined` | Callback triggered when the input value changes. |  |

### Input Slots

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| clear-icon | `()` | Custom clear icon. | 2.29.0 |
| count | `(props: { value: string })` | Word count. |  |
| password-invisible-icon | `()` | Password toggle icon when password is invisible. | 2.27.0 |
| password-visible-icon | `()` | Password toggle icon when password is visible. | 2.27.0 |
| prefix | `()` | Prefix content slot. |  |
| separator | `()` | The separator content of the input, only works when `pair` is true. This will take priority over the separator property. |  |
| suffix | `()` | Suffix content slot. |  |

### InputGroup Slots

| Name    | Parameters | Description                     |
| ------- | ---------- | ------------------------------- |
| default | `()`       | The content of the input group. |

### InputGroupLabel Slots

| Name    | Parameters | Description                           |
| ------- | ---------- | ------------------------------------- |
| default | `()`       | The content of the input group label. |

### Input Methods

| Name | Type | Description | Version |
| --- | --- | --- | --- |
| blur | `() => void` | Blur the input element. |  |
| focus | `() => void` | Focus the input element. |  |
| select | `() => void` | Select the input element. |  |
| scrollTo | `(options: { left?: number, top?: number, behavior?: 'auto' \| 'smooth' }) => void` | Scroll To. | 2.32.0 |

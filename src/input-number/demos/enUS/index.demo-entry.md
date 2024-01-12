# Input Number

If you just want a number, this is for you.

## Demos

```demo
basic.vue
disabled.vue
parse.vue
precision.vue
event.vue
icon.vue
button-placement.vue
loading.vue
min-max.vue
size.vue
step.vue
validator.vue
show-button.vue
disable-keyboard.vue
change-timing.vue
status.vue
custom-icon.vue
```

## API

### InputNumber Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| autofocus | `boolean` | `false` | Whether to autofocus. | 2.26.1 |
| bordered | `boolean` | `true` | Whether to show a border. |  |
| button-placement | `'both' \| 'right'` | `'right'` | Placement of add & minus button. | 2.29.1 |
| clearable | `boolean` | `false` | Whether the input is clearable. |  |
| default-value | `number \| null` | `null` | Default value when not manually set. |  |
| disabled | `boolean` | `false` | Whether to disable the input. |  |
| format | `(value: number \| null) => string` | `undefined` | Method to format value. If it's set, `update-value-on-input` will be disabled. | 2.30.0 |
| input-props | `HTMLInputAttributes` | `undefined` | The dom props of the input element inside the component. For avaiable attributes, [see here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input). Warning：It won't override internal props with the same name (except `type`). | 2.37.0 |
| keyboard | `{ ArrowUp?: boolean, ArrowDown?: boolean }` | `{}` | Control the keyboard behavior. If you set corresponding to false, the keyboard behavior will be disabled. |  |
| loading | `boolean` | `undefined` | Set loading state. If set (true/false), the element will always take up enough space for the loading indicator. |  |
| max | `number` | `undefined` | The max value. |  |
| min | `number` | `undefined` | The min value. |  |
| parse | `(input: string) => number \| null` | `undefined` | Method to parse input string. If it's set, `update-value-on-input` will be disabled. | 2.30.0 |
| placeholder | `string` | `'Please Input'` | Placeholder. |  |
| precision | `number` | `undefined` | Precision of input value. If it's set, `update-value-on-input` will be disabled. | 2.30.0 |
| readonly | `boolean` | `false` | Whether it's readonly. |  |
| show-button | `boolean` | `true` | Whether to show increase/decrease buttons. |  |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | The size of input box. |  |
| status | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status. | 2.27.0 |
| step | `number` | `1` | The number which the current value is increased or decreased on key or button press. It can be an integer or a decimal. |  |
| update-value-on-input | `boolean` | `true` | Whether to change the value on input if the input value is valid. |  |
| validator | `(value) => boolean` | `undefined` | Setup custom validation. |  |
| value | `number \| null` | `undefined` | Manually set the input value. |  |
| on-blur | `(event: FocusEvent) => void` | `undefined` | Callback triggered when the input is blurred. |  |
| on-clear | `() => void` | `undefined` | Callback triggered when the input is cleared. |  |
| on-focus | `(event: FocusEvent) => void` | `undefined` | Callback triggered when the input is focussed on. |  |
| on-update:value | `(value: number \| null) => void` | `undefined` | Callback triggered when the input value changes. |  |

### InputNumber Slots

| Name       | Parameters | Description               | Version |
| ---------- | ---------- | ------------------------- | ------- |
| add-icon   | `()`       | icon of the add button.   | 2.28.1  |
| minus-icon | `()`       | icon of the minus button. | 2.28.1  |
| prefix     | `()`       | Prefix content slot.      |         |
| suffix     | `()`       | Suffix content slot.      |         |

### InputNumber Methods

| Name  | Type         | Description             |
| ----- | ------------ | ----------------------- |
| blur  | `() => void` | Blur the input number.  |
| focus | `() => void` | Focus the input number. |

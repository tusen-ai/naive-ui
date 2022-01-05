# Input Number

If you just want a number, this is for you.

## Demos

```demo
basic
disabled
event
icon
loading
min-max
size
step
validator
show-button
disable-keyboard
change-timing
```

## API

### InputNumber Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | Whether to show a border. |
| clearable | `boolean` | `false` | Whether the input is clearable. |
| default-value | `number \| null` | `null` | Default value when not manually set. |
| disabled | `boolean` | `false` | Whether to disable the input. |
| keyboard | `{ ArrowUp?: boolean, ArrowDown?: boolean }` | `{}` | Control the keyboard behavior. If you set corresponding to false, the keyboard behavior will be disabled. |
| loading | `boolean` | `undefined` | Set loading state. If set (true/false), the element will always take up enough space for the loading indicator. |
| max | `number` | `undefined` | The max value. |
| min | `number` | `undefined` | The min value. |
| placeholder | `string` | `'Please Input'` | Placeholder. |
| show-button | `boolean` | `true` | Whether to show increase/decrease buttons. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | The size of input box. |
| step | `number` | `1` | The number which the current value is increased or decreased on key or button press. It can be an integer or a decimal. |
| update-value-on-input | `boolean` | `true` | Whether to change the value on input if the input value is valid. |
| validator | `(value) => boolean` | `undefined` | Setup custom validation. |
| value | `number \| null` | `undefined` | Manually set the input value. |
| on-blur | `(event: FocusEvent) => void` | `undefined` | Callback triggered when the input is blurred. |
| on-clear | `() => void` | `undefined` | Callback triggered when the input is cleared. |
| on-focus | `(event: FocusEvent) => void` | `undefined` | Callback triggered when the input is focussed on. |
| on-update:value | `(value: number \| null) => void` | `undefined` | Callback triggered when the input value changes. |

### InputNumber Slots

| Name   | Parameters | Description          |
| ------ | ---------- | -------------------- |
| prefix | `()`       | Prefix content slot. |
| suffix | `()`       | Suffix content slot. |

### InputNumber Methods

| Name  | Type         | Description             |
| ----- | ------------ | ----------------------- |
| blur  | `() => void` | Blur the input number.  |
| focus | `() => void` | Focus the input number. |

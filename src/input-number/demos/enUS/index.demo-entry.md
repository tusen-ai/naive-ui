# Input Number

If you want just input number, use it.

## Demos

```demo
basic
disabled
event
min-max
size
step
validator
show-button
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | Whether to show border. |
| default-value | `number \| null` | `null` | Default value in uncontrolled mode. |
| disabled | `boolean` | `false` | Whether to disable the input. |
| max | `number` | `undefined` | The max value. |
| min | `number` | `undefined` | The min value. |
| placeholder | `string` | `'Please Input'` |  |
| show-button | `boolean` | `true` | Whether to show buttons. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | The size of input box. |
| step | `number` | `1` | The number to which the current value is increased or decreased. It can be an integer or decimal. |
| validator | `(value) => boolean` | `undefined` | Set up custom validation. |
| value | `number` | `undefined` | Value in controlled mode. |
| on-blur | `(event: FocusEvent) => void` | `undefined` | Callback when remove focus. |
| on-focus | `(event: FocusEvent) => void` | `undefined` | Callback when get focus. |
| on-update:value | `(value: number) => void` | `undefined` | Callback when component value changes. |

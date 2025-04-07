# InputOpt

Input Otp is used to enter one time passwords.

## Demos

```demo
basic.vue
status.vue
mask.vue
template.vue
size.vue
form.vue
pattern.vue
rtl-debug.vue
```

## API

### InputOpt Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| disabled | `boolean` | `false` | When present, it specifies that the component should be disabled. |  |
| mask | `boolean` | `false` | Mask pattern. |  |
| readonly | `boolean` | `false` | When present, it specifies that an input field is read-only. |  |
| length | `number` | `6` | Number of characters to initiate. |  |
| defaultValue | `string` |  | The default value for the input when not controlled by `value` . |  |
| value | `string` |  | Specifies whether a inputotp should be checked or not. |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Defines the size of the component. |
| status | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status. |  |
| allow-input | `(value: string) => boolean` | `undefined` | Check the incoming value, if it returns `false`, input will not be accepted. |  |
| on-input | `(char: string, index: number) => void` | `undefined` | Callback triggered when the input gets user input. |  |
| on-blur | `() => void` | `undefined` | Callback triggered when the input is blurred. |  |
| on-change | `(value: string \| [string, string]) => void` | `undefined` | Callback triggered when native change event is fired. |  |
| on-finish | `(value: string) => void` | `undefined` | Callback triggered after the input boxes are filled in |  |
| on-update:value | `(value: string) => void` | `undefined` | Callback triggered when native change event is fired. |  |

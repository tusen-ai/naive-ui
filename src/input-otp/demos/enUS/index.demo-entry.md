# Input OTP

InputOTP is used to enter one time password.

Available since `NEXT_VERSION`.

## Demos

```demo
basic.vue
status.vue
mask.vue
template.vue
size.vue
form.vue
pattern.vue
```

## API

### InputOTP Props

| Name | Type | Type Alais | Default | Description | Version |
| --- | --- | --- | --- | --- | --- |
| allow-input | `(char: string, index: number, currentValue: string[]) => boolean` | `InputOptAllowInput` | `undefined` | Check the incoming value, if it returns `false`, input will not be accepted. | NEXT_VERSION |
| default-value | `string[]` |  | `[]` | Default value. | NEXT_VERSION |
| disabled | `boolean` |  | `false` | Whether the component is disabled. | NEXT_VERSION |
| gap | `string \| number` |  | `undefined` | Gap between different input. If not specified, the default styling would be applied. | NEXT_VERSION |
| length | `number` |  | `6` | Number of characters to initiate. | NEXT_VERSION |
| mask | `boolean` |  | `false` | Whether to enable password mode. | NEXT_VERSION |
| placeholder | `string` |  | `''` | Input placeholder. | NEXT_VERSION |
| readonly | `boolean` |  | `false` | Whether the component is readonly. | NEXT_VERSION |
| size | `'small' \| 'medium' \| 'large'` | `InputOtpSize` | `'medium'` | Size of the component. | NEXT_VERSION |
| status | `'success' \| 'warning' \| 'error'` | `FormValidationStatus` | `undefined` | The validation status of the component. | NEXT_VERSION |
| value | `string \| null` |  | `undefined` | Value of the component (in controlled mode). | NEXT_VERSION |
| on-blur | `(event: FocusEvent, index: number) => void` | `InputOtpOnBlur` | `undefined` | Callback fired when the focus is out of the component. | NEXT_VERSION |
| on-finish | `(value: string[]) => void` | `InputOtpOnFinish` | `undefined` | Callback fired when all child inputs are settled. | NEXT_VERSION |
| on-focus | `(event: FocusEvent, index: number) => void` | `InputOtpOnFocus` | `undefined` | Callback fired when the focus is moved from outside to the component. | NEXT_VERSION |
| on-update:value | `(value: string[], meta: { diff: string, index: number, source: 'input' \| 'delete' \| 'paste' }) => void` | `InputOtpOnUpdateValue`, `InputOtpOnUpdateValueMeta`, `InputOtpOnUpdateValueMetaSource` | `undefined` | Callback fired when user inputs value. `meta.index` is the start index of the value change.`meta.diff` is the content that changes. `meta.source` is the reason of the value change. If reason is `'delete'`, `meta.diff` is `''`. If reason is `'paste'`, `meta.diff` is the final accepted part of the paste content. | NEXT_VERSION |

### InputOTP Slots

| Name | Parameters | Type Alias | Description | Version |
| --- | --- | --- | --- | --- |
| default | `(props: InputProps & { index: number, ref: (inst: InputInst) => void })` | `InputOtpDefaultSlot` | Input area. | NEXT_VERSION |

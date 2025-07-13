# Input OTP

InputOTP is used to enter one time password.

Available since `2.41.1`.

## Demos

```demo
basic.vue
status.vue
mask.vue
template.vue
block.vue
size.vue
form.vue
pattern.vue
```

## API

### InputOTP Props

| Name | Type | Type Alais | Default | Description | Version |
| --- | --- | --- | --- | --- | --- |
| allow-input | `(char: string, index: number, currentValue: string[]) => boolean` | `InputOtpAllowInput` | `undefined` | Check the incoming value, if it returns `false`, input will not be accepted. | 2.41.1 |
| block | `boolean` |  | `false` | Whether to fit its width to its parent's width. | 2.42.0 |
| default-value | `string[]` |  | `[]` | Default value. | 2.41.1 |
| disabled | `boolean` |  | `false` | Whether the component is disabled. | 2.41.1 |
| gap | `string \| number` |  | `undefined` | Gap between different input. If not specified, the default styling would be applied. | 2.41.1 |
| length | `number` |  | `6` | Number of characters to initiate. | 2.41.1 |
| mask | `boolean` |  | `false` | Whether to enable password mode. | 2.41.1 |
| placeholder | `string` |  | `''` | Input placeholder. | 2.41.1 |
| readonly | `boolean` |  | `false` | Whether the component is readonly. | 2.41.1 |
| size | `'small' \| 'medium' \| 'large'` | `InputOtpSize` | `'medium'` | Size of the component. | 2.41.1 |
| status | `'success' \| 'warning' \| 'error'` | `FormValidationStatus` | `undefined` | The validation status of the component. | 2.41.1 |
| value | `string \| null` |  | `undefined` | Value of the component (in controlled mode). | 2.41.1 |
| on-blur | `(event: FocusEvent, index: number) => void` | `InputOtpOnBlur` | `undefined` | Callback fired when the focus is out of the component. | 2.41.1 |
| on-finish | `(value: string[]) => void` | `InputOtpOnFinish` | `undefined` | Callback fired when all child inputs are settled. | 2.41.1 |
| on-focus | `(event: FocusEvent, index: number) => void` | `InputOtpOnFocus` | `undefined` | Callback fired when the focus is moved from outside to the component. | 2.41.1 |
| on-update:value | `(value: string[], meta: { diff: string, index: number, source: 'input' \| 'delete' \| 'paste' }) => void` | `InputOtpOnUpdateValue`, `InputOtpOnUpdateValueMeta`, `InputOtpOnUpdateValueMetaSource` | `undefined` | Callback fired when user inputs value. `meta.index` is the start index of the value change.`meta.diff` is the content that changes. `meta.source` is the reason of the value change. If reason is `'delete'`, `meta.diff` is `''`. If reason is `'paste'`, `meta.diff` is the final accepted part of the paste content. | 2.41.1 |

### InputOTP Slots

| Name | Parameters | Type Alias | Description | Version |
| --- | --- | --- | --- | --- |
| default | `(props: InputProps & { index: number, ref: (inst: InputInst) => void })` | `InputOtpDefaultSlot` | Input area. | 2.41.1 |

### InputOTP Methods

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| focusOnChar | `(charIndex: number) => void` | Focus on a certain input box. | NEXT_VERSION |

# 验证码 InputOtp

输入一次性密码。

自 `2.38.2` 开始提供。

## 演示

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

### InputOtp Props

| 名称 | 类型 | 类型别名 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- | --- |
| allow-input | `(char: string, index: number, currentValue: string[]) => boolean` | `InputOptAllowInput` | `undefined` | 校验当前的输入是否合法，如果返回 `false` 输入框便不会响应此次的输入 | NEXT_VERSION |
| default-value | `string[]` |  | `[]` | 默认值 | NEXT_VERSION |
| disabled | `boolean` |  | `false` | 是否禁用 | NEXT_VERSION |
| gap | `string \| number` |  | `undefined` | 不同输入框之间的距离，如果不设定将使用默认值 | NEXT_VERSION |
| length | `number` |  | `6` | 验证码的长度，根据长度渲染对应个数的输入框 | NEXT_VERSION |
| mask | `boolean` |  | `false` | 是否是密码模式 | NEXT_VERSION |
| placeholder | `string` |  | `''` | 输入的占位内容 | NEXT_VERSION |
| readonly | `boolean` |  | `false` | 是否只读 | NEXT_VERSION |
| size | `'small' \| 'medium' \| 'large'` | `InputOtpSize` | `'medium'` | 输入框尺寸 | NEXT_VERSION |
| status | `'success' \| 'warning' \| 'error'` | `FormValidationStatus` | `undefined` | 验证状态 | NEXT_VERSION |
| value | `string \| null` | `undefined` |  | 验证码输入框的值，受控模式 | NEXT_VERSION |
| on-blur | `(event: FocusEvent, index: number) => void` | `InputOtpOnBlur` | `undefined` | 从一个输入框被聚焦触发，到没有任何一个输入框被聚焦的回调 | NEXT_VERSION |
| on-finish | `(value: string[]) => void` | `InputOtpOnFinish` | `undefined` | 完成输入的回调 | NEXT_VERSION |
| on-focus | `(event: FocusEvent, index: number) => void` | `InputOtpOnFocus` | `undefined` | 从没有任何一个输入框被聚焦，到有一个输入框被聚焦触发的回调 | NEXT_VERSION |
| on-update:value | `(value: string[], meta: { diff: string, index: number, source: 'input' \| 'delete' \| 'paste' }) => void` | `InputOtpOnUpdateValue`, `InputOtpOnUpdateValueMeta`, `InputOtpOnUpdateValueMetaSource` | `undefined` | 输入值时触发的回调，`meta.index` 为变更开始的 index，`meta.diff` 是变更的内容，`meta.source` 为变更的原因，当原因为 `'delete'` 时，`meta.diff` 为 `''`，当原因为 `'paste'` 时，`meta.diff` 最终粘贴进入的内容 | NEXT_VERSION |

### InputOtp Slots

| 名称 | 参数 | 类型别名 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| default | `(props: InputProps & { index: number, ref: (inst: InputInst) => void })` | `InputOtpDefaultSlot` | 输入区域 | NEXT_VERSION |

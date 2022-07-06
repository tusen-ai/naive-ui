# Dynamic Tags

Turn tags to inputs and back again.

## Demos

```demo
basic.vue
max.vue
form.vue
slot.vue
render-tag.vue
option-format.vue
```

## API

### DynamicTags Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| closable | `boolean` | `true` | Whether the tag is closable. |  |
| color | `{ color?: string, borderColor?: string, textColor?: string }` | `undefined` | Color of the tag. Note: it will override the color set by `type`. |  |
| default-value | `string[]` | `[]` | Default value. |  |
| disabled | `boolean` | `false` | Whether the tag is disabled. |  |
| input-props | `InputProps` | `undefined` | Props of internal `n-input`. | 2.25.0 |
| input-style | `string \| Object` | `undefined` | Customize the style of the input. |  |
| max | `number` | `undefined` | Maximum number of tags. |  |
| round | `boolean` | `false` | Whether the tag has rounded corners. |  |
| render-tag | `((tag: string, index: number) => VNodeChild) \| ((tag: { label: string, value: string }, index: number) => VNodeChild)` | `undefined` | custom render tag. | NEXT_VERSION |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the tag. |  |
| tag-style | `string \| Object` | `undefined` | Customize the style of the tag. |  |
| type | `'default' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | Type of the tag. |  |
| value | `string[]` | `undefined` | Value if manually set. |  |
| on-create | `((label: string) => string) \| ((label: string) => ({ label: string, value: string }))` | `label => label` | Create derived value from input. | NEXT_VERSION |
| on-update:value | `(value: boolean) => void` | `undefined` | Callback when the component's value changes. |  |

### DynamicTags Slots

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| input | `(info: { submit: (value: any) => void, deactivate: () => void })` | Custom element(s) to replace the regular input. | `deactivate` 2.26.2 |
| trigger | `(info: { activate: () => void, disabled: boolean })` | The element or component that triggers the tag to switch to an input. |  |

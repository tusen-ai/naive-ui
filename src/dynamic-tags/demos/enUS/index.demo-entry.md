# Dynamic Tags

Make tags inputable.

## Demos

```demo
basic
max
form
slot
```

## API

### DynamicTags Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| closable | `boolean` | `true` | Whether the tag is closable. |
| color | `{ color?: string, borderColor?: string, textColor?: string }` | `undefined` | Color of the tag, it will overrides type's color. |
| default-value | `string[]` | `[]` | Default value in uncontrolled mode. |
| disabled | `boolean` | `false` | Whether the tag is disabled. |
| input-style | `string \| Object` | `undefined` | Customize the style of the input. |
| max | `number` | `undefined` | Maximum number of tags. |
| round | `boolean` | `false` | Whether the tag has round corner. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the tag. |
| tag-style | `string \| Object` | `undefined` | Customize the style of the tag. |
| type | `'default' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | Type of the tag. |
| value | `string[]` | `undefined` | Value in controlled mode. |
| on-update:value | `(value: boolean) => void` | `undefined` | Callback when the component's value changes. |

### DynamicTags Slots

| Name | Parameters | Description |
| --- | --- | --- |
| input | `(info: { submit: (value: any) => void, })` | Custom input elements, supplied by the user. |
| trigger | `(info: { activate: () => void, disabled: boolean })` | The element or component that triggers input. |

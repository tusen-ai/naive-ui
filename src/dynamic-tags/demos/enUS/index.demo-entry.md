# Dynamic Tags

Make tags inputable.

## Demos

```demo
basic
form
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| closable | `boolean` | `true` | Whether the tag is closable. |
| color | `string` | `undefined` | color of the tag, if set `type` is invalid. |
| default-value | `string[]` | `[]` | Default value in uncontrolled mode. |
| disabled | `boolean` | `false` | Whether the tag is disabled. |
| input-style | `string \| Object` | `undefined` | Customize the style of the input. |
| round | `boolean` | `false` | Whether the tag has round corner. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the tag. |
| tag-style | `string \| Object` | `undefined` | Customize the style of the tag. |
| text-color | `string` | `undefined` | Text color of the tag. |
| type | `'default' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | Type of the tag. |
| value | `string[]` | `undefined` | Value in controlled mode. |
| on-update:value | `(value: boolean) => void` | `undefined` | Callback when the component's value changes. |

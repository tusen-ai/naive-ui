# Tag

Tags are great for showing attributes; and sometimes toggle options.

## Demos

```demo
basic
closable
disabled
size
checkable
shape
color
avatar
```

## API

### Tag Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | Whether the tag has border. |
| checkable | `boolean` | `false` | Whether the tag is checkable. Note: this nullifies the type property. |
| checked | `boolean` | `false` | Whether the tag is checked. Note: used with `checkable`. |
| closable | `boolean` | `false` | Whether the tag shows a close button. |
| color | `{ color?: string, borderColor?: string, textColor?: string }` | `undefined` | Color of the tag. Note: this will override the type property's color. |
| disabled | `boolean` | `false` | Whether the tag is disabled. |
| round | `boolean` | `false` | Whether the tag has rounded corners. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the tag. |
| type | `'default' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | Type of the tag. |
| on-close | `(e: MouseEvent) => void` | `undefined` | Close clicked callback. |
| on-update:checked | `(value: boolean) => void` | `undefined` | Checked status change callback. |

### Tag Slots

| Name    | Parameters | Description        |
| ------- | ---------- | ------------------ |
| avatar  | `()`       | Image information. |
| default | `()`       | Tag's content.     |

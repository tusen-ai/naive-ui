# Tag

Tags are great for showing attributes; and sometimes toggle options.

## Demos

```demo
basic.vue
bordered.vue
closable.vue
disabled.vue
size.vue
checkable.vue
shape.vue
color.vue
avatar.vue
icon.vue
```

## API

### Tag Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| bordered | `boolean` | `true` | Whether the tag has border. |  |
| checkable | `boolean` | `false` | Whether the tag is checkable. Note: this nullifies the type property. |  |
| checked | `boolean` | `false` | Whether the tag is checked. Note: used with `checkable`. |  |
| closable | `boolean` | `false` | Whether the tag shows a close button. |  |
| color | `{ color?: string, borderColor?: string, textColor?: string }` | `undefined` | Color of the tag. Note: this will override the type property's color. |  |
| disabled | `boolean` | `false` | Whether the tag is disabled. |  |
| round | `boolean` | `false` | Whether the tag has rounded corners. |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the tag. |  |
| strong | `boolean` | `false` | Whether to use strong text | 2.30.0 |
| trigger-click-on-close | `boolean` | `false` | Whether the tag triggers click on close. | 2.32.2 |
| type | `'default' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | Type of the tag. |  |
| on-close | `(e: MouseEvent) => void` | `undefined` | Close clicked callback. |  |
| on-update:checked | `(value: boolean) => void` | `undefined` | Checked status change callback. |  |

### Tag Slots

| Name    | Parameters | Description    | Version |
| ------- | ---------- | -------------- | ------- |
| avatar  | `()`       | Tag'a avatar.  |         |
| default | `()`       | Tag's content. |         |
| icon    | `()`       | Tag'a icon.    | 2.30.0  |

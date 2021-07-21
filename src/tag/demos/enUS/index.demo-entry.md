# Tag

Always it's for showing attribute. Sometimes it's for toggle options.

## Demos

```demo
basic
closable
disabled
size
checkable
shape
```

## Props

### Tag

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | Whether the tag has border. |
| checkable | `boolean` | `false` | Whether the tag is checkable. |
| checked | `boolean` | `false` | Whether the tag is checked. |
| closable | `boolean` | `false` | Whether the tag is closable. |
| disabled | `boolean` | `false` | Whether the tag is disabled. |
| round | `boolean` | `false` | Whether the tag has round corner. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the tag. |
| type | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | Type of the tag. |
| on-click | `(e: MouseEvent) => void` | `undefined` | Callback on click. |
| on-update:checked | `(value: boolean) => void` | `undefined` | Callback on checked status changes. |

## Slots

| Name    | Parameters | Description    |
| ------- | ---------- | -------------- |
| default | `()`       | Tag's content. |

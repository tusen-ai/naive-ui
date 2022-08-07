# Popconfirm

A confirm, poped.

## Demos

```demo
basic.vue
custom-action.vue
custom-icon.vue
event.vue
no-icon.vue
actions.vue
```

## API

### Popconfirm Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| negative-button-props | `ButtonProps` | `undefined` | Cancel button's DOM props | 2.27.0 |
| negative-text | `string \| null` | `'Cancel'` | Cancel button text. | 2.28.0 |
| positive-button-props | `ButtonProps` | `undefined` | Confirm button's DOM props | 2.27.0 |
| positive-text | `string \| null` | `'Confirm'` | Confirm button text. | 2.28.0 |
| show-icon | `boolean` | `true` | Whether to show icon. |  |
| on-positive-click | `() => boolean \| Promise<boolean> \| any` | `undefined` | Callback of confirmation. |  |
| on-negative-click | `() => boolean \| Promise<boolean> \| any` | `undefined` | Callback of cancel. |  |

For more props, see [popover](popover#Popover-Props).

### Popconfirm Slots

| Name    | Parameters | Description         |
| ------- | ---------- | ------------------- |
| action  | `()`       | Custom action.      |
| default | `()`       | Popconfirm content. |
| icon    | `()`       | Popconfirm icon.    |

### Popconfirm Methods

See [popover](popover#Popover-Methods).

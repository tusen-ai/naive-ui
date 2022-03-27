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
| negative-button-props | `ButtonProps` | `undefined` | Cancel button's DOM props | NEXT_VERSION |
| negative-text | `string` | `'Cancel'` | Cancel button text. |  |
| positive-button-props | `ButtonProps` | `undefined` | Confirm button's DOM props | NEXT_VERSION |
| positive-text | `string` | `'Confirm'` | Confirm button text. |  |
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

# Popconfirm

A confirm, poped.

## Demos

```demo
basic
custom-action
custom-icon
event
no-icon
actions
```

## API

### Popconfirm Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| negative-text | `string` | `'Cancel'` | Cancel button text. |
| positive-text | `string` | `'Confirm'` | Confirm button text. |
| show-icon | `boolean` | `true` | Whether to show icon. |
| on-positive-click | `() => boolean \| Promise<boolean> \| any` | `undefined` | Callback of confirmation. |
| on-negative-click | `() => boolean \| Promise<boolean> \| any` | `undefined` | Callback of cancel. |

For more props, see [popover](popover#Popover-Props).

### Popconfirm Slots

| Name    | Parameters | Description         |
| ------- | ---------- | ------------------- |
| action  | `()`       | Custom action.      |
| default | `()`       | Popconfirm content. |
| icon    | `()`       | Popconfirm icon.    |

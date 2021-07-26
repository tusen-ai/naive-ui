# Popconfirm

A confirm, poped.

## Demos

```demo
basic
custom-action
custom-icon
event
no-icon
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| negative-text | `string` | `'Cancel'` | Cancel button text. |
| positive-text | `string` | `'Confirm'` | Confirm button text. |
| show-icon | `boolean` | `true` | Whether to show icon. |
| on-positive-click | `() => boolean \| Promise<boolean> \| any` | `undefined` | Click the callback function of the confirm button. |
| on-negative-click | `() => boolean \| Promise<boolean> \| any` | `undefined` | Callback function for clicking the cancel button. |

For more props, see [popover](popover#Props).

## Slots

| Name    | Parameters | Description         |
| ------- | ---------- | ------------------- |
| action  | `()`       | Custom action.      |
| default | `()`       | Popconfirm content. |
| icon    | `()`       | Popconfirm icon.    |

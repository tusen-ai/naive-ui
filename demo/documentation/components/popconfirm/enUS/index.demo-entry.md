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
| negative-text | `string` | `'Cancel'` |  |
| positive-text | `string` | `'Confirm'` |  |
| show-icon | `boolean` | `true` |  |
| on-positive-click | `() => boolean \| Promise<boolean> \| any` | `undefined` |  |
| on-negative-click | `() => boolean \| Promise<boolean> \| any` | `undefined` |  |

For more props, see [popover](n-popover#Props).

## Slots

| Name    | Parameters | Description |
| ------- | ---------- | ----------- |
| action  | `()`       |             |
| default | `()`       |             |
| icon    | `()`       |             |

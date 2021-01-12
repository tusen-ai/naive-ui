# Alert

According to my experience, the most frequent usage of it may be requesting for disabling AdBlocks.

## Demos

```demo
basic
closable
icon
no-icon
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| closable | `boolean` | `false` |  |
| show-icon | `boolean` | `true` |  |
| title | `string` | `undefined` |  |
| type | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` |  |
| on-after-leave | `Function` | `undefined` |  |
| on-close | `() => boolean \| Promise<boolean> \| any` | `() => true` |  |

## Slots

| Name    | Parameters | Description |
| ------- | ---------- | ----------- |
| default | `()`       |             |
| header  | `()`       |             |
| icon    | `()`       |             |

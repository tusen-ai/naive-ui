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
| closable | `boolean` | `false` | Can the alert information be turned off. |
| show-icon | `boolean` | `true` | Whether to show the icon of alert. |
| title | `string` | `undefined` | title information of alert. |
| type | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | alert type. |
| on-after-leave | `Function` | `undefined` | Callback function executed when the alert disappears. |
| on-close | `() => boolean \| Promise<boolean> \| any` | `() => true` | The callback function executed when the close icon is clicked. |

## Slots

| Name    | Parameters | Description                                   |
| ------- | ---------- | --------------------------------------------- |
| default | `()`       | The content that alert fills by default.      |
| header  | `()`       | The content filled in the alert header.       |
| icon    | `()`       | The content filled in the icon part of alert. |

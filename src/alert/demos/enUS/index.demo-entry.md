# Alert

According to my experience, the most frequent usage of it may be requesting for disabling AdBlocks.

## Demos

```demo
basic.vue
bordered.vue
closable.vue
icon.vue
no-icon.vue
```

## API

### Alert Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| bordered | `boolean` | `true` | Whether the alert can show border. | 2.32.2 |
| closable | `boolean` | `false` | Whether the alert can be closed. |  |
| show-icon | `boolean` | `true` | Whether to show the icon of alert. |  |
| title | `string` | `undefined` | Title of the alert. |  |
| type | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | Alert type. |  |
| on-after-leave | `Function` | `undefined` | Callback function executed when the alert disappears. |  |
| on-close | `() => boolean \| Promise<boolean> \| any` | `() => true` | The callback function executed when the close icon is clicked. |  |

### Alert Slots

| Name    | Parameters | Description                             |
| ------- | ---------- | --------------------------------------- |
| default | `()`       | The content of the alert.               |
| header  | `()`       | The content placed in the alert header. |
| icon    | `()`       | Icon displayed in the alert.            |

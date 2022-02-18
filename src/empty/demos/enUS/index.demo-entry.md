# Empty

E<span style="opacity: 0;">mpt</span>y.

## Demos

```demo
basic.vue
icon.vue
size.vue
```

## API

### Empty Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| description | `string` | `'No Data'` | Description of the empty. |
| show-description | `boolean` | `true` | Whether to show description of empty. |
| show-icon | `boolean` | `true` | Whether to show icon of empty. |
| size | `'small' \| 'medium' \| 'large' \| 'huge'` | `'medium'` | Empty's size. |

### Empty Slots

| Name    | Parameters | Description                  |
| ------- | ---------- | ---------------------------- |
| default | `()`       | In place of description prop |
| extra   | `()`       | Extra content.               |
| icon    | `()`       | Custom icon.                 |

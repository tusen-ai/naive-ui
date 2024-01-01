# Split

The flexible layout tool provides the possibility of customizing the interface layout.

Available since `2.36.0`.

## Demos

```demo
basic.vue
vertical.vue
nest.vue
event.vue
slot.vue
```

## API

### Split Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| default-size | `number` | `0.5` | Default split size, 0-1 is a percentage. | 2.36.0 |
| disabled | `boolean` | `false` | Whether to disable the split. | 2.36.0 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | The direction of the split. | 2.36.0 |
| min | `number` | `0` | The minimum threshold for splitting, 0-1 is a percentage. | 2.36.0 |
| max | `number` | `1` | The maximum split threshold, 0-1 is a percentage. | 2.36.0 |
| resize-trigger-size | `number` | `3` | Size of the resize trigger. | 2.36.0 |

### Split Slots

| Name           | Parameters | Description               | Version |
| -------------- | ---------- | ------------------------- | ------- |
| 1              | `()`       | The first panel content.  | 2.36.0  |
| 2              | `()`       | The Second panel content. | 2.36.0  |
| resize-trigger | `()`       | Split bar content.        | 2.36.0  |

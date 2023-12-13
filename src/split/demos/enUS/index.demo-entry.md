# Split

The flexible layout tool provides the possibility of customizing the interface layout.

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
| default-size | `number` | `0.5` | Default split size, 0-1 is a percentage. | NEXT_VERSION |
| disabled | `boolean` | `false` | Whether to disable the split. | NEXT_VERSION |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | The direction of the split. | NEXT_VERSION |
| min | `number` | `0` | The minimum threshold for splitting, 0-1 is a percentage. | NEXT_VERSION |
| max | `number` | `1` | The maximum split threshold, 0-1 is a percentage. | NEXT_VERSION |
| resize-trigger-size | `number` | `3` | Size of the resize trigger. | NEXT_VERSION |

### Split Slots

| Name           | Parameters | Description               | Version      |
| -------------- | ---------- | ------------------------- | ------------ |
| 1              | `()`       | The first panel content.  | NEXT_VERSION |
| 2              | `()`       | The Second panel content. | NEXT_VERSION |
| resize-trigger | `()`       | Split bar content.        | NEXT_VERSION |

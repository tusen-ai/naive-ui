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
controlled.vue
```

## API

### Split Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| default-size | `string \| number` | `0.5` | Default split size, 0~1 is a percentage or pixel value. | 2.36.0 |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | The direction of the split. | 2.36.0 |
| disabled | `boolean` | `false` | Whether to disable the split. | 2.36.0 |
| max | `string \| number` | `1` | The maximum split threshold, 0~1 is a percentage or pixel value. | 2.36.0 |
| min | `string \| number` | `0` | The minimum threshold for splitting, 0~1 is a percentage or pixel value. | 2.36.0 |
| panel1-class | `string` | `undefined` | The class name of the first panel. | NEXT_VERSION |
| panel1-style | `Object \| string` | `undefined` | The Style of the first panel | NEXT_VERSION |
| panel2-class | `string` | `undefined` | The class name of the second panel. | NEXT_VERSION |
| panel2-style | `Object \| string` | `undefined` | The Style of the second panel | NEXT_VERSION |
| resize-trigger-size | `number` | `3` | Size of the resize trigger. | 2.36.0 |
| size | `string \| number` | `undefined` | Split is the controlled split size, with 0~1 representing the percentage or pixel value. | 2.38.0 |
| watch-props | `Array<'defaultSize'>` | `undefined` | Default prop names that needed to be watched. Components will be updated after the prop is changed. Note: the `watch-props` itself is not reactive. | 2.38.0 |
| on-update:size | `(value: string \| number) => void` | `undefined` | Callback fired on `size` changes. | 2.38.0 |

### Split Slots

| Name           | Parameters | Description               | Version |
| -------------- | ---------- | ------------------------- | ------- |
| 1              | `()`       | The first panel content.  | 2.36.0  |
| 2              | `()`       | The Second panel content. | 2.36.0  |
| resize-trigger | `()`       | Split bar content.        | 2.36.0  |

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
pixel-value.vue
snap-offset.vue
mutil-panel.vue
mutil-panel-nest.vue
```

## API

### Split Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| default-size | `number \| string \| (string \| number)[]` | `0.5` | Default split size, when it's `number` it should in 0 ~ 1, when it's `string` it should be formatted in `${number}px`. | 2.36.0, `string` 2.38.2, `(string \| number)[]` NEXT_VERSION |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | The direction of the split. | 2.36.0 |
| disabled | `boolean` | `false` | Whether to disable the split. | 2.36.0 |
| max | `string \| number \| (string \| number)[]` | `1` | The maximum split threshold, when it's `number` it should in 0 ~ 1, when it's `string` it should be formatted in `${number}px`. | 2.36.0, `string` 2.38.2,`(string \| number)[]` NEXT_VERSION |
| min | `string \| number \| (string \| number)[]` | `0` | The minimum threshold for splitting, when it's `number` it should in 0 ~ 1, when it's `string` it should be formatted in `${number}px`. | 2.36.0, `string` 2.38.2,`(string \| number)[]` NEXT_VERSION |
| pane1-class | `string` | `undefined` | The class name of the first pane. | 2.38.2 |
| pane1-style | `Object \| string` | `undefined` | The Style of the first pane | 2.38.2 |
| pane2-class | `string` | `undefined` | The class name of the second pane. | 2.38.2 |
| pane2-style | `Object \| string` | `undefined` | The Style of the second pane | 2.38.2 |
| resize-trigger-size | `number` | `3` | Size of the resize trigger. | 2.36.0 |
| size | `string \| number \| (string \| number)[]` | `undefined` | Split is the controlled split size, when it's `number` it should in 0 ~ 1, when it's `string` it should be formatted in `${number}px`. | 2.38.0, `string` 2.38.2,`(string \| number)[]` NEXT_VERSION |
| snap-to-center | `boolean` | `false` | Whether to enable center snapping. | NEXT_VERSION |
| snap-offset | `number` | `undefined` | The snap offset of the split. | NEXT_VERSION |
| watch-props | `Array<'defaultSize'>` | `undefined` | Default prop names that needed to be watched. Components will be updated after the prop is changed. Note: the `watch-props` itself is not reactive. | 2.38.0 |
| on-drag-start | `(e: Event) => void` | `undefined` | Callback function when drag start. | 2.36.0 |
| on-drag-move | `(e: Event) => void` | `undefined` | Callback function when dragging. | 2.36.0 |
| on-drag-end | `(e: Event) => void` | `undefined` | Callback function when drag end. | 2.36.0 |
| on-update:size | `(value: string \| number) => void` | `undefined` | Callback fired on `size` changes. If `props.value` or `props.defaultValue` is `string`, `value` is `string`. | 2.38.0, `string` 2.38.2 |

### Split Slots

| Name           | Parameters | Description              | Version      |
| -------------- | ---------- | ------------------------ | ------------ |
| 1              | `()`       | The first pane content.  | 2.36.0       |
| 2              | `()`       | The Second pane content. | 2.36.0       |
| \*             | `()`       | The \* pane content.     | NEXT_VERSION |
| resize-trigger | `()`       | Split bar content.       | 2.36.0       |

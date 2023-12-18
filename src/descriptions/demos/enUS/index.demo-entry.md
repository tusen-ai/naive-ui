# Descriptions

<!--single-column-->

Display items of content easily.

## Demos

```demo
basic.vue
columns.vue
span.vue
placement.vue
bordered.vue
size.vue
```

## API

### Descriptions Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to display border. |  |
| column | `number` | `3` | Total columns. |  |
| content-class | `string` | `undefined` | Class of the item content. | 2.36.0 |
| content-style | `Object \| string` | `undefined` | Style of the item content. |  |
| label-align | `'center' \| 'left' \| 'right'` | `'left'` | Label align. |  |
| label-placement | `'top' \| 'left'` | `'top'` | Label placement. |  |
| label-class | `string` | `undefined` | Class of the item label. | 2.36.0 |
| label-style | `Object \| string` | `undefined` | Style of the item label. |  |
| separator | `string` | `':'` | Separator, only work when `label-placement` is `left` and 　`bordered` is `false`.　 |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the description. |  |
| title | `string` | `undefined` | Title of the description. |  |

### DescriptionItem Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content-class | `string` | `undefined` | Class of the item content. |
| content-style | `Object \| string` | `undefined` | Style of the item content. |
| label | `string` | `undefined` | Label of the item. |
| label-class | `string` | `undefined` | Class of the item label. |
| label-style | `Object \| string` | `undefined` | Style of the item label. |
| span | `number` | `1` | Column span of the item. |

### Descriptions Slots

| Name    | Parameters | Description     |
| ------- | ---------- | --------------- |
| default | `()`       | Content.        |
| header  | `()`       | Header content. |

### DescriptionItem Slots

| Name    | Parameters | Description   |
| ------- | ---------- | ------------- |
| default | `()`       | Item content. |
| label   | `()`       | Item label.   |

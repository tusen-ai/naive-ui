# Descriptions

<!--single-column-->

Display items of content easily.

## Demos

```demo
basic
columns
span
placement
bordered
size
```

## Props

### Descriptions Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to display border. |
| column | `number` | `3` | Total columns. |
| content-style | `Object \| string` | `undefined` | Style of the item content. |
| label-align | `'center' \| 'left' \| 'right'` | `'left'` | Label align. |
| label-placement | `'top' \| 'left'` | `'top'` | Label placement. |
| label-style | `Object \| string` | `undefined` | Style of the item label. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the description. |
| title | `string` | `undefined` | Title of the description. |

### Description Item Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content-style | `Object \| string` | `undefined` | Style of the item content. |
| label | `string` | `undefined` | Label of the item. |
| label-style | `Object \| string` | `undefined` | Style of the item label. |
| span | `number` | `1` | Column span of the item. |

## Slots

### Descriptions Slots

| Name    | Parameters | Description     |
| ------- | ---------- | --------------- |
| default | `()`       | Content.        |
| header  | `()`       | Header content. |

### Description Item Slots

| Name    | Parameters | Description   |
| ------- | ---------- | ------------- |
| default | `()`       | Item content. |
| label   | `()`       | Item label.   |

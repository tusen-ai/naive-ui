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
| label-align | `'center' \| 'left' \| 'right'` | `'left'` | Label align. |
| label-placement | `'top' \| 'left'` | `'top'` | Label placement. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the description. |
| title | `string` | `undefined` | Title of the description. |

### Description Item Props

| Name  | Type     | Default     | Description              |
| ----- | -------- | ----------- | ------------------------ |
| label | `string` | `undefined` | Label of the item.       |
| span  | `number` | `1`         | Column span of the item. |

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

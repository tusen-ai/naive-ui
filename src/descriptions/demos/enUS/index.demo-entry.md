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
| bordered | `boolean` | `false` | Descriptions whether to display border. |
| column | `number` | `3` | Descriptions column. |
| label-align | `'center' \| 'left' \| 'right'` | `'left'` | Descriptions align in label. |
| label-placement | `'top' \| 'left'` | `'top'` | Descriptions label placement. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Descriptions size. |
| title | `string` | `undefined` | Descriptions title. |

### Description Item Props

| Name  | Type     | Default     | Description |
| ----- | -------- | ----------- | ----------- |
| label | `string` | `undefined` |  The label of the descriptions item.          |
| span  | `number` | `1`         |  Description item span.           |

## Slots

### Descriptions Slots

| Name    | Parameters | Description |
| ------- | ---------- | ----------- |
| default | `()`       |  Descriptions's content.           |
| header  | `()`       |  The content placed in the descriptions header.           |

### Description Item Slots

| Name    | Parameters | Description |
| ------- | ---------- | ----------- |
| default | `()`       | Descriptions item content.            |
| label   | `()`       | Descriptions item label slot.            |

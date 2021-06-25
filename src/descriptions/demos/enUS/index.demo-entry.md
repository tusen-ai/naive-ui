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

| Name  | Type     | Default     | Description                        |
| ----- | -------- | ----------- | ---------------------------------- |
| label | `string` | `undefined` | The label of the description item. |
| span  | `number` | `1`         | Description item span.             |

## Slots

### Descriptions Slots

| Name    | Parameters | Description                                    |
| ------- | ---------- | ---------------------------------------------- |
| default | `()`       | Content of the descriptions.                   |
| header  | `()`       | The content placed in the descriptions header. |

### Description Item Slots

| Name    | Parameters | Description                      |
| ------- | ---------- | -------------------------------- |
| default | `()`       | Content of the description item. |
| label   | `()`       | Descriptions item label slot.    |

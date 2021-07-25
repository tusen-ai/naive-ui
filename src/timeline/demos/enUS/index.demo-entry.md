# Timeline

The world is 2 demensioned. One of them is time. The Other is event.

## Demos

```demo
basic
size
item-placement
```

## Props

### Timeline Props

| Name           | Type                  | Default    | Description |
| -------------- | --------------------- | ---------- | ----------- |
| item-placement | `'left' \| 'right'`   | `'left'`   | Direction.  |
| size           | `'medium' \| 'large'` | `'medium'` | Size.       |

### Timeline Item Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string` | `undefined` | Item content. |
| time | `string` | `undefined` | Item time. |
| title | `string` | `undefined` | Item title. |
| type | `'default' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` | Item type. |

## Slots

### Timeline Slots

| Name    | Parameters | Description       |
| ------- | ---------- | ----------------- |
| default | `()`       | Timeline Content. |

### Timeline Item Slots

| Name    | Parameters | Description                                    |
| ------- | ---------- | ---------------------------------------------- |
| default | `()`       | Timeline item content.                         |
| footer  | `()`       | Content at the bottom of the timeline options. |
| header  | `()`       | Content at the top of the timeline options.    |

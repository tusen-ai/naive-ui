# List

It is hard to make it looks elegant. However things should be done.

<!--single-column-->

## Demos

```demo
basic.vue
border.vue
```

## API

### List Props

| Name     | Type      | Default | Description                 |
| -------- | --------- | ------- | --------------------------- |
| bordered | `boolean` | `false` | Whether to show the border. |

### List Slots

| Name    | Parameters | Description                           |
| ------- | ---------- | ------------------------------------- |
| default | `()`       | The contents of the list.             |
| footer  | `()`       | Content at the bottom of the list.    |
| header  | `()`       | The contents of the head of the list. |

### ListItem Slots

| Name    | Parameters | Description                         |
| ------- | ---------- | ----------------------------------- |
| default | `()`       | The contents of the list item.      |
| prefix  | `()`       | The first content of the list item. |
| suffix  | `()`       | The end of the list item.           |

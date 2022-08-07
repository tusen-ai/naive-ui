# List

It is hard to make it looks elegant. However things should be done.

<!--single-column-->

## Demos

```demo
basic.vue
hoverable.vue
border.vue
```

## API

### List Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to show the border. |  |
| clickable | `boolean` | `false` | Whether item has clickable style. | NEXT_VERSION |
| hoverable | `boolean` | `false` | Whether item has hoverable style. | NEXT_VERSION |
| show-divider | `boolean` | `true` | Whether to show item divider. | NEXT_VERSION |

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

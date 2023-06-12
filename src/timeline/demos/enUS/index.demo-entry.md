# Timeline

The world is 2 dimensioned. One of them is time. The Other is event.

## Demos

```demo
basic.vue
size.vue
item-placement.vue
horizontal.vue
customize-icon.vue
```

## API

### Timeline Props

| Name           | Type                  | Default     | Description        |
| -------------- | --------------------- | ----------- | ------------------ |
| horizontal     | `boolean`             | `'false'`   | Horizontal         |
| icon-size      | `number`              | `undefined` | Size of icon part. |
| item-placement | `'left' \| 'right'`   | `'left'`    | Direction.         |
| size           | `'medium' \| 'large'` | `'medium'`  | Size.              |

### TimelineItem Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| color | `string` | `undefined` | Item color. |  |
| content | `string` | `undefined` | Item content. |  |
| line-type | `'default' \| 'dashed'` | `'default'` | Line type. | 2.26.1 |
| time | `string` | `undefined` | Item time. |  |
| title | `string` | `undefined` | Item title. |  |
| type | `'default' \| 'success' \| 'info' \| 'warning' \| 'error'` | `'default'` | Item type. |  |

### Timeline Slots

| Name    | Parameters | Description       |
| ------- | ---------- | ----------------- |
| default | `()`       | Timeline Content. |

### TimelineItem Slots

| Name    | Parameters | Description                                    |
| ------- | ---------- | ---------------------------------------------- |
| default | `()`       | Timeline item content.                         |
| icon    | `()`       | Timeline item customize timeline icon.         |
| footer  | `()`       | Content at the bottom of the timeline options. |
| header  | `()`       | Content at the top of the timeline options.    |

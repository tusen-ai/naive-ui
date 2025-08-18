# Divider

Divide something.

## Demos

```demo
basic.vue
content.vue
vertical.vue
content.offset.vue
vertical.content.vue
```

## API

### Divider Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| type | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | The type of divider line | NEXT_VERSION |
| title-placement | `'start' \| 'center' \| 'end'` | `'center'` | Title placement. | NEXT_VERSION |
| offset | `number` | `28` | The offset between the dividing line and the title. Only valid when `title-placement` is `start` or `end` | NEXT_VERSION |
| vertical | `boolean` | `false` | Whether to show vertical direction. |  |
| title-class | `string` | `undefined` | The class name of the title div | NEXT_VERSION |
| title-style | `string \| object` | `undefined` | The style of the title div | NEXT_VERSION |

### Divider Slots

| Name    | Parameters | Description           |
| ------- | ---------- | --------------------- |
| default | `()`       | The title of divider. |

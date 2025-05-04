# Infinite Scroll

Scroll, scroll, scroll, scroll...

Available since `2.38.2`.

## Demos

```demo
basic.vue
reverse.vue
chat.vue
```

## API

### Infinite Scroll Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| distance | `number` | `0` | Distance threshold that triggers loading. | 2.38.2 |
| reverse | `boolean` | `false` | Whether to trigger load more from the top. Defaults to loading from bottom. | NEXT_VERSION |
| scrollbar-props | `Object` | `undefined` | Attribute reference [Scrollbar props](scrollbar#Scrollbar-Props). | 2.38.2 |
| on-load | `() => Promise<void> \| void` | `undefined` | The callback function when scrolling to the bottom. | 2.38.2 |

### Infinite Slots

| Name    | Parameters | Description        |
| ------- | ---------- | ------------------ |
| default | `()`       | Infinite's content |

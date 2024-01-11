# Space

A great invention (which is not invented by me).

If you don't have compitable issue for `gap` CSS property, it's suggested to use [Flex](flex).

## Demos

```demo
basic.vue
vertical.vue
from-end.vue
space-between.vue
space-around.vue
center.vue
reverse.vue
```

## API

### Space Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| align | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | `undefined` | Vertical arrangement. |  |
| inline | `boolean` | `false` | Is it an inline element. |  |
| wrap-item | `boolean` | `true` | Whether a container exists to wrap the child elements. `false` value will only work in browsers that supports flex gap. | 2.30.5 |
| item-class | `string` | `undefined` | Node class, valid when `wrap-item` is `true` | 2.36.0 |
| item-style | `string \| object` | `undefined` | Node style, valid when `wrap-item` is `true` |  |
| justify | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` | Horizontal arrangement. | `'space-evenly'` 2.28.3 |
| reverse | `boolean` | `false` | Whether to reverse inner items. | 2.37.0 |
| size | `'small' \| 'medium' \| 'large' \| number \| [number, number]` | `'medium'` | When it's a number, it will be used as vertical and horizontal gap, or it is `[horizontalGap, verticalGap]`. |  |
| vertical | `boolean` | `false` | Whether to lay out vertically. |  |
| wrap | `boolean` | `true` | Whether to exceed the line break. |  |

### Space Slots

| Name    | Parameters | Description      |
| ------- | ---------- | ---------------- |
| default | `()`       | Spacing content. |

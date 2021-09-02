# Space

A great invention.

## Demos

```demo
basic
vertical
from-end
space-between
space-around
center
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| align | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | `undefined` | Vertical arrangement. |
| inline | `boolean` | `false` | Is it an inline element. |
| item-style | `string \| object` | `undefined` | Node style. |
| justify | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between'` | `'start'` | Horizontal arrangement. |
| size | `'small' \| 'medium' \| 'large' \| number \| [number, number]` | `'medium'` | In vertical arrangement, size is marginBottom(if you use array, use the value with index 1), In horizontal arrangement, size is marginLeft(if you use array, use the value with index 0), marginRight and paddingTop, paddingBottom(if you use array, use the value with index 1). |
| vertical | `boolean` | `false` | Whether to lay out vertically. |
| wrap | `boolean` | `true` | Whether to exceed the line break. |

## Slots

| Name    | Parameters | Description      |
| ------- | ---------- | ---------------- |
| default | `()`       | Spacing content. |

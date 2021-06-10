# Spin

It can be called loading, but why it's called loading? Because there is another internal component with less props called loading.

## Demos

```demo
basic
wrap
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` |  |
| show | `boolean` | `true` | If spin is active. |
| stroke-width | `number` | `undefined` | Relative width of spin's stroke, you can assume the outer radius of spin is 100. |
| stroke | `string` | `undefined` | Color of the spin. |

## Slots

| Name    | Parameters | Description                        |
| ------- | ---------- | ---------------------------------- |
| default | `()`       | If set, spin will wrap the content |

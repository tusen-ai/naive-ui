# Panel Split Split

The flexible layout tool provides the possibility of customizing the interface layout

## Demos

```demo
basic.vue
vertical.vue
nest.vue
```

## API

### Split Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | `Boolean` | `false` | Whether to disable. |
| direction | `horizontal \| vertical` | `horizontal` | Split Indicates the direction of the split. |
| min | `Number` | `0` | Split Indicates the minimum threshold for splitting, 0-1 is a percentage. |
| max | `Number` | `1` | Split Indicates the maximum split threshold, 0-1 is a percentage. |
| size | `Number` | `0.5` | Split Indicates the split size, 0-1 is a percentage. |
| trigger-size | `Number` | `3` | Split Specifies the size of the separator. |

### Split Slots

| Name   | Parameters | Description               |
| ------ | ---------- | ------------------------- |
| first  | `()`       | The first panel content.  |
| second | `()`       | The Second panel content. |

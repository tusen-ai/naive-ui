# Grid

<!--single-column-->

Based on CSS Grid. Responsive. Keep away from IE.

```demo
basic.vue
gap.vue
offset.vue
responsive.vue
responsive-item.vue
collapse.vue
```

## API

### Grid Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| cols | `number \| ResponsiveDescription` | `24` | Number of grids displayed. |
| collapsed | `boolean` | `false` | Whether to fold by default. |
| collapsed-rows | `number` | `1` | The number of rows displayed by default. |
| responsive | `'self' \| 'screen'` | `'screen'` | `'self'` triggers responsive layout by its own width. `'screen'` triggers responsive layout by viewport's witdh. |
| item-responsive | `boolean` | `false` | Whether the grid item is responsive. |
| x-gap | `number \| ResponsiveDescription` | `0` | Horizontal gap. |
| y-gap | `number \| ResponsiveDescription` | `0` | Vertical gap. |

### GridItem Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| offset | `number \| ResponsiveDescription` | `0` | The number of intervals to the left of the grid. |
| span | `number \| ResponsiveDescription` | `1` | The number of columns occupied by the grid. The grid item would be hidden if it's 0. |
| suffix | `boolean` | `false` | Grid suffix. |

### Grid Slots

| Name    | Parameters | Description   |
| ------- | ---------- | ------------- |
| default | `()`       | Grid content. |

### GridItem Slots

| Name    | Parameters                | Description        |
| ------- | ------------------------- | ------------------ |
| default | `({ overflow: boolean })` | Grid item content. |

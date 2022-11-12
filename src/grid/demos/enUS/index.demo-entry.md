# Grid

<!--single-column-->

Based on CSS Grid. Responsive. Keep away from IE.

<n-alert type="warning" title="Caveats" :bordered="false">
Due to technical limitation, <n-text code>n-grid-item</n-text> can't be encapsulated in another component.
</n-alert>

## Demos

```demo
basic.vue
gap.vue
offset.vue
responsive.vue
responsive-item.vue
collapse.vue
layout-shift-disabled.vue
```

## API

### Grid Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| cols | `number \| ResponsiveDescription` | `24` | Number of grids displayed. |  |
| collapsed | `boolean` | `false` | Whether to fold by default. |  |
| collapsed-rows | `number` | `1` | The number of rows displayed by default. |  |
| layout-shift-disabled | `boolean` | `false` | By default, `n-grid` will compute grid content based on window size and container size. This would cause 2 side effects: Content may shift in SSR mode; Render items has layout shift and it would influence performance slightly. If you don't need any responsive functionality, you can use `layout-shift-disabled` to get rid of side effects of it. Please note that set `layout-shift-disabled` will disabled all responsive functionality of `n-grid` and `suffix`, `offset` of `n-grid-item`. | 2.32.2 |
| responsive | `'self' \| 'screen'` | `'screen'` | `'self'` triggers responsive layout by its own width. `'screen'` triggers responsive layout by viewport's witdh. |  |
| item-responsive | `boolean` | `false` | Whether the grid item is responsive. |  |
| x-gap | `number \| ResponsiveDescription` | `0` | Horizontal gap. |  |
| y-gap | `number \| ResponsiveDescription` | `0` | Vertical gap. |  |

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

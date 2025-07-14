<!--single-column-->

# Heatmap

Digital workers have their own wall to paint.

## Demos

```demo
basic.vue
themes.vue
colors.vue
slots.vue
```

## API

### Heatmap Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| data | `Array<{ timestamp: number, value?: number \| null }>` | `[]` | Heatmap data containing timestamp and value | NEXT_VERSION |
| active-colors | `string[]` | `undefined` | Color array arranged from light to dark, higher priority than color-theme | NEXT_VERSION |
| minimum-color | `string` | `undefined` | Minimum color for the heatmap, defaults to the first color in active-colors | NEXT_VERSION |
| color-theme | `'github' \| 'green' \| 'blue' \| 'orange' \| 'purple' \| 'red'` | `'github'` | Built-in color theme | NEXT_VERSION |
| first-day-of-week | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `0` | Start day of the week, 0 for Monday, 6 for Sunday | NEXT_VERSION |
| loading | `boolean` | `false` | Whether to show loading state | NEXT_VERSION |
| show-color-indicator | `boolean` | `true` | Whether to show the color level indicator at the bottom | NEXT_VERSION |
| show-week-labels | `boolean` | `true` | Whether to show week labels | NEXT_VERSION |
| show-month-labels | `boolean` | `true` | Whether to show month labels | NEXT_VERSION |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Heatmap size | NEXT_VERSION |
| fill-calendar | `boolean` | `false` | Whether to fill the entire calendar grid, when `true` the first column will be completely filled, suitable for GitHub-style recent year view | NEXT_VERSION |
| x-gap | `number \| string` | `undefined` | Horizontal gap | NEXT_VERSION |
| y-gap | `number \| string` | `undefined` | Vertical gap | NEXT_VERSION |
| tooltip | `boolean \| TooltipProps \| false` | `true` | Tooltip configuration, false to disable, object for tooltip config | NEXT_VERSION |

### Heatmap Slots

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| footer | `()` | Left footer slot, aligned with the left side of heatmap table | NEXT_VERSION |
| indicator | `()` | Right footer indicator slot, aligned with the right side of heatmap table | NEXT_VERSION |
| indicator-leading-text | `()` | Leading text for the color level indicator | NEXT_VERSION |
| indicator-trailing-text | `()` | Trailing text for the color level indicator | NEXT_VERSION |
| tooltip | `(data: { timestamp: number, value?: number \| null })` | Custom tooltip content | NEXT_VERSION |

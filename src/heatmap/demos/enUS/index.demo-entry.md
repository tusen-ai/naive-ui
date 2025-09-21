<!--single-column-->

# Heatmap

Digital workers have their own wall to paint.

Available from `2.43.0`.

<n-alert type="info" title="Usage Prerequisites" :bordered="false">
  <n-text>
    Color-related properties <n-text code>active-colors</n-text> and <n-text code>minimum-color</n-text> have higher priority than <n-text code>color-theme</n-text>. If these three properties are set simultaneously, <n-text code>active-colors</n-text> and <n-text code>minimum-color</n-text> will be used. It is recommended not to set them at the same time.
  </n-text>
  <br />
  <n-text>
    When none are set, the default value built into Naive UI is used - a GitHub-style theme.
  </n-text>
</n-alert>

## Demos

```demo
basic.vue
themes.vue
colors.vue
slots.vue
```

## API

### Heatmap Props

Type `HeatmapProps`

| Name | Type | Related Type | Default | Description | Version |
| --- | --- | --- | --- | --- | --- |
| active-colors | `string[]` | - | `undefined` | Color array arranged from light to dark, higher priority than `color-theme`. | 2.43.0 |
| color-theme | `'green' \| 'blue' \| 'orange' \| 'purple' \| 'red'` | `HeatmapColorTheme` | `undefined` | Built-in color theme. | 2.43.0 |
| data | `Array<{ timestamp: number, value?: number \| null }>` | `HeatmapData`, `HeatmapDataItem` | `[]` | Heatmap data containing timestamp and value. | 2.43.0 |
| first-day-of-week | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `HeatmapFirstDayOfWeek` | `0` | Start day of the week, 0 for Monday, 6 for Sunday. | 2.43.0 |
| fill-calendar-leading | `boolean` | - | `false` | Whether to fill the leading of calendar grid, suitable for GitHub style recent year view. | 2.43.0 |
| loading | `boolean` | - | `false` | Whether to show loading state. | 2.43.0 |
| loading-data | `Array<{ timestamp: number, value?: number \| null }>` | `HeatmapData`, `HeatmapDataItem` | `undefined` | Data to display in loading status. If item's `value` is `null`, cell is hidden but will occupy place. If. item's `value` is anything but `null`, cell will show loading status. | 2.43.0 |
| minimum-color | `string` | - | `undefined` | Minimum color for the heatmap, defaults to the first color in `active-colors`. | 2.43.0 |
| show-color-indicator | `boolean` | - | `true` | Whether to show the color level indicator at the bottom | 2.43.0 |
| show-month-labels | `boolean` | - | `true` | Whether to show month labels. | 2.43.0 |
| show-week-labels | `boolean` | - | `true` | Whether to show week labels. | 2.43.0 |
| size | `'small' \| 'medium' \| 'large'` | - | `'medium'` | Heatmap size. | 2.43.0 |
| tooltip | `boolean \| TooltipProps` | - | `false` | Tooltip configuration, `false` to disable, object for `TooltipProps`. | 2.43.0 |
| x-gap | `number \| string` | - | `undefined` | Horizontal gap | 2.43.0 |
| y-gap | `number \| string` | - | `undefined` | Vertical gap | 2.43.0 |

### Heatmap Slots

Type `HeatmapSlots`

| Name | Parameters | Related Type | Description | Version |
| --- | --- | --- | --- | --- |
| footer | `()` | - | Left footer slot, aligned with the left side of heatmap table | 2.43.0 |
| indicator | `()` | - | Right footer indicator slot, aligned with the right side of heatmap table | 2.43.0 |
| indicator-leading-text | `()` | - | Leading text for the color level indicator | 2.43.0 |
| indicator-trailing-text | `()` | - | Trailing text for the color level indicator | 2.43.0 |
| tooltip | `(props: { timestamp: number, value?: number \| null })` | `HeatmapTooltipSlotProps` | Custom tooltip content | 2.43.0 |

### Others

1. `import { heatmapMockData } from 'naive-ui'`, `function heatmapMockData(year?: 'recent' | number): HeatmapData`

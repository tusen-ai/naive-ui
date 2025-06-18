<!--single-column-->

# Heatmap

Digital workers have their own wall to paint.

## Demos

```demo
basic.vue
themes.vue
colors.vue
```

## API

### Heatmap Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| data | `Array<{ date: Date, value: number }>` | `[]` | Heatmap data containing date and value |
| colors | `string[]` | `['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']` | Color array arranged from light to dark |
| unit | `string` | `undefined` | Unit of the value, used for tooltip display |
| weekStartOn | `number` | `0` | Start day of the week, 0 for Sunday, 1 for Monday |
| showColorIndicator | `boolean` | `true` | Whether to show the color level indicator at the bottom |
| type | `'month' \| 'year'` | `'year'` | Display type |

### Heatmap Slots

| Name   | Parameters | Description         |
| ------ | ---------- | ------------------- |
| footer | `()`       | Footer slot content |

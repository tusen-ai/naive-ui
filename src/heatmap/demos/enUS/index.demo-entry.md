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
| data | `Array<{ date: Date, value: number }>` | `[]` | Heatmap data containing date and value | NEXT_VERSION |
| colors | `string[]` | `undefined` | Color array arranged from light to dark, higher priority than color-theme | NEXT_VERSION |
| color-theme | `'github' \| 'green' \| 'blue' \| 'orange' \| 'purple' \| 'red'` | `'github'` | Built-in color theme | NEXT_VERSION |
| unit | `string` | `undefined` | Unit of the value, used for tooltip display | NEXT_VERSION |
| week-starts-on | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `0` | Start day of the week, 0 for Sunday, 1 for Monday | NEXT_VERSION |
| loading | `boolean` | `false` | Whether to show loading state | NEXT_VERSION |
| show-color-indicator | `boolean` | `true` | Whether to show the color level indicator at the bottom | NEXT_VERSION |
| show-week-labels | `boolean` | `true` | Whether to show week labels | NEXT_VERSION |
| show-month-labels | `boolean` | `true` | Whether to show month labels | NEXT_VERSION |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Heatmap size | NEXT_VERSION |
| x-gap | `number \| string` | `undefined` | Horizontal gap | NEXT_VERSION |
| y-gap | `number \| string` | `undefined` | Vertical gap | NEXT_VERSION |
| tooltip | `boolean \| PopoverProps` | `true` | Tooltip configuration, false to disable, object for popover config | NEXT_VERSION |

### Heatmap Slots

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| info | `()` | Left footer info slot, aligned with the left side of heatmap table | NEXT_VERSION |
| indicator | `()` | Right footer indicator slot, aligned with the right side of heatmap table | NEXT_VERSION |
| tooltip | `(data: { date: number, value: number \| null, unit?: string })` | Custom tooltip content | NEXT_VERSION |

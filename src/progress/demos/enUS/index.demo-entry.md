# Progress

I have no words to say but there still should be a placeholder to make layout looks spread.

## Demos

```demo
circle
line
circle-offset.vue
multiple-circle
dashboard.vue
custom-indicator
color
no-indicator
height
processing
```

## API

### Progress Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| border-radius | `number \| string` | `undefined` | `'line'` typed progress's border-radius. Keep half of default height if not passed. |  |
| circle-gap | `number` | `1` | The gap between circles when type is `'multiple-circle'`, suppose `viewbox` size is `100`. |  |
| color | `string \| string[]` | `undefined` | Progress color. |  |
| fill-border-radius | `number \| string` | `undefined` | `'line'` typed progress's fill's border-radius. Keep `border-radius` if not passed. |  |
| gap-degree | `number` | `0` | the gap degree of half circle, 0 ~ 360. |  |
| gap-position | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | the gap position. |  |
| height | `number` | `undefined` | `'line'` typed progress's height. Keep default height if not passed. |  |
| indicator-placement | `'inside' \| 'outside'` | `'outside'` | Indicator placement. |  |
| indicator-text-color | `string` | `undefined` | Indicator text color. |  |
| offset-degress | `number` | `0` | Offset degree of circular progress, only works with `circle` typed progress. | 2.24.0 |
| percentage | `number \| number[]` | `0` | Percentage value. |  |
| processing | `boolean` | `false` | Processing status. |  |
| rail-color | `string \| string[]` | `undefined` | Rail color. |  |
| rail-style | `string \| CSS \| Array<string \| CSS>` | `undefined` | Rail style. |  |
| show-indicator | `boolean` | `true` | Whether to display indicators. |  |
| status | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` | Progress status. |  |
| stroke-width | `number` | `7` | Progress width. |  |
| type | `'line' \| 'circle' \| 'multiple-circle' \| 'dashboard'` | `line` | Progress type. |  |
| unit | `string` | `%` | Progress unit. |  |

### Progress Slots

| Name    | Parameters | Description                                     |
| ------- | ---------- | ----------------------------------------------- |
| default | `()`       | Content will replace default indicator content. |

# Progress

I have no words to say but there still should be a placeholder to make layout looks spread.

## Demos

```demo
circle
line
multiple-circle
custom-indicator
color
no-indicator
height
processing
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| border-radius | `number \| string` | `undefined` | `'line'` typed progress's border-radius. Keep half of default height if not passed. |
| circle-gap | `number` | `1` | The gap bewteen circles when type is `'multiple-circle'`, suppose viewbox size is `100` |
| color | `string \| Array<string>` | `undefined` |  |
| fill-border-radius | `number \| string` | `undefined` | `'line'` typed progress's fill's border-radius. Keep `border-radius` if not passed. |
| height | `number` | `undefined` | `'line'` typed progress's height. Keep default height if not passed. |
| indicator-placement | `'inside' \| 'inside-label' \| 'outside'` | `'outside'` |  |
| indicator-text-color | `string` | `undefined` |  |
| percentage | `number \| Array<number>` | `0` |  |
| processing | `boolean` | `false` |  |
| processing | `boolean` | `false` |  |
| rail-color | `string \| Array<string>` | `undefined` |  |
| show-indicator | `boolean` | `true` |  |
| status | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` |  |
| stroke-width | `number` | `7` |  |
| theme | `'light' \| 'dark' \| string` | `undefined` |  |
| type | `'line' \| 'circle' \| 'multiple-circle'` | `line` |  |
| unit | `string` | `%` |  |

## Slots

| Name    | Parameters | Description                                     |
| ------- | ---------- | ----------------------------------------------- |
| default | `()`       | Content will replace default indicatior content |

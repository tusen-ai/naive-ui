# Slider

As far as I know, it is always used as a volume control.

## Demos

```demo
basic
range
mark
restrict-selectable-values
disabled
disable-tooltip
format
reverse
vertical
show-tooltip.vue
multiple-debug
```

## API

### Slider Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| default-value | `number \| [number, number] \| null` | `null` | Default value. |  |
| disabled | `boolean` | `false` | Whether the slider is disabled. |  |
| format-tooltip | `(value: number) => string \| number` | `undefined` | Format tooltip. |  |
| marks | `{ [markValue: number]: string }` | `undefined` | Marks of the slider. |  |
| max | `number` | `100` | Max value of the slider. |  |
| min | `number` | `0` | Min value of the slider. |  |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `undefined` | Tooltip's placement | NEXT_VERSION |
| range | `boolean` | `false` | Whether the slider uses range value. |  |
| reverse | `boolean` | `false` | Whether to reverse the track. |  |
| show-tooltip | `boolean` | `false` | Whether to always show tooltip. Only work with non-range slider. | 2.24.2 |
| step | `number \| 'mark'` | `1` | Step of the slider. |  |
| tooltip | `boolean` | `true` | Whether to show tooltip. |  |
| vertical | `boolean` | `false` | Whether to enable vertical mode. |  |
| value | `number \| [number, number] \| null` | `undefined` | Value of the slider. |  |
| on-update:value | `(value: number \| [number, number]) => void` | `undefined` | Callback on value update. |  |

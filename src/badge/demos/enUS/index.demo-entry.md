# Badge

I bet you have seen it and know how it should be applied.

## Demos

```demo
basic.vue
type.vue
processing.vue
show-zero.vue
overflow.vue
manual.vue
custom-content.vue
color.vue
raw.vue
offset.vue
```

## API

### Badge Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| color | `string` | `undefined` | Badge color. |  |
| dot | `boolean` | `false` | Show badge as dot. |  |
| max | `number` | `undefined` | The maximum number of the badge when its value overflows. |  |
| offset | `[string \| number, string \| number]` | `undefined` | Offset of the badge from the left and top of the default position. | 2.34.3 |
| processing | `boolean` | `false` | Show processing status. |  |
| show-zero | `boolean` | `false` | Whether to display the badge, even if provided value equals 0. |  |
| show | `boolean` | `true` | Whether the badge should be shown altogether. |  |
| type | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` | Type of the badge. |  |
| value | `string \| number` | `undefined` | Badge's value. |  |

### Badge Slots

| Name    | Parameters | Description      |
| ------- | ---------- | ---------------- |
| default | `()`       | Badge's content. |

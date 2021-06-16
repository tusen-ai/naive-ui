# Badge

I bet you have seen it and know how it should be applied.

## Demos

```demo
basic
type
processing
show-zero
overflow
manual
custom-content
raw
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| color | `string` | `undefined` | Badge color. |
| dot | `boolean` | `false` | Show badge as dot. |
| max | `number` | `undefined` | The maximum number of the badge when its value overflows. |
| processing | `boolean` | `false` | Show processing status. |
| show-zero | `boolean` | `false` | Whether to display the badge, even if provided value equals 0. |
| show | `boolean` | `true` | Whether the badge should be shown altogether. |
| type | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` | Type of the badge. |
| value | `string \| number` | `undefined` | Badge's value. |

## Slots

| Name    | Parameters | Description      |
| ------- | ---------- | ---------------- |
| default | `()`       | Badge's content. |

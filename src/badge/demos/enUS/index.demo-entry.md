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
| max | `number` | `undefined` | TThe maximum number of the badge when its value overflows. |
| processing | `boolean` | `false` | Show processing status. |
| show-zero | `boolean` | `false` | Badge show zero. |
| show | `boolean` | `true` | Badge controll show. |
| type | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` | Type of the badge. |
| value | `string \| number` | `undefined` | Badge of number value. |

## Slots

| Name    | Parameters | Description      |
| ------- | ---------- | ---------------- |
| default | `()`       | Badge's content. |

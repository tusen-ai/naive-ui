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
| color | `string` | `undefined` | Badge color |
| dot | `boolean` | `false` | Badge show dot |
| max | `number` | `undefined` | The maximum number of Badge to handle overflow situations |
| processing | `boolean` | `false` | Badge of processing |
| show-zero | `boolean` | `false` | Badge show zero |
| show | `boolean` | `true` | Badge controll show |
| type | `'default' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` | Badge show type |
| value | `string \| number` | `undefined` | Badge of number value |

## Slots

| Name    | Parameters | Description                  |
| ------- | ---------- | ---------------------------- |
| default | `()`       | Badge default filled content |

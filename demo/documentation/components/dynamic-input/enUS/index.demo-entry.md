# Dynamic Input

<!--single-column-->

This component's name has been changed many times.

In the beginning, it was created for inputing environment variables.

## Demos

```demo
basic
pair
custom
form
```

## Props

### Dynamic Input Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| key-field | `string` | `undefined` |  |
| min | `number` | `0` | Min number of items. |
| max | `number` | `undefined` | Max number of items. |
| preset | `'input' \| 'preset'` | `'input'` | The preset of `n-dynamic-input`, it work when `$slots.default` is not set. |
| value | `Array` | - | **required** |
| on-create | `(index: number) => any` | `undefined` | The callback when click at the add button. If set, the return value will be used as the initial value of the new item. `index` is the the new item's corresponding index in the value array, which starts from 1 (the second item). |

### Dynamic Input Props (Input Preset)

| Name        | Type            | Default  | Description |
| ----------- | --------------- | -------- | ----------- |
| value       | `Array<string>` | required |             |
| placeholder | `string`        | `''`     |             |

### Dynamic Input Props (Pair Preset)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| value | `Array<{ key: string, value: string }>` | required |  |
| key-placeholder | `string` | `''` |  |
| value-placeholder | `string` | `''` |  |

## Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `(options: { value: any, index: number })` | The content of each item, `value` is the value of current item, `index` is the index of the current item. |

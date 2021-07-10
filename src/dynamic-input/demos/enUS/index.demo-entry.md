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
| default-value | `Array<any>` | `[]` | Default value in uncontrolled mode. |
| item-style | `string \| Object` | `undefined` | The style of each item in dynamic input. |
| key-field | `string` | `undefined` | The key of each item will be used in the rendering of the list. |
| min | `number` | `0` | Min number of items. |
| max | `number` | `undefined` | Max number of items. |
| preset | `'input' \| 'preset'` | `'input'` | The preset of `n-dynamic-input`, it work when `$slots.default` is not set. |
| value | `Array<any>` | `undefined` | Value in controlled mode. |
| on-create | `(index: number) => void` | `undefined` | The callback when click at the add button. If set, the return value will be used as the initial value of the new item. `index` is the the new item's corresponding index in the value array, which starts from 1 (the second item). |
| on-remove | `(index: number) => void` | `undefined` | Click the index item button of remove triggered callback. |
| on-update:value | `(value: any) => void` | `undefined` | Callback when the component's value changes. |

### Dynamic Input Props (Input Preset)

| Name        | Type            | Default  | Description                 |
| ----------- | --------------- | -------- | --------------------------- |
| value       | `Array<string>` | required | Value in Input preset mode. |
| placeholder | `string`        | `''`     | Placeholder for each item.  |

### Dynamic Input Props (Pair Preset)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| value | `Array<{ key: string, value: string }>` | required | Value in Input pair mode. |
| key-placeholder | `string` | `''` | The placeholder of each item's key. |
| value-placeholder | `string` | `''` | The placeholder of each item's value. |

## Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `(options: { value: any, index: number })` | The content of each item, `value` is the value of current item, `index` is the index of the current item. |

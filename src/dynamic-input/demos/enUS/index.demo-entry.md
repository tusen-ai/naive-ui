# Dynamic Input

<!--single-column-->

This component's name has been changed so many times.

In the beginning, it was created for entering environment variables.

## Demos

```demo
basic.vue
pair.vue
custom.vue
form.vue
```

## API

### DynamicInput Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| default-value | `Array<any>` | `[]` | Default value. |
| item-style | `string \| Object` | `undefined` | The style of each item of the dynamic input. |
| key-field | `string` | `undefined` | The key of each item that should be used in the rendering of the list. |
| min | `number` | `0` | Minimum number of items. |
| max | `number` | `undefined` | Maximum number of items. |
| preset | `'input' \| 'pair'` | `'input'` | The preset of `n-dynamic-input`, it work when `$slots.default` is not set. |
| value | `Array<any>` | `undefined` | Value in controlled mode. |
| on-create | `(index: number) => void` | `undefined` | Add button (+) click callback. If set, the return value will be used as the initial value of the new item. `index` is the the new item's corresponding index in the value array, which starts from 1 (the second item). |
| on-remove | `(index: number) => void` | `undefined` | Remove button (-) callback. |
| on-update:value | `(value: any) => void` | `undefined` | On value changed callback. |

### DynamicInput Props (Input Preset)

| Name        | Type            | Default  | Description                    |
| ----------- | --------------- | -------- | ------------------------------ |
| value       | `Array<string>` | required | Value when being set manually. |
| placeholder | `string`        | `''`     | Placeholder for each item.     |

### DynamicInput Props (Pair Preset)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| value | `Array<{ key: string, value: string }>` | required | Value when being set manually. |
| key-placeholder | `string` | `''` | The placeholder of each item's key. |
| value-placeholder | `string` | `''` | The placeholder of each item's value. |

### DynamicInput Slots

| Name | Parameters | Description |
| --- | --- | --- |
| default | `(options: { value: any, index: number })` | The content of each item; `value` and `index` are the value and index of the current item. |

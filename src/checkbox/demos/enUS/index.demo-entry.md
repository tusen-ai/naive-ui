# Checkbox

Yo, yo, check it out.

## Demos

```demo
basic
group
grid
indeterminate
controlled
event
```

## Props

### Checkbox Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| checked | `boolean` | `false` | Whether the checkbox is being checked manually. |
| default-checked | `boolean` | `false` | Whether the checkbox is checked by default. |
| disabled | `boolean` | `false` | Whether the checkbox is disabled. |
| focusable | `boolean` | `true` | Whether the checkbox gains focus after being checked. |
| indeterminate | `boolean` | `false` | Whether the checkbox can have a third indeterminate state. |
| label | `string` | `undefined` | Checkbox label. |
| value | `string \| number` | `undefined` | The value of the checkbox to be used in a checkbox group. |
| on-update:checked | `(checked: boolean) => void` | `undefined` | Callback function triggered on a checked status change. |

### Checkbox Group Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | `boolean` | `false` | Whether the checkbox group is disabled. |
| default-value | `Array<string \| number>` | `null` | Checkbox group's default selected value. |
| max | `number` | `undefined` | The maximum number of checkboxes that can be checked. |
| min | `number` | `undefined` | The minimum number of checkboxes that can be checked. |
| value | `Array<string \| number> \| null` | `undefined` | Manually set values of a checkbox group. |
| on-update:value | `(value: string \| number)` | `undefined` | Callback when the checkbox group's value changes. |

## Slots

### Checkbox Slots

| Name    | Parameters | Description              |
| ------- | ---------- | ------------------------ |
| default | `()`       | Content of the checkbox. |

### Checkbox Group Slots

| Name    | Parameters | Description                    |
| ------- | ---------- | ------------------------------ |
| default | `()`       | Content of the checkbox group. |

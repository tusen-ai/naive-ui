# Checkbox

Yo, yo, check it out.

## Demos

```demo
basic.vue
size.vue
group.vue
grid.vue
indeterminate.vue
controlled.vue
event.vue
customize-value.vue
focus.vue
```

## API

### Checkbox Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| checked | `boolean` | `false` | Whether the checkbox is being checked manually. |
| default-checked | `boolean` | `false` | Whether the checkbox is checked by default. |
| disabled | `boolean` | `false` | Whether the checkbox is disabled. |
| focusable | `boolean` | `true` | Whether the checkbox gains focus after being checked. |
| indeterminate | `boolean` | `false` | Whether the checkbox can have a third indeterminate state. |
| label | `string` | `undefined` | Checkbox label. |
| size | `'small' \| 'medium' \| 'large'`  | `'medium'`  | The size of the checkbox. |
| value | `string \| number` | `undefined` | The value of the checkbox to be used in a checkbox group. |
| on-update:checked | `(checked: boolean) => void` | `undefined` | Callback function triggered on a checked status change. |

### CheckboxGroup Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| disabled | `boolean` | `false` | Whether the checkbox group is disabled. |  |
| default-value | `Array<string \| number>` | `null` | Checkbox group's default selected value. |  |
| max | `number` | `undefined` | The maximum number of checkboxes that can be checked. |  |
| min | `number` | `undefined` | The minimum number of checkboxes that can be checked. |  |
| value | `Array<string \| number> \| null` | `undefined` | Manually set values of a checkbox group. |  |
| on-update:value | `(value: string \| number, meta: { actionType: 'check' \| 'uncheck', value: string \| number }) => void` | `undefined` | Callback when the checkbox group's value changes. | `meta` 2.32.0 |

### Checkbox Slots

| Name    | Parameters | Description              |
| ------- | ---------- | ------------------------ |
| default | `()`       | Content of the checkbox. |

### CheckboxGroup Slots

| Name    | Parameters | Description                    |
| ------- | ---------- | ------------------------------ |
| default | `()`       | Content of the checkbox group. |

### Checkbox Methods

| Name  | Type         | Description | Version |
| ----- | ------------ | ----------- | ------- |
| focus | `() => void` | Focus.      | 2.24.2  |
| blur  | `() => void` | Blur.       | 2.24.2  |

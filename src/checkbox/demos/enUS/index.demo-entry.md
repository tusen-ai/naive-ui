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
| checked | `boolean` | `undefined` | Whether it is selected in the controlled mode. |
| indeterminate | `boolean` | `false` | Whether partly selected. |
| default-checked | `boolean` | `false` | Whether selected by default in uncontrolled mode. |
| disabled | `boolean` | `false` | Whether to disable. |
| focusable | `boolean` | `true` | Whether to gather when selected. |
| label | `string \| (() => VNodeChild)` | `undefined` | Checkbox label |
| value | `string \| number` | `undefined` | The value of the checkbox to be used in checkbox group. |
| on-update:checked | `(checked: boolean) => void` | `undefined` | Callback function triggered when checked changes |

### Checkbox Group Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | `boolean` | `false` | Whether the checkbox group is disabled. |
| default-value | `Array<string \| number>` | `null` | Checkbox group's default selected value. |
| value | `Array<string \| number> \| null` | `undefined` | Controlled data of checkbox group. |
| on-update:value | `(value: string \| number)` | `undefined` | Callback when checkbox group's value changes. |

## Slots

### Checkbox Slots

| Name    | Parameters | Description              |
| ------- | ---------- | ------------------------ |
| default | `()`       | Content of the checkbox. |

### Checkbox Group Slots

| Name    | Parameters | Description                    |
| ------- | ---------- | ------------------------------ |
| default | `()`       | Content of the checkbox group. |

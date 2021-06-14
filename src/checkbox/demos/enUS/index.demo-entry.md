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
| checked | `boolean` | `undefined` | Whether it is selected in the controlled state |
| indeterminate | `boolean` | `false` | Whether partly selected |
| default-checked | `boolean` | `false` | Whether selected by default |
| disabled | `boolean` | `false` | Whether to disable |
| focusable | `boolean` | `true` | Whether to gather when selected |
| label | `string \| (() => VNodeChild)` | `undefined` | Checkbox label |
| value | `string \| number` | `undefined` | The value value corresponding to the label of heckbox, the Checkbox Group is commonly used |
| on-update:checked | `(checked: boolean) => void` | `undefined` | Callback function triggered when checked changes |

### Checkbox Group Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | `boolean` | `false` | Whether the Checkbox Group is disabled |
| default-value | `Array<string \| number>` | `null` | Checkbox Group default value |
| value | `Array<string \| number> \| null` | Checkbox Group select value |
| on-update:value | `(value: string \| number)` | `undefined` | Callback when Checkbox Group controlled data changes |

## Slots

### Checkbox Slots

| Name    | Parameters | Description                         |
| ------- | ---------- | ----------------------------------- |
| default | `()`       | Default filling content of Checkbox |

### Checkbox Group Slots

| Name    | Parameters | Description                               |
| ------- | ---------- | ----------------------------------------- |
| default | `()`       | Default filling content of Checkbox Group |

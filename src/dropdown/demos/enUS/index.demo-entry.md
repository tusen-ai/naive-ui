# Dropdown

When you have some functions to trigger.

## Demos

```demo
basic
trigger
cascade
placement
size
manual-position
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| animated | `boolean` | `true` |  |
| inverted | `boolean` | `false` | Use inverted style. |
| keyboard | `boolean` | `true` | Whether is supports keyboard operation. (Be careful about the potential conflicts with other components keyboard operations) |
| options | `Array<DropdownOption \| DropdownDivider \| DropdownSubmenu>` | `[]` |  |
| size | `'small'\|'medium'\|'large'\|'huge'` | `'medium'` |  |
| on-select | `(key: string \| number) => void` | `undefined` |  |

For other props, for example `placement`, please see [Popover Props](popover#Props). Note that `arrow`, `raw` is not available.

### DropdownOption Type

| Property | Type               | Description       |
| -------- | ------------------ | ----------------- |
| icon?    | `() => VNodeChild` |                   |
| key      | `string \| number` | Should be unique. |
| label    | `string`           |                   |

### DropdownDivider Type

| Property | Type               | Description       |
| -------- | ------------------ | ----------------- |
| type     | `'divider'`        |                   |
| key      | `string \| number` | Should be unique. |

### DropdownSubmenu Type

| Property | Type | Description |
| --- | --- | --- |
| type | `'submenu'` |  |
| label | `string` |  |
| icon? | `() => VNodeChild` |  |
| key | `string \| number` | Should be unique. |
| children | `Array<DropdownOption \| DropdownDivider \| DropdownSubmenu>` |  |

### DropdownGroup Type

| Property | Type | Description |
| --- | --- | --- |
| type | `'group'` |  |
| label | `string` |  |
| icon? | `() => VNodeChild` |  |
| key | `string \| number` | Should be unique. |
| children | `Array<DropdownOption \| DropdownDivider \| DropdownSubmenu>` |  |

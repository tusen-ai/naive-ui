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
| animated | `boolean` | `true` | Use animation when popping up. |
| inverted | `boolean` | `false` | Use inverted style. |
| keyboard | `boolean` | `true` | Whether is supports keyboard operation. (Be careful about the potential conflicts with other components keyboard operations) |
| options | `Array<DropdownOption \| DropdownDivider \| DropdownSubmenu>` | `[]` | Options of the dropdown. |
| size | `'small'\|'medium'\|'large'\|'huge'` | `'medium'` | Dropdown size. |
| onClickoutside | `(show: boolean) => void` | `undefined` | Callback function triggered when clickoutside. |
| on-select | `(key: string \| number) => void` | `undefined` | Callback function triggered on blur. |

For other props, for example `placement`, please see [Popover Props](popover#Props). Note that `arrow`, `raw` is not available.

### DropdownOption Type

| Property | Type               | Description                     |
| -------- | ------------------ | ------------------------------- |
| icon?    | `() => VNodeChild` | Custom render function of icon. |
| key      | `string \| number` | Should be unique.               |
| label    | `string`           | Displayed label value.          |
| disabled | `boolean`          | Whether to disable the option.  |

### DropdownDivider Type

| Property | Type               | Description                      |
| -------- | ------------------ | -------------------------------- |
| type     | `'divider'`        | The type of the DropdownDivider. |
| key      | `string \| number` | Should be unique.                |

### DropdownSubmenu Type

| Property | Type | Description |
| --- | --- | --- |
| type | `'submenu'` | The type of the DropdownSubmenu. |
| label | `string` | Displayed label value. |
| icon? | `() => VNodeChild` | Custom rendering function of icon. |
| key | `string \| number` | Should be unique. |
| children | `Array<DropdownOption \| DropdownDivider \| DropdownSubmenu>` | Children options of DropdownSubmenu. |
| disabled | `boolean` | Whether to disable the option. |

### DropdownGroup Type

| Property | Type | Description |
| --- | --- | --- |
| type | `'group'` | The type of the DropdownGroup. |
| label | `string` | Displayed label value. |
| icon? | `() => VNodeChild` | Custom rendering function of icon. |
| key | `string \| number` | Should be unique. |
| children | `Array<DropdownOption \| DropdownDivider \| DropdownSubmenu>` | Children options of DropdownGroup. |

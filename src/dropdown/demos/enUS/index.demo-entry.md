# Dropdown

When you have some functions to trigger.

## Demos

```demo
basic
icon
trigger
cascade
arrow
placement
size
manual-position
batch-render
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| animated | `boolean` | `true` | Use an animation when showing options. |
| inverted | `boolean` | `false` | Use the inverted style. |
| keyboard | `boolean` | `true` | Whether the component supports keyboard operation. (Be careful about the potential conflicts with other components keyboard operations) |
| options | `Array<DropdownOption \| DropdownDivider \| DropdownSubmenu>` | `[]` | Dropdown options. |
| render-icon | `(option: DropdownOption \| DropdownSubmenu) => VNodeChild` | `undefined` | Render function that renders option icons. |
| render-label | `(option: DropdownOption \| DropdownSubmenu) => VNodeChild` | `undefined` | Render function that renders option labels. |
| size | `'small'\|'medium'\|'large'\|'huge'` | `'medium'` | Dropdown size. |
| on-clickoutside | `(e: MouseEvent) => void` | `undefined` | Callback function triggered when there is a click outside of the component. |
| on-select | `(key: string \| number) => void` | `undefined` | Callback function for after an option is selected. |

For other props, for example `placement`, please see [Popover Props](popover#Props). Note that `raw` is not available.

### DropdownOption Type

| Property | Type               | Description                         |
| -------- | ------------------ | ----------------------------------- |
| icon?    | `() => VNodeChild` | Custom render function of an option icon. |
| key      | `string \| number` | Option ID (should be unique).       |
| label    | `string`           | Displayed label value.              |
| disabled | `boolean`          | Whether to disable the option.      |

### DropdownDivider Type

| Property | Type               | Description                      |
| -------- | ------------------ | -------------------------------- |
| type     | `'divider'`        | The type of the DropdownDivider. |
| key      | `string \| number` | Divider ID (should be unique).   |

### DropdownSubmenu Type

| Property | Type | Description |
| --- | --- | --- |
| type | `'submenu'` | The type of the DropdownSubmenu. |
| label | `string` | Displayed label value. |
| icon? | `() => VNodeChild` | Custom rendering function of the option icon. |
| key | `string \| number` | Submenu ID (should be unique). |
| children | `Array<DropdownOption \| DropdownDivider \| DropdownSubmenu>` | Children options of DropdownSubmenu. |
| disabled | `boolean` | Whether to disable the option. |

### DropdownGroup Type

| Property | Type | Description |
| --- | --- | --- |
| type | `'group'` | The type of the DropdownGroup. |
| label | `string` | Group label value. |
| icon? | `() => VNodeChild` | Custom rendering function of the group icon. |
| key | `string \| number` | Group ID (should be unique). |
| children | `Array<DropdownOption \| DropdownDivider \| DropdownSubmenu>` | Children options of DropdownGroup. |

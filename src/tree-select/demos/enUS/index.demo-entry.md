# Tree Select

It's said that 99% of the people can't distinguish the `TreeSelect` component from the `Cascader` component.

## Demos

```demo
basic
custom-field
multiple
checkbox
check-strategy
filterable
action
debug
```

## API

### TreeSelect Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| cascade | `boolean` | `false` | Whether to link the selection of parent and child nodes. |  |
| checkable | `boolean` | `false` | Whether to use a checkbox to select values. |  |
| check-strategy | `string` | `'all'` | How to display selected nodes when parents and children are selected. |  |
| children-field | `string` | `'children'` | The children property to use for `TreeSelectOption`'s. |  |
| clearable | `boolean` | `false` | Whether the selection is clearable. |  |
| consistent-menu-width | `boolean` | `true` | Force the widths of selection input and menu to be equal. \*This will disable virtual scrolling. |  |
| default-value | `string \| number \| Array<string \| number> \| null` | `null` | Selected key (or keys when `multiple`) by default. |  |
| default-expand-all | `boolean` | `false` | Expand all nodes by default. |  |
| default-expanded-keys | `Array<string \| number>` | `[]` | Expand specific keys by default. |  |
| disabled | `boolean` | `false` | Disabled state. |  |
| expanded-keys | `Array<string \| number>` | `undefined` | Collection of expanded keys. |  |
| indeterminate-keys | `Array<string \| number>` | `undefined` | Indeterminate keys of the tree. |  |
| filterable | `boolean` | `false` | Whether to show a filter. |  |
| filter | `(pattern: string, option: TreeSelectOption) => boolean` | - | Filter function. |  |
| key-field | `string` | `'key'` | The key field used for `TreeSelectOption`. |  |
| label-field | `string` | `'label'` | The label field used for `TreeSelectOption`. |  |
| max-tag-count | `number \| 'responsive'` | `undefined` | Maximum number of selected options to show before the list is truncated. `'responsive'` will keep all of the selected options in one row. |  |
| menu-props | `HTMLAttributes` | `undefined` | The menu's dom props. | 2.22.0 |
| multiple | `boolean` | `false` | Allow selecting multiple options. |  |
| options | `TreeSelectOption[]` | `[]` | Options. |  |
| placeholder | `string` | `'Please Select'` | Placeholder. |  |
| separator | `string` | `' / '` | Option value separator. |  |
| show-path | `boolean` | `false` | Whether to also show the hierarchy of selected nodes in the label. |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Component size. |  |
| value | `string \| number \| Array<string \| number> \| null>` | `undefined` | Selected key (or keys when multiple). |  |
| virtual-scroll | `boolean` | `true` | Whether to enable virtual scrolling. |  |
| on-blur | `(e: FocusEvent) => void` | `undefined` | Callback on blur. |  |
| on-focus | `(e: FocusEvent) => void` | `undefined` | Callback on focus. |  |
| on-update:expanded-keys | `(value: Array<string \| number>) => void` | `undefined` | Callback on expanded keys updated. |  |
| on-update:indeterminate-keys | `(keys: Array<string \| number>) => void` | `undefined` | Callback function on indeterminate options changing. |  |
| on-update:value | `(value: string \| number \| Array<string \| number> \| null, option: TreeSelectOption \| null \| Array<TreeSelectOption \| null>) => void` | `undefined` | Callback on value updated. |  |

### TreeSelectOption Properties

| Name | Type | Description |
| --- | --- | --- |
| key | `string \| number` | Unique option key. The field used can be set using `key-field`. |
| label | `string` | Displayed content of the option. The field used can be set using `label-field`. |
| children? | `TreeSelectOption[]` | Child options of the option. The field used can be set using `children-field` |
| disabled? | `boolean` | Option disabled state. |

### TreeSelect Slots

| Name   | Parameters | Description                            | Version |
| ------ | ---------- | -------------------------------------- | ------- |
| action | `()`       | Options menu slot.                     | 2.22.0  |
| empty  | `()`       | Empty state slot for the options menu. | 2.22.0  |

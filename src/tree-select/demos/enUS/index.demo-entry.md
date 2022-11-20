# Tree Select

It's said that 99% of the people can't distinguish the `TreeSelect` component from the `Cascader` component.

## Demos

```demo
basic.vue
custom-field.vue
multiple.vue
checkbox.vue
check-strategy.vue
filterable.vue
action.vue
async.vue
status.vue
debug.vue
```

## API

### TreeSelect Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| allow-checking-not-loaded | `boolean` | `false` | Whether to allow cascade checking on not loaded nodes. If you want to use this, you should know the `value` may be incomplete. Also, you should aware about the consistency bewteen naive's checking logic and your backend's checking logic, especially when there are disabled nodes. | 2.28.1 |
| cascade | `boolean` | `false` | Whether to link the selection of parent and child nodes. |  |
| checkable | `boolean` | `false` | Whether to use a checkbox to select values. |  |
| check-strategy | `string` | `'all'` | How to display selected nodes when parents and children are selected. |  |
| children-field | `string` | `'children'` | The children property to use for `TreeSelectOption`'s. |  |
| clearable | `boolean` | `false` | Whether the selection is clearable. |  |
| clear-filter-after-select | `boolean` | `true` | When multiple and filter is true, whether to clear filter keyword after select an option. | 2.25.3 |
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
| disabled-field | `string` | `'disabled'` | The disabled field used for `TreeSelectOption`. | 2.32.2 |
| loading | `boolean` | `false` | Whether it's loading. | 2.28.3 |
| max-tag-count | `number \| 'responsive'` | `undefined` | Maximum number of selected options to show before the list is truncated. `'responsive'` will keep all of the selected options in one row. |  |
| menu-props | `HTMLAttributes` | `undefined` | The menu's dom props. | 2.22.0 |
| multiple | `boolean` | `false` | Allow selecting multiple options. |  |
| node-props | `(info: { option: TreeSelectOption }) => HTMLAttributes` | `undefined` | HTML attributes of node. | 2.30.7 |
| options | `TreeSelectOption[]` | `[]` | Options. |  |
| placeholder | `string` | `'Please Select'` | Placeholder. |  |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'bottom-start'` | Tree select menu's placement. | 2.25.0 |
| render-label | `(info: { option: TreeSelectOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | Render function of all the options' label. | 2.30.7 |
| render-prefix | `(info: { option: TreeSelectOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | Render function of all the options' prefix. | 2.30.7 |
| render-suffix | `(info: { option: TreeSelectOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | Render function of all the options' suffix. | 2.30.7 |
| render-switcher-icon | `() => VNodeChild` | `undefined` | Render function of option switcher icon. | 2.30.7 |
| render-tag | `(props: { option: TreeSelectOption, handleClose: () => void }) => VNodeChild` | `undefined` | Render function for each option tag. | 2.30.7 |
| separator | `string` | `' / '` | Option value separator. |  |
| show-path | `boolean` | `false` | Whether to also show the hierarchy of selected nodes in the label. |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Component size. |  |
| status | `'success' \| 'warning' \| 'error'` | `undefined` | Validation status. | 2.27.0 |
| to | `string \| HTMLElement \| false` | `body` | Container node of the menu. `false` will keep it not detached. |  |
| value | `string \| number \| Array<string \| number> \| null>` | `undefined` | Selected key (or keys when multiple). |  |
| virtual-scroll | `boolean` | `true` | Whether to enable virtual scrolling. |  |
| on-blur | `(e: FocusEvent) => void` | `undefined` | Callback on blur. |  |
| on-focus | `(e: FocusEvent) => void` | `undefined` | Callback on focus. |  |
| on-load | `(node: TreeSelectOption) => Promise<void>` | `undefined` | Callback function for asynchronously loading data. | 2.27.0 |
| on-update:expanded-keys | `(value: Array<string \| number>, meta: { node: TreeOption \| null, action: 'expand' \| 'collapse' \| 'filter' }) => void` | `undefined` | Callback on expanded keys updated. | `meta` 2.34.0 |
| on-update:indeterminate-keys | `(keys: Array<string \| number>) => void` | `undefined` | Callback function on indeterminate options changing. |  |
| on-update:value | `(value: string \| number \| Array<string \| number> \| null, option: TreeSelectOption \| null \| Array<TreeSelectOption \| null>, meta: { node: TreeOption \| null, action: 'select' \| 'unselect' \| 'delete' \| 'clear' }) => void) => void` | `undefined` | Callback on value updated. |  |

### TreeSelectOption Properties

| Name | Type | Description | Version |
| --- | --- | --- | --- |
| key | `string \| number` | Unique option key. The field used can be set using `key-field`. |  |
| label | `string` | Displayed content of the option. The field used can be set using `label-field`. |  |
| children? | `TreeSelectOption[]` | Child options of the option. The field used can be set using `children-field` |  |
| disabled? | `boolean` | Option disabled state. |  |
| isLeaf? | `boolean` | Whether the node is leaf. Required in async mode. | 2.27.0 |

### TreeSelect Slots

| Name   | Parameters | Description                            | Version |
| ------ | ---------- | -------------------------------------- | ------- |
| action | `()`       | Options menu slot.                     | 2.22.0  |
| arrow  | `()`       | Arrow icon of trigger.                 | 2.30.4  |
| empty  | `()`       | Empty state slot for the options menu. | 2.22.0  |

### TreeSelect Methods

| Name | Type | Description | Version |
| --- | --- | --- | --- |
| blur | `() => void` | Blur. | 2.34.0 |
| focus | `() => void` | Focus. | 2.34.0s |
| getCheckedData | `() => { keys: Array<string \| number>, options: Array<TreeOption \| null> }` | Get checked data. | 2.34.0 |
| getIndeterminateData | `() => { keys: Array<string \| number>, options: Array<TreeOption \| null> }` | Get indeterminate data. | 2.34.0 |

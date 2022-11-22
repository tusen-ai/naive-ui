# Tree

To be honest, I'm not good at biology. I can figure out few kinds of trees.

What's more, not only biology, I forget balanced tree everytime after I revise it shortly.

## Demos

```demo
basic.vue
custom-field.vue
multiple.vue
cascade.vue
filter.vue
drag-drop.vue
virtual.vue
async.vue
disabled.vue
prefix-and-suffix.vue
batch-render.vue
switcher-icon.vue
node-props.vue
checkbox-placement.vue
```

## API

### Tree Props

| Name | Type | default | Description | Version |
| --- | --- | --- | --- | --- |
| accordion | `boolean` | `false` | Whether to use accrodion expand mode. | 2.31.0 |
| allow-checking-not-loaded | `boolean` | `false` | Whether to allow cascade checking on not loaded nodes. If you want to use this, you should know the `check-keys` may be incomplete. Also, you should aware about the consistency bewteen naive's checking logic and your backend's checking logic, especially when there are disabled nodes. | 2.28.1 |
| allow-drop | `(info: { dropPosition: DropPosition, node: TreeOption, phase: 'drag' \| 'drop' }) => boolean` | A function that prohibit dropping inside leaf node. | Whether to allow dropping. |  |
| animated | `boolean` | `true` | Whether to show expand animation. | 2.33.4 |
| block-line | `boolean` | `false` | Nodes spread out the whole row. |  |
| block-node | `boolean` | `false` | The node name is spread out in the whole row. |  |
| cancelable | `boolean` | `true` | Whether node's select status can be cancelled. |  |
| cascade | `boolean` | `false` | Whether to cascade checkboxes. |  |
| check-strategy | `string` | `'all'` | The strategy of setting checked callback's keys argument. `all` means setting all checked node. `parent` means setting all checked parent node of whom all child node are checked. `child` means setting all child node. |  |
| checkable | `boolean` | `false` | Whether to display the selection box, you need to set `cascade` to `true`. |  |
| checkbox-placement | `'left' \| 'right'` | `'left'` | Checkbox's placement. | 2.28.3 |
| children-field | `string` | `'children'` | The children field in `TreeOption`. |  |
| checked-keys | `Array<string \| number>` | `undefined` | Checked keys of the tree. |  |
| check-on-click | `boolean \| ((node: TreeOption) => boolean)` | `false` | Allow node clicking to trigger check when `checkable` is `true`. | 2.31.0 |
| data | `Array<TreeOption>` | `[]` | The node data of the tree. Reset `data` will cause clearing of some uncontrolled status. If you need to modify data, you'd better make tree work in a controlled manner. |  |
| default-checked-keys | `Array<string \| number>` | `[]` | Multiple options selected by default. |  |
| default-expand-all | `boolean` | `false` | Expand all options. |  |
| default-expanded-keys | `Array<string \| number>` | `[]` | Expanded items by default. |  |
| default-selected-keys | `Array<string \| number>` | `[]` | Nodes selected by default. |  |
| draggable | `boolean` | `false` | Whether it can be dragged. |  |
| expand-on-dragenter | `boolean` | `true` | Whether to expand nodes after dragenter. |  |
| expand-on-click | `boolean` | `false` | Whether to expand or collapse nodes after click. | 2.29.1 |
| expanded-keys | `Array<string \| number>` | `undefined` | If set, expanded status will work in controlled manner. |  |
| filter | `(pattern: string, node: TreeOption) => boolean` | A simple string based filter. | The function that filter tree nodes based on pattern. |  |
| indeterminate-keys | `Array<string \| number>` | `undefined` | Indeterminate keys of the tree. |  |
| keyboard | `boolean` | `true` | Whether to support keyboard operation. | 2.32.2 |
| key-field | `string` | `'key'` | The key field in `TreeOption`. |  |
| label-field | `string` | `'label'` | The label field in `TreeOption`. |  |
| disabled-field | `string` | `'disabled'` | The disabled field in `TreeOption`. | 2.32.2 |
| node-props | `(info: { option: TreeOption }) => HTMLAttributes` | `undefined` | HTML attributes of node. | 2.25.0 |
| multiple | `boolean` | `false` | Whether to allow multiple selection of nodes. |  |
| on-load | `(node: TreeOption) => Promise<void>` | `undefined` | Callback function for asynchronously loading data. |  |
| pattern | `string` | `''` | What to search by default. |  |
| render-label | `(info: { option: TreeOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | Render function of all the options' label. |  |
| render-prefix | `(info: { option: TreeOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | Render function of all the options' prefix. |  |
| render-suffix | `(info: { option: TreeOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | Render function of all the options' suffix. |  |
| render-switcher-icon | `(props: { expanded: boolean, selected: boolean }) => VNodeChild` | `undefined` | Render function of option switcher icon. | 2.24.0, `props` 2.34.0 |
| selectable | `boolean` | `true` | Whether the node can be selected. |  |
| selected-keys | `Array<string \| number>` | `undefined` | If set, selected status will work in controlled manner. |  |
| show-irrelevant-nodes | `boolean` | `true` | Whether to filter unmached nodes when tree is in filter mode. | 2.28.1 |
| virtual-scroll | `boolean` | `false` | Whether to enable virtual scroll. You need to set proper style height of the tree in advance. |  |
| watch-props | `Array<'defaultCheckedKeys' \| 'defaultSelectedKeys' \|'defaultExpandedKeys'>` | `undefined` | Default prop names that needed to be watched. Components will be updated after the prop is changed. Note: the `watch-props` itself is not reactive. |  |
| on-dragend | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` | The callback function after the node completes the dragging action. |  |
| on-dragenter | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` | Callback function in node drag and drop. |  |
| on-dragleave | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` | Drag a node, the callback function after the node leaves other nodes. |  |
| on-dragstart | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` | Callback function to start dragging a certain node. |  |
| on-drop | `(data: { node: TreeOption, dragNode: TreeOption, dropPosition: 'before' \| 'inside' \| 'after', event: DragEvent }) => void` | `undefined` | The callback function after the node completes the dragging action. |  |
| on-update:checked-keys | `(keys: Array<string \| number>, option: Array<TreeOption \| null>), meta: { node: TreeOption \| null, action: 'check' \| 'uncheck' }) => void` | `undefined` | Callback function when node checked options change. | `meta` 2.34.0 |
| on-update:indeterminate-keys | `(keys: Array<string \| number>, option: Array<TreeOption \| null>) => void` | `undefined` | Callback function when node indeterminate options change. |  |
| on-update:expanded-keys | `(keys: Array<string \| number>, option: Array<TreeOption \| null>), meta: { node: TreeOption \| null, action: 'expand' \| 'collapse' \| 'filter' }) => void` | `undefined` | The callback function when the node expansion item changes. | `meta` 2.34.0 |
| on-update:selected-keys | `(keys: Array<string \| number>, option: Array<TreeOption \| null>), meta: { node: TreeOption, action: 'select' \| 'unselect' }) => void` | `undefined` | The callback function when the selected item of the node changes. | `meta` 2.34.0 |

### TreeOption Properties

| Name | Type | Description |
| --- | --- | --- |
| key | `string \| number` | Key of the node, should be unique. You can use `key-field` to customize the field name. |
| label | `string` | Label of the node. You can use `label-field` to customize the field name. |
| checkboxDisabled? | `boolean` | Whether the checkbox is disabled. |
| children? | `TreeOption[]` | Child nodes of the node. |
| disabled? | `boolean` | Whether the node is disabled. |
| isLeaf? | `boolean` | Whether the node is leaf. Required in async expanding mode. |
| prefix? | `string \| (() => VNodeChild)` | Prefix of the node. |
| suffix? | `string \| (() => VNodeChild)` | Suffix of the node. |

## Methods

### Tree Methods

| Name | Paramaters | Description | Version |
| --- | --- | --- | --- |
| scrollTo | `(options: { key: string \| number })` | Scroll to some node in virtual scroll mode. | 2.32.2 |
| getCheckedData | `() => { keys: Array<string \| number>, options: Array<TreeOption \| null> }` | Get checked data. | 2.34.1 |
| getIndeterminateData | `() => { keys: Array<string \| number>, options: Array<TreeOption \| null> }` | Get indeterminate data. | 2.34.1 |

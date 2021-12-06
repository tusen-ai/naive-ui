# Tree

To be honest, I'm not good at biology. I can figure out few kinds of trees.

What's more, not only biology, I forget balanced tree everytime after I revise it shortly.

## Demos

```demo
basic
custom-field
cascade
multiple
filter
drag-drop
virtual
async
disabled
prefix-and-suffix
batch-render
```

## API

### Tree Props

| Name | Type | default | Description |
| --- | --- | --- | --- |
| allow-drop | `(info: { dropPosition: DropPosition, node: TreeOption, phase: 'drag' \| 'drop' }) => boolean` | A function that prohibit dropping inside leaf node. | Whether to allow dropping. |
| block-line | `boolean` | `false` | Nodes spread out the whole row. |
| block-node | `boolean` | `false` | The node name is spread out in the whole row. |
| cancelable | `boolean` | `true` | Whether node's select status can be cancelled. |
| cascade | `boolean` | `false` | Whether to cascade checkboxes. |
| check-strategy | `string` | `'all'` | The strategy of setting checked callback's keys argument. `all` means setting all checked node. `parent` means setting all checked parent node of whom all child node are checked. `child` means setting all child node. |
| checkable | `boolean` | `false` | Whether to display the selection box, you need to set `cascade` to `true`. |
| children-field | `string` | `'children'` | The children field in `TreeOption`. |
| checked-keys | `Array<string \| number>` | `undefined` | Checked keys of the tree. |
| data | `Array<TreeOption>` | `[]` | The node data of the tree. Reset `data` will cause clearing of some uncontrolled status. If you need to modify data, you'd better make tree work in a controlled manner. |
| default-checked-keys | `Array<string \| number>` | `[]` | Multiple options selected by default. |
| default-expand-all | `boolean` | `false` | Expand all options. |
| default-expanded-keys | `Array<string \| number>` | `[]` | Expanded items by default. |
| default-selected-keys | `Array<string \| number>` | `[]` | Nodes selected by default. |
| draggable | `boolean` | `false` | Whether it can be dragged. |
| expand-on-dragenter | `boolean` | `true` | Whether to expand nodes after dragenter. |
| expanded-keys | `Array<string \| number>` | `undefined` | If set, expanded status will work in controlled manner. |
| filter | `(pattern: string, node: TreeOption) => boolean` | A simple string based filter | The function that filter tree nodes based on pattern. |
| indeterminate-keys | `Array<string \| number>` | `undefined` | Indeterminate keys of the tree. |
| key-field | `string` | `'key'` | The key field in `TreeOption`. |
| label-field | `string` | `'label'` | The label field in `TreeOption`. |
| leaf-only | `boolean` | `false` | Whether to open or not, only the bottom tree node is optional. |
| multiple | `boolean` | `false` | Whether to allow multiple selection of nodes. |
| on-load | `(node: TreeOption) => Promise<void>` | `undefined` | Callback function for asynchronously loading data. |
| pattern | `string` | `''` | What to search by default. |
| remote | `boolean` | `false` | Whether to load nodes async. It should work with `on-load`. |
| render-label | `(info: {option: TreeOption, checked: boolean, selected: boolean}) => VNodeChild` | `undefined` | Render function of all the options' label. |
| render-prefix | `(info: {option: TreeOption, checked: boolean, selected: boolean}) => VNodeChild` | `undefined` | Render function of all the options' prefix. |
| render-suffix | `(info: {option: TreeOption, checked: boolean, selected: boolean}) => VNodeChild` | `undefined` | Render function of all the options' suffix. |
| selectable | `boolean` | `true` | Whether the node can be selected. |
| selected-keys | `Array<string \| number>` | `undefined` | If set, selected status will work in controlled manner. |
| virtual-scroll | `boolean` | `false` | Whether to enable virtual scroll. You need to set proper style height of the tree in advance. |
| watch-props | `Array<'defaultCheckedKeys' \| 'defaultSelectedKeys' \|'defaultExpandedKeys'>` | `undefined` | Default prop names that needed to be watched. Components will be updated after the prop is changed. Note: the `watch-props` itself is not reactive. |
| on-dragend | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` | The callback function after the node completes the dragging action. |
| on-dragenter | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` | Callback function in node drag and drop. |
| on-dragleave | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` | Drag a node, the callback function after the node leaves other nodes. |
| on-dragstart | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` | Callback function to start dragging a certain node. |
| on-drop | `(data: { node: TreeOption, dragNode: TreeOption, dropPosition: 'before' \| 'inside' \| 'after', event: DragEvent }) => void` | `undefined` | The callback function after the node completes the dragging action. |
| on-update:checked-keys | `(keys: Array<string \| number>, option: Array<TreeOption \| null>)) => void` | `undefined` | Callback function when node checked options change. |
| on-update:indeterminate-keys | `(keys: Array<string \| number>, option: Array<TreeOption \| null>)) => void` | `undefined` | Callback function when node indeterminate options change. |
| on-update:expanded-keys | `(keys: Array<string \| number>, option: Array<TreeOption \| null>)) => void` | `undefined` | The callback function when the node expansion item changes. |
| on-update:selected-keys | `(keys: Array<string \| number>, option: Array<TreeOption \| null>)) => void` | `undefined` | The callback function when the selected item of the node changes. |

### TreeOption Properties

| Name | Type | Description |
| --- | --- | --- |
| key | `string \| number` | Key of the node, should be unique. You can use `key-field` to customize the field name. |
| label | `string` | Label of the node. You can use `label-field` to customize the field name. |
| checkboxDisabled? | `boolean` | Whether the checkbox is disabled. |
| children? | `TreeOption[]` | Child nodes of the node. |
| disabled? | `boolean` | Whether the node is disabled. |
| isLeaf? | `boolean` | Whether the node is leaf. Required in remote mode. |
| prefix? | `string \| (() => VNodeChild)` | Prefix of the node. |
| suffix? | `string \| (() => VNodeChild)` | Suffix of the node. |

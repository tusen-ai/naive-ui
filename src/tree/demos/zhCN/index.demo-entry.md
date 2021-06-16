# 树 Tree

老实说我生物不好，认不出几种树来。

以及，不光是生物不好，平衡树也是看了就忘。

## 演示

```demo
basic
cascade
multiple
filter
drag-drop
virtual
async
disabled
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| allow-drop | `(info: { dropPosition: DropPosition, node: TreeOption, phase: 'drag' \| 'drop' }) => boolean` | 一个不允许 drop 在叶节点内部的函数 | 是否允许 drop |
| block-line | `boolean` | `false` |  |
| block-node | `boolean` | `false` |  |
| cancelable | `boolean` | `true` | 选中之后是否允许取消 |
| cascade | `boolean` | `false` | 是否关联选项 |
| checkable | `boolean` | `false` |  |
| checked-keys | `Array<string \| number>` | `undefined` | 如果设定则 checked 状态受控 |
| data | `Array<TreeNode>` | `[]` | 树的节点数据。重新设置 data 会将一些非受控状态清空，如果你需要在使用中改动 data，最好以受控的方式控制树 |
| default-checked-keys | `Array<string \| number>` | `[]` |  |
| default-expand-all | `boolean` | `false` |  |
| default-expanded-keys | `Array<string \| number>` | `[]` |  |
| default-selected-keys | `Array<string \| number>` | `[]` |  |
| draggable | `boolean` | `false` |  |
| expand-on-dragenter | `boolean` | `true` | 是否在拖入后展开节点 |
| expanded-keys | `Array<string \| number>` | `undefined` | 如果设定则展开受控 |
| filter | `(node: TreeNode) => boolean` | 一个简单的字符串过滤算法 |  |
| multiple | `boolean` | `false` |  |
| on-load | `(node: TreeNode) => Promise<void>` | `undefined` |  |
| pattern | `string` | `''` |  |
| remote | `boolean` | `false` | 是否异步获取选项，和 onLoad 配合 |
| selectable | `boolean` | `true` |  |
| selected-keys | `Array<string \| number>` | `undefined` | 如果设定则 selected 状态受控 |
| virtual-scroll | `boolean` | `false` | 是否启用虚拟滚动，启用前你需要设定好树的高度样式 |
| on-dragend | `(data: { node: TreeNode, event: DragEvent }) => void` | `undefined` |  |
| on-dragenter | `(data: { node: TreeNode, event: DragEvent }) => void` | `undefined` |  |
| on-dragleave | `(data: { node: TreeNode, event: DragEvent }) => void` | `undefined` |  |
| on-dragstart | `(data: { node: TreeNode, event: DragEvent }) => void` | `undefined` |  |
| on-drop | `(data: { node: TreeNode, dragNode: TreeNode, dropPosition: 'before' \| 'inside' \| 'after', event: DragEvent }) => void` | `undefined` |  |
| on-update:checked-keys | `(keys: Array<string \| number>) => void` | `undefined` |  |
| on-update:expanded-keys | `(keys: Array<string \| number>) => void` | `undefined` |  |
| on-update:selected-keys | `(keys: Array<string \| number>) => void` | `undefined` |  |

## API

### TreeNode Properties

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| key | `string \| number` | 节点的 key，需要唯一 |
| label | `string` | 节点的内容 |
| checkboxDisabled? | `boolean` | 是否禁用节点的 checkbox |
| children? | `TreeNode[]` | 节点的子节点 |
| disabled? | `boolean` | 是否禁用节点 |
| isLeaf? | `boolean` | 节点是否是叶节点，在 remote 模式下是必须的 |

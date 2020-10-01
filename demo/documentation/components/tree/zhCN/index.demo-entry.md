# 树 Tree
老实说我生物不好，认不出几种树来。

以及，不光是生物不好，平衡树也是看了就忘。

## 演示
```demo
basic
async
multiple
filter
drag-drop-debug
```

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|block-node|`boolean`|`false`||
|cancelable|`boolean`|`false`|选中之后是否允许取消|
|checkable|`boolean`|`false`||
|checked-keys|`Array<string \| number>`|`null`|如果设定则 checked 状态受控|
|data|`Array<TreeNode>`|`[]`|树的节点数据。重新设置 data 会将一些非受控状态清空，如果你需要在使用中改动 data，最好以受控的方式控制树|
|default-checked-keys|`Array<string \| number>`|`[]`||
|default-expand-all|`boolean`|`false`||
|default-expanded-keys|`Array<string \| number>`|`[]`||
|default-selected-keys|`Array<string \| number>`|`[]`||
|expand-on-dragenter|`boolean`|`true`|是否在拖入后展开节点|
|expanded-keys|`Array<string \| number>`|`null`|如果设定则展开受控|
|filter|`(node: TreeNode) => boolean`|一个简单的字符串过滤算法||
|multiple|`boolean`|`false`||
|on-load|`(node: TreeNode) => Promise<any>`|`null`||
|pattern|`string`|`''`||
|remote|`boolean`|`false`|是否异步获取选项，和 onLoad 配合|
|selectable|`boolean`|`true`||
|selected-keys|`Array<string \| number>`|`null`|如果设定则 selected 状态受控|
|theme|`'light' \| 'dark' \| null \| string`|`null`||
|on-update:selected-keys|`(keys: Array<string \| number>) => any`|`undefined`||
|on-update:expanded-keys|`(keys: Array<string \| number>) => any`|`undefined`||
|on-update:checked-keys|`(keys: Array<string \| number>) => any`|`undefined`||
<!-- |draggable|`boolean`|`false`|| -->

<!-- |dragstart|`(data: { node: TreeNode, event: DragEvent })`||
|dragend|`(data: { node: TreeNode, event: DragEvent })`||
|dragenter|`(data: { node: TreeNode, event: DragEvent })`||
|dragleave|`(data: { node: TreeNode, event: DragEvent })`||
|drop|`(data: { node: TreeNode, dragNode: TreeNode, dropPosition: 'top' \| 'center' \| 'bottom', event: DragEvent })`|| -->
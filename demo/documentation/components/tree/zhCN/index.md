# 树 Tree
老实说我生物不好，认不出几种树来。

以及，不光是生物不好，平衡树也是看了就忘。

## 演示
```demo
basic
drag-drop
async
multiple
filter
```
## V-model
|Prop|Event|
|-|-|
|selected-keys|`selected-keys-change`|

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null`|`null`||
|expand-on-dragenter|`boolean`|`true`|是否在拖入后展开节点|
|block-node|`boolean`|`false`||
|data|`Array<TreeNode>`|`[]`|树的节点数据。重新设置 data 会将一些非受控状态清空，如果你需要在使用中改动 data，最好以受控的方式控制树|
|draggable|`boolean`|`false`||
|checkable|`boolean`|`false`||
|multiple|`boolean`|`false`||
|selectable|`boolean`|`true`||
|default-expand-all|`boolean`|`false`||
|cancelable|`boolean`|`false`|选中之后是否允许取消|
|remote|`boolean`|`false`|是否异步获取选项，和 onLoad 配合|
|on-load|`(node: TreeNode) => Promise<any>`|`null`||
|default-expanded-keys|`Array<string \| number>`|`[]`||
|expanded-keys|`Array<string \| number>`|`null`|如果设定则展开受控|
|selected-keys|`Array<string \| number>`|`null`|如果设定则 selected 状态受控|
|default-selected-keys|`Array<string \| number>`|`[]`||
|checked-keys|`Array<string \| number>`|`null`|如果设定则 checked 状态受控|
|default-checked-keys|`Array<string \| number>`|`[]`||
|pattern|`string`|`''`||
|filter|`(node: TreeNode) => boolean`|一个简单的字符串过滤算法||

## Events
|名称|参数|说明|
|-|-|-|
|selected-keys-change|`(keys: Array<string \| number>)`||
|expanded-keys-change|`(keys: Array<string \| number>)`||
|checked-keys-change|`(keys: Array<string \| number>)`||
|dragstart|`(data: { node: TreeNode, event: DragEvent })`||
|dragend|`(data: { node: TreeNode, event: DragEvent })`||
|dragenter|`(data: { node: TreeNode, event: DragEvent })`||
|dragleave|`(data: { node: TreeNode, event: DragEvent })`||
|drop|`(data: { node: TreeNode, dragNode: TreeNode, dropPosition: 'top' \| 'center' \| 'bottom', event: DragEvent })`||
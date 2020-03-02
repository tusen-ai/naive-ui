# Tree
To be honest, I'm not good at biology. I can figure out few kinds of trees.

What's more, not only biology, I forget balanced tree everytime after I revise it shortly.


## Demos
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
|Name|Type|default|Description|
|-|-|-|-|
|expand-on-dragenter|`boolean`|`true`|Whether to expand nodes after dragenter|
|block-node|`boolean`|`false`||
|data|`Array<TreeNode>`|`[]`|The node data of the tree. Reset `data` will cause clearing of some uncontrolled status. If you need to modify data, you'd better make tree work in a controlled manner.|
|draggable|`boolean`|`false`||
|checkable|`boolean`|`false`||
|multiple|`boolean`|`false`||
|selectable|`boolean`|`true`||
|default-expand-all|`boolean`|`false`||
|cancelable|`boolean`|`false`|Whether node's select status can be cancelled.|
|remote|`boolean`|`false`|Whether to load nodes async. It should work with `on-load`
|on-load|`(node: TreeNode) => Promise<any>`|`null`||
|default-expanded-keys|`Array<string \| number>`|`[]`||
|expanded-keys|`Array<string \| number>`|`null`|If set, expanded status will work in controlled manner.|
|selected-keys|`Array<string \| number>`|`null`|If set, selected status will work in controlled manner.|
|default-selected-keys|`Array<string \| number>`|`[]`||
|checked-keys|`Array<string \| number>`|`null`|If set, checked status will work in controlled manner.|
|default-checked-keys|`Array<string \| number>`|`[]`||
|pattern|`string`|`''`||
|filter|`(node: TreeNode) => boolean`|A simple string based filter||

## Events
|Name|Parameters|Description|
|-|-|-|
|selected-keys-change|`(Array<string \| number>)`||
|expanded-keys-change|`(Array<string \| number>)`||
|checked-keys-change|`(Array<string \| number>)`||
|dragstart|`({ node: TreeNode, event: DragEvent })`||
|dragend|`({ node: TreeNode, event: DragEvent })`||
|dragenter|`({ node: TreeNode, event: DragEvent })`||
|dragleave|`({ node: TreeNode, event: DragEvent })`||
|drop|`({ node: TreeNode, dragNode: TreeNode, dropPosition: 'top' \| 'center' \| 'bottom', event: DragEvent })`||
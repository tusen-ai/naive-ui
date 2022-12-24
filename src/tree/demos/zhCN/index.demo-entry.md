# 树 Tree

老实说我生物不好，认不出几种树来。

以及，不光是生物不好，平衡树也是看了就忘。

## 演示

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
check-strategy-debug.vue
change-debug.vue
scrollbar-debug.vue
scroll-debug.vue
rtl-debug.vue
expand-debug.vue
```

## API

### Tree Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| accordion | `boolean` | `false` | 是否使用手风琴展开模式 | 2.31.0 |
| allow-checking-not-loaded | `boolean` | `false` | 是否允许级联勾选还没有完全加载的节点。如果你要用这个属性，请记住 `checked-keys` 可能是不完整的，并且请注意勾选行为和后端计算逻辑的一致性，尤其是有禁用节点的情况下 | 2.28.1 |
| allow-drop | `(info: { dropPosition: DropPosition, node: TreeOption, phase: 'drag' \| 'drop' }) => boolean` | 一个不允许 drop 在叶节点内部的函数 | 是否允许 drop |  |
| animated | `boolean` | `true` | 是否有展开动画 | 2.33.4 |
| block-line | `boolean` | `false` | 节点整行撑开 |  |
| block-node | `boolean` | `false` | 节点名称整行撑开 |  |
| cancelable | `boolean` | `true` | 选中之后是否允许取消 |  |
| cascade | `boolean` | `false` | 是否关联选项 |  |
| check-strategy | `string` | `'all'` | 设置勾选策略来指定勾选回调返回的值，`all` 表示回调函数值为全部选中节点；`parent` 表示回调函数值为父节点（当父节点下所有子节点都选中时）；`child` 表示回调函数值为子节点 |  |
| checkable | `boolean` | `false` | 是否显示选择框 |  |
| checkbox-placement | `'left' \| 'right'` | `'left'` | 复选框的位置 | 2.28.3 |
| children-field | `string` | `'children'` | 替代 `TreeOption` 中的 children 字段名 |  |
| checked-keys | `Array<string \| number>` | `undefined` | 如果设定则 `checked` 状态受控 |  |
| check-on-click | `boolean \| ((node: TreeOption) => boolean)` | `false` | 是否允许点击节点进行勾选，仅在 `checkable` 为 `true` 时生效 | 2.31.0 |
| data | `Array<TreeOption>` | `[]` | 树的节点数据。重新设置 `data` 会将一些非受控状态清空，如果你需要在使用中改动 `data`，最好以受控的方式控制树 |  |
| default-checked-keys | `Array<string \| number>` | `[]` | 默认选中的多选项 |  |
| default-expand-all | `boolean` | `false` | 展开全部选项 |  |
| default-expanded-keys | `Array<string \| number>` | `[]` | 默认展开项 |  |
| default-selected-keys | `Array<string \| number>` | `[]` | 默认选中的节点 |  |
| draggable | `boolean` | `false` | 是否可拖拽 |  |
| expand-on-dragenter | `boolean` | `true` | 是否在拖入后展开节点 |  |
| expand-on-click | `boolean` | `false` | 是否在点击节点后展开或收缩节点 | 2.29.1 |
| expanded-keys | `Array<string \| number>` | `undefined` | 如果设定则展开受控 |  |
| filter | `(pattern: string, node: TreeOption) => boolean` | 一个简单的字符串过滤算法 | 基于 pattern 指定过滤节点的函数 |  |
| get-children | `(option: any) => unknown` | `undefined` | 获取当前选项的子选项 | 2.34.3 |
| indeterminate-keys | `Array<string \| number>` | `undefined` | 部分选中选项的 key |  |
| keyboard | `boolean` | `true` | 是否支持键盘操作 | 2.32.2 |
| key-field | `string` | `'key'` | 替代 `TreeOption` 中的 key 字段名 |  |
| label-field | `string` | `'label'` | 替代 `TreeOption` 中的 label 字段名 |  |
| disabled-field | `string` | `'disabled'` | 替代 `TreeOption` 中的 disabled 字段名 | 2.32.2 |
| node-props | `(info: { option: TreeOption }) => HTMLAttributes` | `undefined` | 节点的 HTML 属性 | 2.25.0 |
| multiple | `boolean` | `false` | 是否允许节点多选 |  |
| on-load | `(node: TreeOption) => Promise<unknown>` | `undefined` | 异步加载数据的回调函数，如果没有加载到数据你应该让 Promise resolve `false` 或者 reject 这个 Promise，否则加载动画不会停止 | 非 void Promise 2.34.3 |
| pattern | `string` | `''` | 默认搜索的内容 |  |
| render-label | `(info: { option: TreeOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | 节点内容的渲染函数 |  |
| render-prefix | `(info: { option: TreeOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | 节点前缀的渲染函数 |  |
| render-suffix | `(info: { option: TreeOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | 节点后缀的渲染函数 |  |
| render-switcher-icon | `(props: { expanded: boolean, selected: boolean }) => VNodeChild` | `undefined` | 节点展开开关的渲染函数 | 2.24.0, `props` 2.34.0 |
| selectable | `boolean` | `true` | 节点是否可以被选中 |  |
| selected-keys | `Array<string \| number>` | `undefined` | 如果设定则 `selected` 状态受控 |  |
| show-irrelevant-nodes | `boolean` | `true` | 是否在搜索状态显示和搜索无关的节点 | 2.28.1 |
| virtual-scroll | `boolean` | `false` | 是否启用虚拟滚动，启用前你需要设定好树的高度样式 |  |
| watch-props | `Array<'defaultCheckedKeys' \| 'defaultSelectedKeys' \|'defaultExpandedKeys'>` | `undefined` | 需要检测变更的默认属性，检测后组件状态会更新。注意：`watch-props` 本身不是响应式的 |  |
| on-dragend | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` | 节点完成拖拽动作后的回调函数 |  |
| on-dragenter | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` | 节点拖拽中的回调函数 |  |
| on-dragleave | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` | 拖拽一个节点，该节点离开其它节点后的回调函数 |  |
| on-dragstart | `(data: { node: TreeOption, event: DragEvent }) => void` | `undefined` | 开始拖拽某一个节点的回调函数 |  |
| on-drop | `(data: { node: TreeOption, dragNode: TreeOption, dropPosition: 'before' \| 'inside' \| 'after', event: DragEvent }) => void` | `undefined` | 节点完成拖拽动作后的回调函数 |  |
| on-update:checked-keys | `(keys: Array<string \| number>, option: Array<TreeOption \| null>, meta: { node: TreeOption \| null, action: 'check' \| 'uncheck' }) => void` | `undefined` | 节点勾选项发生变化时的回调函数 | `meta` 2.34.0 |
| on-update:indeterminate-keys | `(keys: Array<string \| number>, option: Array<TreeOption \| null>) => void` | `undefined` | 节点部分勾选项发生变化时的回调函数 |  |
| on-update:expanded-keys | `(keys: Array<string \| number>, option: Array<TreeOption \| null>, meta: { node: TreeOption \| null, action: 'expand' \| 'collapse' \| 'filter' }) => void` | `undefined` | 节点展开项发生变化时的回调函数 | `meta` 2.34.0 |
| on-update:selected-keys | `(keys: Array<string \| number>, option: Array<TreeOption \| null>, meta: { node: TreeOption, action: 'select' \| 'unselect' }) => void` | `undefined` | 节点选中项发生变化时的回调函数 | `meta` 2.34.0 |

### TreeOption Properties

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| key | `string \| number` | 节点的 `key`，需要唯一，可使用 `key-field` 修改字段名 |
| label | `string` | 节点的内容，可使用 `label-field` 修改字段名 |
| checkboxDisabled? | `boolean` | 是否禁用节点的 `checkbox` |
| children? | `TreeOption[]` | 节点的子节点 |
| disabled? | `boolean` | 是否禁用节点 |
| isLeaf? | `boolean` | 节点是否是叶节点，在异步展开状态下是必须的 |
| prefix? | `string \| (() => VNodeChild)` | 节点的前缀 |
| suffix? | `string \| (() => VNodeChild)` | 节点的后缀 |

## Methods

### Tree Methods

| 名称 | 参数 | 说明 | 版本 |
| --- | --- | --- | --- |
| scrollTo | `(options: { key: string \| number })` | 在虚拟滚动模式下滚动到某个节点 | 2.32.2 |
| getCheckedData | `() => { keys: Array<string \| number>, options: Array<TreeOption \| null> }` | 获取选中的数据 | 2.34.1 |
| getIndeterminateData | `() => { keys: Array<string \| number>, options: Array<TreeOption \| null> }` | 获取半选的数据 | 2.34.1 |

# 树型选择 Tree Select

据说 99% 的人分不清它和 Cascader 的区别。

## 演示

```demo
basic.vue
custom-field.vue
multiple.vue
checkbox.vue
check-strategy.vue
filterable.vue
check-strategy-debug.vue
action.vue
async.vue
status.vue
debug.vue
field-search-debug.vue
render-debug.vue
```

## API

### TreeSelect Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| allow-checking-not-loaded | `boolean` | `false` | 是否允许级联勾选还没有完全加载的节点。如果你要用这个属性，请记住 `value` 可能是不完整的，并且请注意勾选行为和后端计算逻辑的一致性，尤其是有禁用节点的情况下 | 2.28.1 |
| cascade | `boolean` | `false` | 使用 checkbox 进行多选时是否级联 |  |
| checkable | `boolean` | `false` | 是否使用 checkbox 进行选择 |  |
| check-strategy | `string` | `'all'` | 设置勾选策略来指定显示的勾选节点，`all` 表示显示全部选中节点；`parent` 表示只显示父节点（当父节点下所有子节点都选中时）；`child` 表示只显示子节点 |  |
| children-field | `string` | `'children'` | 替代 `TreeSelectOption` 中的 children 字段名 |  |
| clearable | `boolean` | `false` | 是否可清除 |  |
| clear-filter-after-select | `boolean` | `true` | 是否在可过滤和多选的情况下选中一个选项后保留当前的搜索关键词 | 2.25.3 |
| consistent-menu-width | `boolean` | `true` | 是否使菜单宽度和输入框一致，打开会禁用虚拟滚动 |  |
| default-value | `string \| number \| Array<string \| number> \| null` | `null` | 默认选中的 key |  |
| default-expand-all | `boolean` | `false` | 默认展开全部 |  |
| default-expanded-keys | `Array<string \| number>` | `[]` | 默认展开节点的 key |  |
| disabled | `boolean` | `false` | 是否禁用 |  |
| expanded-keys | `Array<string \| number>` | `undefined` | 展开节点的 key |  |
| indeterminate-keys | `string \| number` | `undefined` | 部分选中选项的 key |  |
| filterable | `boolean` | `false` | 是否可过滤 |  |
| filter | `(pattern: string, option: TreeSelectOption) => boolean` | - | 过滤器函数 |  |
| key-field | `string` | `'key'` | 替代 `TreeSelectOption` 中的 key 字段名 |  |
| label-field | `string` | `'label'` | 替代 `TreeSelectOption` 中的 label 字段名 |  |
| disabled-field | `string` | `'disabled'` | 替代 `TreeSelectOption` 中的 disabled 字段名 | 2.32.2 |
| loading | `boolean` | `false` | 是否加载中 | 2.28.3 |
| max-tag-count | `number \| 'responsive'` | `undefined` | 多选时最多直接显示多少选项，设为 `'responsive'` 会保证最多一行 |  |
| menu-props | `HTMLAttributes` | `undefined` | 菜单的 DOM 属性 | 2.22.0 |
| multiple | `boolean` | `false` | 是否支持多选 |  |
| node-props | `(info: { option: TreeSelectOption }) => HTMLAttributes` | `undefined` | 节点的 HTML 属性 | 2.30.7 |
| options | `TreeSelectOption[]` | `[]` | 选项 |  |
| placeholder | `string` | `'请选择'` | 占位信息 |  |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'bottom-start'` | 选择器的弹出位置. | 2.25.0 |
| render-label | `(info: { option: TreeSelectOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | 节点内容的渲染函数 | 2.30.7 |
| render-prefix | `(info: { option: TreeSelectOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | 节点前缀的渲染函数 | 2.30.7 |
| render-suffix | `(info: { option: TreeSelectOption, checked: boolean, selected: boolean }) => VNodeChild` | `undefined` | 节点后缀的渲染函数 | 2.30.7 |
| render-switcher-icon | `() => VNodeChild` | `undefined` | 节点展开开关的渲染函数 | 2.30.7 |
| render-tag | `(props: { option: TreeSelectOption, handleClose: () => void }) => VNodeChild` | `undefined` | 控制标签的渲染 | 2.30.7 |
| separator | `string` | `' / '` | 数据分隔符 |  |
| show-path | `boolean` | `false` | 是否在选择器中显示选项路径 |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 组件尺寸 |  |
| status | `'success' \| 'warning' \| 'error'` | `undefined` | 验证状态 | 2.27.0 |
| to | `string \| HTMLElement \| false` | `body` | 菜单的容器节点，`false` 会待在原地 |  |
| value | `string \| number \| Array<string \| number> \| null>` | `undefined` | 选中的 key |  |
| virtual-scroll | `boolean` | `true` | 是否开启虚拟滚动 |  |
| on-blur | `(e: FocusEvent) => void` | `undefined` | Blur 时的回调 |  |
| on-focus | `(e: FocusEvent) => void` | `undefined` | Focus 时的回调 |  |
| on-load | `(node: TreeSelectOption) => Promise<void>` | `undefined` | 异步加载数据的回调函数 | 2.27.0 |
| on-update:expanded-keys | `(value: Array<string \| number>, meta: { node: TreeOption \| null, action: 'expand' \| 'collapse' \| 'filter' }) => void` | `undefined` | 展开节点更新的回调 | `meta` 2.34.0 |
| on-update:indeterminate-keys | `(keys: Array<string \| number>) => void` | `undefined` | 节点部分勾选项发生变化时的回调函数 |  |
| on-update:value | `(value: string \| number \| Array<string \| number> \| null, option: TreeSelectOption \| null \| Array<TreeSelectOption \| null>, meta: { node: TreeOption \| null, action: 'select' \| 'unselect' \| 'delete' \| 'clear' }) => void` | `undefined` | 更新值的回调 | `meta` 2.34.0 |

### TreeSelectOption Properties

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| key | `string \| number` | 选项的 key，需要唯一，可使用 `key-field` 修改字段名 |  |
| label | `string` | 选项的显示内容，可使用 `label-field` 修改字段名 |  |
| children? | `TreeSelectOption[]` | 节点的子选项 |  |
| disabled? | `boolean` | 是否禁用选项 |  |
| isLeaf? | `boolean` | 节点是否是叶节点，在异步展开状态下是必须的 | 2.27.0 |

### TreeSelect Slots

| 名称   | 参数 | 说明                | 版本   |
| ------ | ---- | ------------------- | ------ |
| action | `()` | 菜单操作区域的 slot | 2.22.0 |
| arrow  | `()` | 选择箭头 slot       | 2.30.4 |
| empty  | `()` | 菜单无数据时的 slot | 2.22.0 |

### TreeSelect Methods

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| blur | `() => void` | 失焦 | 2.34.0 |
| focus | `() => void` | 聚焦 | 2.34.0 |
| getCheckedData | `() => { keys: Array<string \| number>, options: Array<TreeOption \| null> }` | 获取选中的数据 | 2.34.0 |
| getIndeterminateData | `() => { keys: Array<string \| number>, options: Array<TreeOption \| null> }` | 获取半选的数据 | 2.34.0 |

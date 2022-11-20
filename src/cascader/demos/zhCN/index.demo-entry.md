# 级联选择 Cascader

用来选一些树型信息。

## 演示

```demo
single.vue
multiple.vue
size.vue
single-lazy.vue
multiple-lazy.vue
action.vue
virtual.vue
check-strategy.vue
custom-field.vue
custom-render.vue
focus.vue
status.vue
default-value-debug.vue
```

## API

### Cascader Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| allow-checking-not-loaded | `boolean` | `false` | 是否允许级联勾选还没有完全加载的节点。如果你要用这个属性，请记住 `value` 可能是不完整的，并且请注意勾选行为和后端计算逻辑的一致性，尤其是有禁用节点的情况下 | 2.28.1 |
| cascade | `boolean` | `true` | 在多选时是否关联选项 |  |
| check-strategy | `string` | `'all'` | 设置勾选策略来指定显示的勾选节点，`all` 表示显示全部选中节点；`parent` 表示只显示父节点（当父节点下所有子节点都选中时，对于单选无效）；`child` 表示只显示子节点 |  |
| children-field | `string` | `'children'` | 替代 `CascaderOption` 中的 children 字段名 |  |
| clearable | `boolean` | `false` | 值是否可清除 |  |
| clear-filter-after-select | `boolean` | `true` | 是否在可过滤和多选的情况下选中一个选项后保留当前的搜索关键词 | 2.25.3 |
| default-value | `string \| number \| Array<number \| string> \| null` | `null` | 级联菜单默认选中的数据 |  |
| disabled | `boolean` | `false` | 是否禁用 |  |
| disabled-field | `string` | `'disabled'` | 替代 `CascaderOption` 中的 disabled 字段名 | 2.32.2 |
| expand-trigger | `'click' \| 'hover'` | `'click'` | 在 `remote` 被设定时 `'hover'` 不生效 |  |
| filterable | `boolean` | `false` | `remote` 被设定时不生效 |  |
| filter | `(pattern: string, option: CascaderOption, path: CascaderOption[]) => boolean` | 一个基于字符串的过滤算法 | 过滤选项的函数 |  |
| filter-menu-props | `HTMLAttributes` | `undefined` | 可过滤菜单的 DOM 属性 | 2.27.0 |
| value-field | `string` | `'value'` | 替代 `CascaderOption` 中的 value 字段名 |  |
| label-field | `string` | `'label'` | 替代 `CascaderOption` 中的 label 字段名 |  |
| max-tag-count | `number \| 'responsive'` | `undefined` | 多选标签的最大显示数量，`responsive` 会将所有标签保持在一行 |  |
| menu-props | `HTMLAttributes` | `undefined` | 菜单的 DOM 属性 | 2.27.0 |
| multiple | `boolean` | `false` | 是否支持多选 |  |
| options | `CascaderOption[]` | `[]` | 填充的 options 数据 |  |
| placeholder | `string` | `'请选择'` | 提示信息 |  |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'bottom-start'` | 弹出位置 | 2.25.0 |
| remote | `boolean` | `false` | 是否远程获取数据 |  |
| render-label | `(option: CascaderOption, checked: boolean) => VNodeChild` | `undefined` | Cascader 菜单选项标签渲染函数 | 2.24.0 |
| separator | `string` | `' / '` | 数据分隔符 |  |
| show | `boolean` | `undefined` | 是否打开菜单 |  |
| show-path | `boolean` | `true` | 是否在选择器中显示选项路径 |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |  |
| status | `'success' \| 'warning' \| 'error'` | `undefined` | 验证状态 | 2.27.0 |
| to | `string \| HTMLElement \| false` | `body` | 菜单的容器节点，`false` 会待在原地 |  |
| value | `string \| number \| Array<number \| string> \| null` | `undefined` | 级联选择的数据受控 |  |
| virtual-scroll | `boolean` | `true` | 是否支持虚拟滚动 |  |
| on-blur | `() => void` | `undefined` | 用户 blur 时执行的回调 |  |
| on-focus | `() => void` | `undefined` | 用户 focus 时执行的回调 |  |
| on-load | `(option: CascaderOption) => Promise<void>` | `undefined` | 在点击未加载完成节点时的回调，在返回的 promise 中设定 `option.children`，在返回的 promise resolve 或 reject 之后完成加载 |  |
| on-update:show | `(value: boolean) => void` | `undefined` | 菜单打开关闭的回调 |  |
| on-update:value | `(value: string \| number \| Array<string \| number> \| null, option: CascaderOption \| Array<CascaderOption \| null> \| null, pathValues: Array<CascaderOption \| null> \| Array<CascaderOption[] \| null> \| null) => void` | `undefined` | 值改变时执行的回调 |  |

#### CascaderOption Properties

| 名称      | 类型               | 描述                     | 版本 |
| --------- | ------------------ | ------------------------ | ---- |
| label     | `string`           | label 标签，用于展示信息 |      |
| value     | `string \| number` | 对应 label 的 value 值   |      |
| disabled? | `boolean`          | 该项是否禁用             |      |
| children? | `CascaderOption`   | 该项的子项数据           |      |

### Cascader Slots

| 名称      | 参数 | 描述                             | 版本   |
| --------- | ---- | -------------------------------- | ------ |
| action    | `()` | 级联菜单中显示的 action 填充内容 |        |
| arrow     | `()` | 箭头的 slot                      | 2.32.2 |
| empty     | `()` | 级联菜单无数据时的 slot          | 2.22.0 |
| not-found | `()` | 搜索不到数据时候的 slot          | 2.34.0 |

### Cascader Methods

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| blur | `() => void` | 失焦 | 2.24.2 |
| focus | `() => void` | 聚焦 | 2.24.2 |
| getCheckedData | `() => { keys: Array<string \| number>, options: Array<TreeOption \| null> }` | 获取选中的数据 | 2.34.0 |
| getIndeterminateData | `() => { keys: Array<string \| number>, options: Array<TreeOption \| null> }` | 获取半选的数据 | 2.34.0 |

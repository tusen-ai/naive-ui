# 选择器 Select

选点啥！

## 演示

```demo
basic.vue
size.vue
multiple.vue
events.vue
filterable.vue
tag.vue
menu-width.vue
remote.vue
remote-multiple.vue
clearable.vue
scroll-event.vue
group.vue
many-options.vue
custom-option.vue
custom-suffix.vue
action.vue
fallback-option.vue
max-tag-count.vue
add-tooltip.vue
render-tag.vue
focus.vue
render-person.vue
tag-input.vue
status.vue
placeholder-debug.vue
menu-debug.vue
render-debug.vue
spin-debug.vue
options-change-debug.vue
filterable-debug.vue
empty-debug.vue
fullscreen-debug.vue
custom-field.vue
create-debug.vue
```

## API

### Select Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| consistent-menu-width | `boolean` | `true` | 菜单宽度是否和选择触发器一致，设为 `false` 会使 `virtual-scroll` 失效 |  |
| children-field | `string` | `'children'` | 选项组 children 的字段名 | 2.29.1 |
| clearable | `boolean` | `false` | 是否可清空 |  |
| clear-filter-after-select | `boolean` | `true` | 是否在可过滤和多选的情况下选中一个选项后保留当前的搜索关键词 | 2.25.2 |
| default-value | `Array<string \| number> \| string \| number \| null` | `null` | 非受控模式下的默认值 |  |
| disabled | `boolean` | `false` | 是否禁用 |  |
| fallback-option | `false \| (value: string \| number) => SelectOption` | `value => ({ label: '' + value, value })` | 在传入的选项中没有对应当前值的选项时，这个值应该对应的选项。如果设为 `false`，不会为找不到对应选项的值生成回退选项也不会显示它，未在选项中的值会被视为不合法，操作过程中会被组件清除掉 |  |
| filterable | `boolean` | `false` | 是否可以过滤 |  |
| filter | `(pattern: string, option: object) => boolean` | 一个简单的字符串搜索算法 | 过滤器函数 |  |
| ignore-composition | `boolean` | `true` | 忽略输入法 Composition 状态，默认情况下 `filter` 在输入法输入的过程中不会触发 | 2.33.4 |
| input-props | `HTMLInputAttributes` | `undefined` | 触发器中 input 元素的属性，只在可过滤时有意义 |  |
| keyboard | `boolean` | `true` | 是否支持键盘操作 | NEXT_VERSION |
| label-field | `string` | `'label'` | 选项 label 的字段名 | 2.29.1 |
| loading | `boolean` | `false` | 是否为加载状态 |  |
| max-tag-count | `number \| 'responsive'` | `undefined` | 多选标签的最大显示数量，`responsive` 会将所有标签保持在一行 |  |
| menu-props | `HTMLAttributes` | `undefined` | 菜单的 DOM 属性 |  |
| multiple | `boolean` | `false` | 是否为多选 |  |
| node-props | `(option: SelectOption \| SelectGroupOption) => object` | `undefined` | 选项的 DOM 属性生成函数 | 2.32.2 |
| options | `Array<SelectOption \| SelectGroupOption>` | `[]` | 配置选项内容，详情见 SelectOption Properties |  |
| placeholder | `string` | `'请选择' (i18n)` | 提示信息 |  |
| placement | `'top-start' \| 'top' \| 'top-end' \| 'right-start' \| 'right' \| 'right-end' \| 'bottom-start' \| 'bottom' \| 'bottom-end' \| 'left-start' \| 'left' \| 'left-end'` | `'bottom-start'` | 菜单的弹出位置 | 2.25.0 |
| remote | `boolean` | `false` | 是否要异步获取选项。注意如果设定了，那么 `filter` 和 `tag` 都不会对 `options` 生效。这个时候你在全权控制 `options` |  |
| render-label | `(option: SelectOption \| SelectGroupOption, selected: boolean) => VNodeChild` | `undefined` | 选项标签渲染函数 |  |
| render-option | `(info: { node: VNode, option: SelectOption \| SelectGroupOption, selected: boolean }) => VNodeChild` | `undefined` | 选项的渲染函数 |  |
| render-tag | `(props: { option: SelectBaseOption, handleClose: () => void }) => VNodeChild` | `undefined` | 控制标签的渲染 |  |
| reset-menu-on-options-change | `boolean` | `true` | 是否在选项变化时重置菜单状态，例如滚动状态 | 2.24.2 |
| show | `boolean` | `undefined` | 是否展示菜单 |  |
| show-arrow | `boolean` | `true` | 是否展示箭头 |  |
| show-checkmark | `boolean` | `true` | 是否展示对勾 | 2.33.4 |
| show-on-focus | `boolean` | `false` | 聚焦时是否展示菜单 | 2.34.3 |
| size | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | 组件尺寸 |  |
| status | `'success' \| 'warning' \| 'error'` | `undefined` | 验证状态 | 2.27.0 |
| tag | `boolean` | `false` | 是否可以创建新的选项，需要和 `filterable` 一起使用 |  |
| to | `string \| HTMLElement \| false` | `body` | 菜单的容器节点，`false` 会待在原地 |  |
| value | `Array<string \| number> \| string \| number \| null` | `undefined` | 受控模式下的值 |  |
| value-field | `string` | `'value'` | 选项 value 的字段名 | 2.29.1 |
| virtual-scroll | `boolean` | `true` | 是否启用虚拟滚动 |  |
| on-blur | `() => void` | `undefined` | `blur` 时执行的回调 |  |
| on-clear | `() => void` | `undefined` | `clear` 时执行的回调 |  |
| on-create | `(label: string) => SelectOption` | `label => ({ label, value: label })` | 在输入内容时如何创建一个选项。注意 `filter` 对这个生成的选项同样会生效。同时确保这个选项和其他选项的 `value` 不要有重复，应该和 `tag` 属性一起被使用 |  |
| on-focus | `() => void` | `undefined` | `focus` 时执行的回调 |  |
| on-scroll | `(e: ScrollEvent) => void` | `undefined` | 滚动时执行的回调 |  |
| on-search | `(value: string) => void` | `undefined` | 搜索时执行的回调 |  |
| on-update:show | `(show: boolean) => void` | `undefined` | 菜单打开状态变化的回调 | 2.24.2 |
| on-update:value | `(value: Array \| string \| number \| null, option: SelectBaseOption \| null \| SelectBaseOption[]) => void` | `undefined` | 值更新时执行的回调 |  |

#### SelectOption Properties

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| class | `string` | 自定义一个选项的类名 |
| disabled | `boolean` | 是否禁用一个选项 |
| label | `string \| ((option: SelectOption, selected: boolean) => VNodeChild)` | 选项的标签，注意如果你使用了渲染函数，默认的过滤器将会过滤该选项 |
| render | `(info: { node: VNode, option: SelectOption, selected: boolean }) => VNodeChild` | 渲染整个选项 |
| style | `string \| CSSProperties` | 自定义一个选项的样式 |
| value | `string \| number` | 在选项中应该是唯一的 |

#### SelectGroupOption Properties

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| children | `Array<SelectOption>` | 子选项组 |
| label | `string \| ((option: SelectGroupOption) => VNodeChild)` | 选项组的标签 |
| key | `string \| number` | 在选项中应该是唯一的 |
| render | `(info: { node: VNode, option: SelectOption, selected: boolean }) => VNodeChild` | 渲染整个选项 |
| type | `'group'` | 选项组的类型 |

### Select Slots

| 名称   | 参数 | 说明                | 版本   |
| ------ | ---- | ------------------- | ------ |
| action | `()` | 菜单操作区域的 slot |        |
| empty  | `()` | 菜单无数据时的 slot |        |
| arrow  | `()` | 箭头的 slot         | 2.24.2 |

### Select Methods

| 名称  | 类型         | 说明 | 版本   |
| ----- | ------------ | ---- | ------ |
| focus | `() => void` | 聚焦 | 2.24.2 |
| blur  | `() => void` | 失焦 | 2.24.2 |

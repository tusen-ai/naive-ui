# 选择器 Select

选点啥！

## 演示

```demo
basic
size
multiple
events
filterable
tag
menu-width
remote
remote-multiple
clearable
scroll-event
group
many-options
custom-option
action
fallback-option
max-tag-count
add-tooltip
render-tag
render-person
change-debug
placeholder-debug
menu-debug
render-debug
spin-debug
options-change-debug
filterable-debug
```

## API

### Select Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| consistent-menu-width | `boolean` | `true` | 菜单宽度是否和选择触发器一致，设为 `false` 会使 `virtual-scroll` 失效 |
| clearable | `boolean` | `false` | 是否可清空 |
| default-value | `Array<string \| number> \| string \| number \| null` | `null` | 非受控模式下的默认值 |
| disabled | `boolean` | `false` | 是否禁用 |
| fallback-option | `false \| (value: string \| number) => SelectOption` | `value => ({ label: '' + value, value })` | 在传入的选项中没有对应当前值的选项时，这个值应该对应的选项。如果设为 `false`，不会为找不到对应选项的值生成回退选项也不会显示它，未在选项中的值会被视为不合法，操作过程中会被组件清除掉 |
| filterable | `boolean` | `false` | 是否可以过滤 |
| filter | `(pattern: string, option: object) => boolean` | 一个简单的字符串搜索算法 | 过滤器函数 |
| input-props | `HTMLInputAttributes` | `undefined` | 触发器中 input 元素的属性，只在可过滤时有意义 |
| loading | `boolean` | `false` | 是否为加载状态 |
| max-tag-count | `number \| 'responsive'` | `undefined` | 多选标签的最大显示数量，`responsive` 会将所有标签保持在一行 |
| menu-props | `HTMLAttributes` | `undefined` | 菜单的 DOM 属性 |
| multiple | `boolean` | `false` | 是否为多选 |
| options | `Array<SelectOption \| SelectGroupOption>` | `[]` | 配置选项内容，详情见 SelectOption Properties |
| placeholder | `string` | `'请选择'` | 提示信息 |
| remote | `boolean` | `false` | 是否要异步获取选项。注意如果设定了，那么 `filter` 和 `tag` 都不会对 `options` 生效。这个时候你在全权控制 `options` |
| render-label | `(option: SelectOption \| SelectGroupOption, selected: boolean) => VNodeChild` | `undefined` | 选项标签渲染函数 |
| render-option | `(info: { node: VNode, option: SelectOption \| SelectGroupOption, selected: boolean } }` | `undefined` | 选项的渲染函数 |
| render-tag | `(option: SelectBaseOption, onClose: () => void) => VNodeChild` | `undefined` | 控制标签的渲染 |
| show | `boolean` | `undefined` | 是否展示菜单 |
| show-arrow | `boolean` | `true` | 是否展示箭头 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 组件尺寸 |
| tag | `boolean` | `false` | 是否可以创建新的选项，需要和 `filterable` 一起使用 |
| value | `Array<string \| number> \| string \| number \| null` | `undefined` | 受控模式下的值 |
| virtual-scroll | `boolean` | `true` | 是否启用虚拟滚动 |
| on-blur | `() => void` | `undefined` | `blur` 时执行的回调 |
| on-clear | `() => void` | `undefined` | `clear` 时执行的回调 |
| on-create | `(label: string) => SelectOption` | `label => ({ label, value: label })` | 在输入内容时如何创建一个选项。注意 `filter` 对这个生成的选项同样会生效。同时确保这个选项和其他选项的 `value` 不要有重复 |
| on-focus | `() => void` | `undefined` | `focus` 时执行的回调 |
| on-scroll | `(e: ScrollEvent) => void` | `undefined` | 滚动时执行的回调 |
| on-search | `(value: string) => void` | `undefined` | 搜索时执行的回调 |
| on-update:value | `(value: Array \| string \| number \| null, option: SelectBaseOption \| null \| SelectBaseOption[]) => void` | `undefined` | 值更新时执行的回调 |

### SelectOption Properties

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| class | `string` | 自定义一个选项的类名 |
| disabled | `boolean` | 是否禁用一个选项 |
| label | `string \| ((option: SelectOption, selected: boolean) => VNodeChild)` | 选项的标签，注意如果你使用了渲染函数，默认的过滤器将会过滤该选项 |
| render | `(info: { node: VNode, option: SelectOption, selected: boolean }) => VNodeChild` | 渲染整个选项 |
| style | `string \| object` | 自定义一个选项的样式 |
| value | `string \| number` | 在选项中应该是唯一的 |

### SelectGroupOption Properties

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| children | `Array<SelectOption>` | 子选项组 |
| label | `string \| ((option: SelectGroupOption) => VNodeChild)` | 选项组的标签 |
| key | `string \| number` | 在选项中应该是唯一的 |
| render | `(info: { node: VNode, option: SelectOption, selected: boolean } }) => VNodeChild` | 渲染整个选项 |
| type | `'group'` | 选项组的类型 |

### Select Slots

| 名称   | 参数 | 说明                |
| ------ | ---- | ------------------- |
| action | `()` | 菜单操作区域的 slot |
| empty  | `()` | 菜单无数据时的 slot |

# 下拉菜单 Dropdown

当你想触发一些操作的时候。

## 演示

```demo
basic.vue
icon.vue
trigger.vue
cascade.vue
arrow.vue
placement.vue
size.vue
group-debug.vue
batch-render.vue
manual-position.vue
render.vue
option-props.vue
render-option.vue
scrollable-debug.vue
```

## API

### Dropdown Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| animated | `boolean` | `true` | 弹出弹窗时使用动画 |  |
| inverted | `boolean` | `false` | 使用反转样式 |  |
| children-field | `string` | `'children'` | children 的字段名 |  |
| keyboard | `boolean` | `true` | 是否支持键盘操作（注意和其他内容键盘操作可能的冲突） |  |
| key-field | `string` | `'key'` | key 的字段名 |  |
| label-field | `string` | `'label'` | label 的字段名 |  |
| node-props | `(option: DropdownOption \| DropdownGroupOption) => HTMLAttributes` | `undefined` | 批量处理下拉菜单选项的 HTML 属性 | 2.29.1 |
| menu-props | `(option: DropdownOption \| undefined, options: (DropdownOption \| DropdownGroupOption)[]) => HTMLAttributes` | `undefined` | 批量处理下拉菜单的 HTML 属性 | 2.31.0 |
| options | `Array<DropdownOption \| DropdownGroupOption \| DropdownDividerOption \| DropdownRenderOption>` | `[]` | 下拉菜单传入的 options |  |
| render-icon | `(option: DropdownOption) => VNodeChild` | `undefined` | 批量处理下拉菜单图标渲染 |  |
| render-label | `(option: DropdownOption) => VNodeChild` | `undefined` | 批量处理下拉菜单标签渲染 |  |
| render-option | `(props: { node: VNode, option: DropdownOption \| DropdownGroupOption }) => VNodeChild` | `undefined` | 批量处理下拉菜单渲染 | 2.29.1 |
| size | `'small'\|'medium'\|'large'\|'huge'` | `'medium'` | 下拉菜单的尺寸大小 |  |
| on-clickoutside | `(e: MouseEvent) => void` | `undefined` | clickoutside 的时候触发的回调函数 |  |
| on-select | `(key: string \| number, option: DropdownOption) => void` | `undefined` | select 选中时触发的回调函数 |  |

对于其他 Props，例如 `placement`，请参考 [Popover Props](popover#Popover-Props)。注意 `raw` 属性不可用。

#### DropdownOption Type

| 属性 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| children? | `Array<DropdownOption \| DropdownDividerOption \| DropdownGroupOption>` | 子菜单的 children 项 |  |
| disabled? | `boolean` | 是否禁用 |  |
| icon? | `() => VNodeChild` | 支持通过 render 方法自定义 icon |  |
| key? | `string \| number` | 需要唯一 |  |
| label? | `string \| () => VNodeChild` | 显示的 label 值 |  |
| props? | `HTMLAttributes` | 自定义选项属性 |  |
| show? | `boolean` | 是否展示选项 | 2.33.3 |

#### DropdownDividerOption Type

| 属性  | 类型               | 说明         | 版本   |
| ----- | ------------------ | ------------ | ------ |
| key?  | `string \| number` | 需要唯一     |        |
| show? | `boolean`          | 是否展示选项 | 2.33.3 |
| type  | `'divider'`        | 分割线的类型 |        |

#### DropdownGroupOption Type

| 属性 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| children? | `Array<DropdownOption \| DropdownDividerOption>` | `DropdownGroupOption` 的 children 项 |  |
| icon? | `() => VNodeChild` | 支持通过 render 方法自定义 icon |  |
| key? | `string \| number` | 需要唯一 |  |
| label? | `string` | 显示的 label 值 |  |
| show? | `boolean` | 是否展示选项 | 2.33.3 |
| type | `'group'` | `DropdownGroupOption` 的类型 |  |

#### DropdownRenderOption Type

| 属性    | 类型               | 说明                          | 版本   |
| ------- | ------------------ | ----------------------------- | ------ |
| key?    | `string \| number` | 渲染选项 ID（应该是唯一的）   |        |
| render? | `() => VNodeChild` | 选项内容的渲染功能            |        |
| show?   | `boolean`          | 是否展示选项                  | 2.33.3 |
| type    | `'render'`         | `DropdownRenderOption` 的类型 |        |

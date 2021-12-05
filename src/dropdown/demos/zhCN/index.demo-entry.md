# 下拉菜单 Dropdown

当你想触发一些操作的时候。

## 演示

```demo
basic
icon
trigger
cascade
arrow
placement
size
group-debug
manual-position
batch-render
render
option-props
```

## API

### Dropdown Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| animated | `boolean` | `true` | 弹出弹窗时使用动画 |
| children-field | `string` | `'key'` | key 的字段名 |
| inverted | `boolean` | `false` | 使用反转样式 |
| keyboard | `boolean` | `true` | 是否支持键盘操作（注意和其他内容键盘操作可能的冲突） |
| key-field | `string` | `'key'` | key 的字段名 |
| label-field | `string` | `'label'` | label 的字段名 |
| options | `Array<DropdownOption \| DropdownGroupOption \| DropdownDividerOption \| DropdownRenderOption>` | `[]` | 下拉菜单传入的 options |
| render-icon | `(option: DropdownOption) => VNodeChild` | `undefined` | 批量处理下拉菜单图标渲染 |
| render-label | `(option: DropdownOption) => VNodeChild` | `undefined` | 批量处理下拉菜单渲染 |
| size | `'small'\|'medium'\|'large'\|'huge'` | `'medium'` | 下拉菜单的尺寸大小 |
| on-clickoutside | `(e: MouseEvent) => void` | `undefined` | clickoutside 的时候触发的回调函数 |
| on-select | `(key: string \| number, option: DropdownOption) => void` | `undefined` | select 选中时触发的回调函数 |

对于其他 Props，例如 `placement`，请参考 [Popover Props](popover#Popover-Props)。注意 `raw` 属性不可用。

#### DropdownOption Type

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| children? | `Array<DropdownOption \| DropdownDividerOption \| DropdownGroupOptionOption>` | 子菜单的 children 项 |
| icon? | `() => VNodeChild` | 支持通过 render 方法自定义 icon |
| key | `string \| number` | 需要唯一 |
| label | `string` | 显示的 label 值 |
| disabled | `boolean` | 是否禁用 |
| props | `HTMLAttributes` | 自定义选项属性 |

#### DropdownDividerOption Type

| 属性 | 类型               | 说明         |
| ---- | ------------------ | ------------ |
| type | `'divider'`        | 分割线的类型 |
| key  | `string \| number` | 需要唯一     |

#### DropdownGroupOption Type

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| type | `'group'` | DropdownGroupOption 的类型 |
| label | `string` | 显示的 label 值 |
| icon? | `() => VNodeChild` | 支持通过 render 方法自定义 icon |
| key | `string \| number` | 需要唯一 |
| children | `Array<DropdownOption \| DropdownDividerOption>` | DropdownGroupOption 的 children 项 |

#### DropdownRenderOption Type

| 属性   | 类型               | 说明                                   |
| ------ | ------------------ | -------------------------------------- |
| type   | `'render'`         | The type of the DropdownRenderOption.  |
| key    | `string \| number` | Render option ID (should be unique).   |
| render | `() => VNodeChild` | Render function of the option content. |

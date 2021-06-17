# 下拉菜单 Dropdown

当你想触发一些操作的时候。

## 演示

```demo
basic
trigger
cascade
placement
size
manual-position
clickoutside
group-debug
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| animated | `boolean` | `true` | 弹出弹窗时使用动画 |
| inverted | `boolean` | `false` | 使用反转样式 |
| keyboard | `boolean` | `true` | 是否支持键盘操作（注意和其他内容键盘操作可能的冲突） |
| options | `Array<DropdownOption \| DropdownDivider \| DropdownSubmenu>` | `[]` | 下拉菜单传入的 options |
| size | `'small'\|'medium'\|'large'\|'huge'` | `'medium'` | 下拉菜单的尺寸大小 |
| onClickoutside | `(show: boolean) => void` | `undefined` | clickoutside 的时候触发的回调函数 |
| on-select | `(key: string \| number) => void` | `undefined` | select 选中时触发的回调函数 |

对于其他 Props，例如 `placement`，请参考 [Popover Props](popover#Props)。注意 `arrow`、`raw` 属性不可用。

### DropdownOption Type

| 属性     | 类型               | 说明                            |
| -------- | ------------------ | ------------------------------- |
| icon?    | `() => VNodeChild` | 支持通过 render 方法自定义 icon |
| key      | `string \| number` | 需要唯一                        |
| label    | `string`           | 显示的 label 值                 |
| disabled | `boolean`          | 是否禁用                        |

### DropdownDivider Type

| 属性 | 类型               | 说明         |
| ---- | ------------------ | ------------ |
| type | `'divider'`        | 分割线的类型 |
| key  | `string \| number` | 需要唯一     |

### DropdownSubmenu Type

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| type | `'submenu'` | 下拉菜单 submenu 的类型 |
| label | `string` | 显示的 label 值 |
| icon? | `() => VNodeChild` | 支持通过 render 方法自定义 icon |
| key | `string \| number` | 需要唯一 |
| children | `Array<DropdownOption \| DropdownDivider \| DropdownGroup \| DropdownSubmenu>` | DropdownSubmenu 的 children 项 |
| disabled | `boolean` | 是否禁用 |

### DropdownGroup Type

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| type | `'group'` | DropdownGroup 的类型 |
| label | `string` | 显示的 label 值 |
| icon? | `() => VNodeChild` | 支持通过 render 方法自定义 icon |
| key | `string \| number` | 需要唯一 |
| children | `Array<DropdownOption \| DropdownDivider \| DropdownSubmenu>` | DropdownGroup 的 children 项 |

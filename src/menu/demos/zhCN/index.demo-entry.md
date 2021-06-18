# 菜单 Menu

没有吃的。

<!--single-column-->

## 演示

```demo
horizontal
select
render-label
default-expanded-keys
indent
collapse
inverted
long-label
```

## Props

### Menu Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| collapsed-icon-size | `number` | `24` | 菜单折叠时图标的大小，如果为设定则使用 `icon-size` 代替 |
| collapsed-width | `number` | `48` | 折叠后菜单的宽度 |
| collapsed | `boolean` | `false` | 菜单是否折叠，值在菜单为垂直时有用 |
| default-expand-all | `boolean` | `false` |  |
| default-expanded-keys | `Array<string>` | `[]` | 在非受控状态下默认展开的子菜单标识符数组 |
| default-value | `string \| null` | `null` |  |
| expanded-keys | `Array<string>` | `undefined` | 展开的子菜单标识符数组，如果设定了，菜单的展开将会进入受控状态，`default-expanded-keys` 不会生效 |
| icon-size | `number` | `20` | 菜单未折叠时图标的大小 |
| indent | `number` | `32` | 菜单每级的缩进 |
| inverted | `boolean` | `false` | 使用反转样式 |
| options | `Array<MenuOption \| Submenu \| MenuOptionGroup>` | `[]` | 菜单的数据 |
| mode | `'vertical' \| 'horizontal'` | `'vertical'` | 菜单的布局方式 |
| render-label | `((option: MenuOption | MenuGroupOption) => VNodeChild)` | `undefined` | 批量处理菜单渲染 |
| root-indent | `number` | `32` | 菜单第一级的缩进，如果没有设定，使用 `indent` 代替 |
| value | `string \| null` | `undefined` | 菜单当前的选中值 |
| on-update:expanded-keys | `(keys: string[]) => void` | `undefined` | `keys` 是展开菜单项的 `key` 的数组 |
| on-update:value | `(key: string, item: MenuOption) => void` | `undefined` | 选中菜单的回调，`key` 是选中菜单项的 `key`，`item` 是菜单项原始数据 |

### Menu Properties

| 名称      | 类型                           | 说明                           |
| --------- | ------------------------------ | ------------------------------ |
| disabled? | `boolean`                      | 是否禁用菜单项                 |
| extra?    | `string \| (() => VNodeChild)` | 菜单项的额外部分               |
| icon?     | `() => VNode`                  | 菜单项的图标                   |
| key       | `string`                       | 菜单项的标识符                 |
| label     | `string \| (() => VNodeChild)` | 菜单项的名称或菜单项的主体部分 |

### Submenu Properties

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| children | `Array<MenuOption \| Submenu \| MenuOptionGroup>` | 子菜单 |
| disabled? | `boolean` | 是否禁用菜单项 |
| extra? | `string \| (() => VNodeChild)` | 菜单项的额外部分 |
| icon? | `() => VNodeChild` | 菜单项的图标 |
| key | `string` | 菜单项的标识符 |
| label | `string \| (() => VNodeChild)` | 菜单项的名称或菜单项的主体部分 |

### MenuOptionGroup Properties

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| children | `Array<MenuOption \| Submenu \| MenuOptionGroup>` | **必填！**子菜单 |
| key | `string` | 菜单项的标识符 |
| label | `string \| (() => VNodeChild)` | 菜单项的名称或菜单项的主体部分 |
| type | `'group'` | **必填！**菜单项的类型 |

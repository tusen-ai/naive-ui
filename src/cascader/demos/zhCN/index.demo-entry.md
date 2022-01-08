# 级联选择 Cascader

用来选一些树型信息。

## 演示

```demo
single
multiple
size
single-lazy
multiple-lazy
action
virtual
check-strategy
custom-field
```

## API

### Cascader Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| cascade | `boolean` | `true` | 在多选时是否关联选项 |
| check-strategy | `string` | `'all'` | 设置勾选策略来指定显示的勾选节点，`all` 表示显示全部选中节点；`parent` 表示只显示父节点（当父节点下所有子节点都选中时，对于单选无效）；`child` 表示只显示子节点； |
| children-field | `string` | `'children'` | 替代 `CascaderOption` 中的 children 字段名 |
| clearable | `boolean` | `false` | 值是否可清除 |
| default-value | `string \| number \| Array<number \| string> \| null` | `null` | 级联菜单默认选中的数据 |
| disabled | `boolean` | `false` | 是否禁用 |
| expand-trigger | `'click' \| 'hover'` | `'click'` | 在 `remote` 被设定时 `'hover'` 不生效 |
| filterable | `boolean` | `false` | `remote` 被设定时不生效 |
| filter | `(pattern: string, option: CascaderOption, path: CascaderOption[]) => boolean` | 一个基于字符串的过滤算法 | 过滤选项的函数 |
| value-field | `string` | `'value'` | 替代 `CascaderOption` 中的 value 字段名 |
| label-field | `string` | `'label'` | 替代 `CascaderOption` 中的 label 字段名 |
| max-tag-count | `number \| 'responsive'` | `undefined` | 多选标签的最大显示数量，`responsive` 会将所有标签保持在一行 |
| multiple | `boolean` | `false` | 是否支持多选 |
| options | `CascaderOption[]` | `[]` | 填充的 options 数据 |
| placeholder | `string` | `'请选择'` | 提示信息 |
| remote | `boolean` | `false` | 是否远程获取数据 |
| separator | `string` | `' / '` | 数据分隔符 |
| show | `boolean` | `undefined` | 是否打开菜单 |
| show-path | `boolean` | `true` | 是否在选择器中显示选项路径 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| value | `string \| number \| Array<number \| string>` | `undefined` | 级联选择的数据受控 |
| virtual-scroll | `boolean` | `true` | 是否支持虚拟滚动 |
| on-blur | `() => void` | `undefined` | 用户 blur 时执行的回调 |
| on-focus | `() => void` | `undefined` | 用户 focus 时执行的回调 |
| on-load | `(option: CascaderOption) => Promise<void>` | `undefined` | 在点击未加载完成节点时的回调，在返回的 promise 中设定 `option.children`，在返回的 promise resolve 或 reject 之后完成加载 |
| on-update:show | `(value: boolean) => void` | `undefined` | 菜单打开关闭的回调 |
| on-update:value | `(value: string \| number \| Array<string \| number> \| null, option: CascaderOption \| Array<CascaderOption \| null> \| null, pathValues: Array<CascaderOption \| null> \| Array<CascaderOption[] \| null> \| null) => void` | `undefined` | 值改变时执行的回调 |

#### CascaderOption Properties

| 名称      | 类型               | 描述                     |
| --------- | ------------------ | ------------------------ |
| label     | `string`           | label 标签，用于展示信息 |
| value     | `string \| number` | 对应 label 的 value 值   |
| disabled? | `boolean`          | 该项是否禁用             |
| children? | `CascaderOption`   | 该项的子项数据           |

### Cascader Slots

| 名称   | 参数 | 描述                             | 版本   |
| ------ | ---- | -------------------------------- | ------ |
| action | `()` | 级联菜单中显示的 action 填充内容 |        |
| empty  | `()` | 级联菜单无数据时的 slot          | 2.22.0 |

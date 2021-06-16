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
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| cascade | `boolean` | `true` | 在多选时是否关联选项 |
| clearable | `boolean` | `false` | 值是否可清除 |
| default-value | `string \| number \| Array<number \| string> \| null` | `null` | 级联菜单默认选中的数据 |
| disabled | `boolean` | `false` | 是否禁用 |
| expand-trigger | `'click' \| 'hover'` | `'click'` | 在 `remote` 被设定时 `'hover'` 不生效 |
| filterable | `boolean` | `false` | `remote` 被设定时不生效 |
| filter | `(pattern: string, option: CascaderOption, path: Array<CascaderOption>) => boolean` | 一个基于字符串的过滤算法 |  过滤选项的函数 |
| leaf-only | `boolean` | `false` | 是否只允许 `value` 出现叶节点的值 |
| max-tag-count | `number \| 'responsive'` | `undefined` | 多选标签的最大显示数量，`responsive` 会将所有标签保持在一行 |
| multiple | `boolean` | `false` | 是否支持多选 |
| options | `Array<CascaderOption>` | `[]` | 填充的 options 数据 |
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
| on-update:value | `(value: string \| number \| Array<string \| number> \| null) => void` | `undefined` | 值改变时执行的回调 |

## API

### CascaderOption Properties

| 名称      | 类型               | 描述                     |
| --------- | ------------------ | ------------------------ |
| label     | `string`           | label 标签，用于展示信息 |
| value     | `string \| number` | 对应 label 的 value 值   |
| disabled? | `boolean`          | 该项是否禁用             |
| children? | `CascaderOption`   | 该项的子项数据           |

## Slots

| 名称   | 参数 | 描述                             |
| ------ | ---- | -------------------------------- |
| action | `()` | 级联菜单中显示的 action 填充内容 |

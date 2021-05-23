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
| clearable | `boolean` | `false` |  |
| default-value | `string \| number \| Array<number \| string> \| null` | `null` |  |
| disabled | `boolean` | `false` |  |
| expand-trigger | `'click' \| 'hover'` | `'click'` | 在 `remote` 被设定时 `'hover'` 不生效 |
| filterable | `boolean` | `false` | `remote` 被设定时不生效 |
| filter | `(pattern: string, option: CascaderOption, path: Array<CascaderOption>) => boolean` | 一个基于字符串的过滤算法 |  |
| leaf-only | `boolean` | `false` | 是否只允许 `value` 出现叶节点的值 |
| max-tag-count | `number \| 'responsive'` | `undefined` | 多选标签的最大显示数量，`responsive` 会将所有标签保持在一行 |
| multiple | `boolean` | `false` |  |
| options | `Array<CascaderOption>` | `[]` |  |
| placeholder | `string` | `'请选择'` |  |
| remote | `boolean` | `false` |  |
| separator | `string` | `' / '` |  |
| show | `boolean` | `undefined` | 是否打开菜单 |
| show-path | `boolean` | `true` | 是否在选择器中显示选项路径 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| value | `string \| number \| Array<number \| string>` | `undefined` |  |
| virtual-scroll | `boolean` | `true` |  |
| on-blur | `() => void` | `undefined` |  |
| on-focus | `() => void` | `undefined` |  |
| on-load | `(option: CascaderOption) => Promise<void>` | `undefined` | 在点击未加载完成节点时的回调，在返回的 promise 中设定 `option.children`，在返回的 promise resolve 或 reject 之后完成加载 |
| on-update:value | `(value: string \| number \| Array<string \| number> \| null) => void` | `undefined` |  |

## API

### CascaderOption Properties

| 名称      | 类型               | 描述 |
| --------- | ------------------ | ---- |
| label     | `string`           |      |
| style     | `string \| number` |
| disabled? | `boolean`          |      |

## Slots

| 名称   | 参数 | 描述 |
| ------ | ---- | ---- |
| action | `()` |      |

# Cascader

Cascader can be used to select some tree structured data.

## Demos

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

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| cascade | `boolean` | `true` | Whether to cascade checkbox when multiple. |
| clearable | `boolean` | `false` |  |
| default-value | `string \| number \| Array<number \| string> \| null` | `null` |  |
| disabled | `boolean` | `false` |  |
| expand-trigger | `'click' \| 'hover'` | `'click'` | If `remote` is set, `'hover'` won't work. |
| filterable | `boolean` | `false` | If `remote` is set, it won't work. |
| filter | `(pattern: string, option: CascaderOption, path: Array<CascaderOption>) => boolean` | A string based filter algorithm. |  |
| leaf-only | `boolean` | `false` | If only allow value of leaf node to be in `value`. |
| max-tag-count | `number \| 'responsive'` | `undefined` | Max tag count in multiple mode. `responsive` will keep all the tags in single line. |
| multiple | `boolean` | `false` |  |
| options | `Array<CascaderOption>` | required |  |
| placeholder | `string` | `'Please Select'` |  |
| remote | `boolean` | `false` |  |
| separator | `string` | `' / '` |  |
| show | `boolean` | `undefined` | Whether to show menu. |
| show-path | `boolean` | `true` | Whether to show path in selector. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| value | `string \| number \| Array<number \| string> \| null` | `undefined` |  |
| virtual-scroll | `boolean` | `true` |  |
| on-blur | `() => void` | `undefined` |  |
| on-focus | `() => void` | `undefined` |
| on-load | `(option: CascaderOption) => Promise<any>` | `undefined` | Callback when click unloaded node. Set `option.children` in the returned promise. Loading is end after the promise is resolved or rejected. |
| on-update:value | `(value: string \| number \| Array<string \| number> \| null) => void` | `undefined` |  |

## API

### CascaderOption Properties

| Name      | Type               | Description |
| --------- | ------------------ | ----------- |
| label     | `string`           |             |
| style     | `string \| number` |
| disabled? | `boolean`          |             |

## Slots

| Name   | Parameters | Description |
| ------ | ---------- | ----------- |
| action | `()`       |             |

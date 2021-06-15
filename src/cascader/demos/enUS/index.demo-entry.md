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
| clearable | `boolean` | `false` | Whether the cascader is clearable. |
| default-value | `string \| number \| Array<number \| string> \| null` | `null` | Data selected by default in uncontrolled mode. |
| disabled | `boolean` | `false` | Whether to disable the cascader. |
| expand-trigger | `'click' \| 'hover'` | `'click'` | If `remote` is set, `'hover'` won't work. |
| filterable | `boolean` | `false` | If `remote` is set, it won't work. |
| filter | `(pattern: string, option: CascaderOption, path: Array<CascaderOption>) => boolean` | A string based filter algorithm. | Filter function of the cascader. |
| leaf-only | `boolean` | `false` | If only allow value of leaf node to be in `value`. |
| max-tag-count | `number \| 'responsive'` | `undefined` | Max tag count in multiple mode. `responsive` will keep all the tags in single line. |
| multiple | `boolean` | `false` | Whether to support multiple selection. |
| options | `Array<CascaderOption>` | required | Options of the cascader. |
| placeholder | `string` | `'Please Select'` | Prompt information. |
| remote | `boolean` | `false` | Whether to obtain data remotely. |
| separator | `string` | `' / '` | Option value separator. |
| show | `boolean` | `undefined` | Whether to show menu. |
| show-path | `boolean` | `true` | Whether to show path in selector. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Cascader size. |
| value | `string \| number \| Array<number \| string> \| null` | `undefined` | Value of the cascader in controlled mode. |
| virtual-scroll | `boolean` | `true` | Whether to enable virtual scrolling. |
| on-blur | `() => void` | `undefined` | Callback executed when blurs. |
| on-focus | `() => void` | `undefined` | Callback executed when focused. |
| on-load | `(option: CascaderOption) => Promise<void>` | `undefined` | Callback when click unloaded node. Set `option.children` in the returned promise. Loading is end after the promise is resolved or rejected. |
| on-update:value | `(value: string \| number \| Array<string \| number> \| null) => void` | `undefined` | Callback executed when value changes. |

## API

### CascaderOption Properties

| Name      | Type               | Description                     |
| --------- | ------------------ | ------------------------------- |
| label     | `string`           | Label of the option.            |
| value     | `string \| number` | Value of the option.            |
| disabled? | `boolean`          | Whether this item is disabled.  |
| children? | `CascaderOption`   | The children data of this item. |

## Slots

| Name   | Parameters | Description                                          |
| ------ | ---------- | ---------------------------------------------------- |
| action | `()`       | Action fill content displayed in the cascading menu. |

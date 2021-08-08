# Tree Select

It's said that 99% of the people can't distinguish it from cascader.

## Demos

```demo
basic
multiple
checkbox
filterable
debug
```

## API

### TreeSelect Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| cascade | `boolean` | `false` | Whether to do cascade check when use checkboxes. |
| checkable | `boolean` | `false` | Whether to use checkbox to select value. |
| clearable | `boolean` | `false` | Whether it's clearable. |
| consistent-menu-width | `boolean` | `true` | Whether to make menu's width consistent with input. Set to `true` will disable virtual scroll. |
| default-value | `string \| number \| Array<string \| number> \| null` | `null` | Selected key (or keys when multiple) by default. |
| default-expand-all | `boolean` | `false` | Expand all nodes by default. |
| default-expanded-keys | `Array<string \| number>` | `[]` | Expanded keys by default. |
| disabled | `boolean` | `false` | Whether to disable the tree select. |
| expanded-keys | `Array<string \| number>` | `undefined` | Expanded keys. |
| filterable | `boolean` | `false` | Whether the tree select is disabled. |
| filter | `(pattern: string, option: TreeSelectOption) => boolean` | - | Filter function. |
| max-tag-count | `number \| 'responsive'` | `undefined` | Max tag count to be shown in multiple mode. Set to `'responsive'` will keep all tags in the same row. |
| multiple | `boolean` | `false` | Whether to support multiple select. |
| options | `TreeSelectOption[]` | `[]` | Options. |
| placeholder | `string` | `'Please Select'` | Placeholder. |
| separator | `string` | `' / '` | Option value separator. |
| show-path | `boolean` | `false` | Whether to show path in selector. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Component size. |
| value | `string \| number \| Array<string \| number> \| null>` | `undefined` | Selected key (or keys when multiple). |
| virtual-scroll | `boolean` | `true` | Whether to enable virtual scroll. |
| on-blur | `(e: FocusEvent) => void` | `undefined` | Callback on blur. |
| on-update:expanded-keys | `(value: Array<string \| number>) => void` | `undefined` | Callback on expanded keys updated. |
| on-focus | `(e: FocusEvent) => void` | `undefined` | Callback on focus. |
| on-update:value | `(value: string \| number \| Array<string \| number> \| null) => void` | `undefined` | Callback on value updated. |

### TreeSelectOption Properties

| Name      | Type                 | Description                          |
| --------- | -------------------- | ------------------------------------ |
| key       | `string \| number`   | Key of the option. Should be unique. |
| label     | `string`             | Displayed content of the option.     |
| children? | `TreeSelectOption[]` | Child options of the option.         |
| disabled? | `boolean`            | Whether to disabled the option.      |

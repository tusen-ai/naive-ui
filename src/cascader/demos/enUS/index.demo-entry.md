# Cascader

Cascader can be used to display and select tree structured data.

## Demos

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

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| cascade | `boolean` | `true` | Whether to cascade the checkbox selection onto children. |
| check-strategy | `string` | `'all'` | The way to show checked options. `all` means showing all checked node. `parent` means showing all checked parent node when all child node are checked (not working in single select mode). `child` means showing all child node. |
| children-field | `string` | `'children'` | The children field in `CascaderOption`. |
| clearable | `boolean` | `false` | Whether the cascader is clearable. |
| default-value | `string \| number \| Array<number \| string> \| null` | `null` | Data selected by default if no value is set. |
| disabled | `boolean` | `false` | Whether to disable the cascader. |
| expand-trigger | `'click' \| 'hover'` | `'click'` | If `remote` is set, `'hover'` won't work. |
| filterable | `boolean` | `false` | Note: If `remote` is set, this won't have any effect. |
| filter | `(pattern: string, option: CascaderOption, path: CascaderOption[]) => boolean` | A string based filter algorithm. | Filter function of the cascader. |
| value-field | `string` | `'value'` | The value field in `CascaderOption`. |
| label-field | `string` | `'label'` | The label field in `CascaderOption`. |
| max-tag-count | `number \| 'responsive'` | `undefined` | Max tag count in multiple select mode. `responsive` will keep all the tags in single line. |
| multiple | `boolean` | `false` | Whether to allow multiple options being selected. |
| options | `CascaderOption[]` | required | Options of the cascader. |
| placeholder | `string` | `'Please Select'` | Placeholder text. |
| remote | `boolean` | `false` | Whether to obtain data remotely. |
| separator | `string` | `' / '` | Selected option path value separator (used with `show-path`). |
| show | `boolean` | `undefined` | Whether to show the menu. |
| show-path | `boolean` | `true` | Whether to show the selected options as a path. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Cascader size. |
| value | `string \| number \| Array<number \| string> \| null` | `undefined` | Value of the cascader (if being set manually). |
| virtual-scroll | `boolean` | `true` | Whether to enable virtual scrolling. |
| on-blur | `() => void` | `undefined` | Callback on blurred. |
| on-focus | `() => void` | `undefined` | Callback on focused. |
| on-load | `(option: CascaderOption) => Promise<void>` | `undefined` | Callback when a node is loaded. Set `option.children` in the returned promise. Loading will stop after the promise is resolved or rejected. |
| on-update:show | `(value: boolean) => void` | `undefined` | Callback executed when menu is opened & closed. |
| on-update:value | `(value: string \| number \| Array<string \| number> \| null, option: CascaderOption \| Array<CascaderOption \| null> \| null, pathValues: Array<CascaderOption \| null> \| Array<CascaderOption[] \| null> \| null) => void` | `undefined` | Callback executed when the value changes. |

#### CascaderOption Properties

| Name      | Type               | Description                          |
| --------- | ------------------ | ------------------------------------ |
| label     | `string`           | Label of the option.                 |
| value     | `string \| number` | Value of the option.                 |
| disabled? | `boolean`          | Whether this option is disabled.     |
| children? | `CascaderOption`   | The children options of this option. |

### Cascader Slots

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| action | `()` | Action content displayed in the cascading menu. |  |
| empty | `()` | Empty state slot for the options cascading menu. | 2.22.0 |

# Transfer

<!--single-column-->

Left, right, left, right... As a boring guy, I can play it all day.

## Demos

```demo
basic
large-data
size
filterable
```

## API

### Transfer Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| default-value | `Array<string \| number> \| null` | `null` | Default value in uncontrolled mode. |
| disabled | `boolean` | `true` | Whether to disable. |
| filterable | `boolean` | `false` | Whether to filterable. |
| filter | `function` | `(pattern: string, option: TransferOption, from: 'source' \| 'target') => boolean` | A basic label string match function. |
| options | `Array<TransferOption>` | `[]` | For details of configuration options, see TransferOption Type. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. |
| source-filter-placeholder | `string` | `undefined` | Placeholder in the source item search box. |
| source-title | `string` | `'Source'` | Source item title. |
| target-filter-placeholder | `string` | `undefined` | Placeholder in the target item search box. |
| target-title | `string` | `'Target'` | Target item title. |
| value | `Array<string \| number> \| null` | `undefined` | Value in controlled mode. |
| on-update:value | `(value: Array<string \| number>) => void` | `undefined` | Callback when the value changes. |
| virtual-scroll | `boolean` | `false` | Whether to enable virtual scrolling. |

#### TransferOption Type

| Property | Type | Description |
| --- | --- | --- |
| label | `string` | The name used for the page display in the options. |
| value | `string \| number` | The only `value` among all options. |
| disabled | `boolean` | Whether to disable the option. |

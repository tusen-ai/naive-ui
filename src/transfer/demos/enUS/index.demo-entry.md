# Transfer

A more efficient transfer.

If you want to use original transfer, please refer to [Legacy Transfer](legacy-transfer). Please note that the legacy transfer will be removed in the next major version. It's not recommended to to use it.

## Demos

```demo
basic.vue
large-data.vue
filterable.vue
render-label.vue
render-source-list.vue
```

## API

### Transfer Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| default-value | `Array<string \| number> \| null` | `null` | Default value. | 2.32.0 |
| disabled | `boolean` | `true` | Disabled state. | 2.32.0 |
| filter | `(pattern: string, option: TransferOption, from: 'source' \| 'target') => boolean` | A basic label string match function. | 2.32.0, `from` 2.32.2 |
| options | `TransferOption[]` | `[]` | For configuration options, see the TransferOption Type below. | 2.32.0 |
| render-source-label | `(props: { option: TransferOption }) => VNodeChild` | `undefined` | Customize source label rendering. | 2.32.0 |
| render-target-label | `(props: { option: TransferOption }) => VNodeChild` | `undefined` | Customize target label rendering. | 2.32.0 |
| render-source-list | `(props: { onCheck: (checkedValueList: Array<string \| number>) => void, checkedOptions: TransferOption[], pattern: string }) => VNodeChild` | `undefined` | Customize source list rendering. | 2.32.0 |
| render-target-list | `(props: { onCheck: (checkedValueList: Array<string \| number>) => void, checkedOptions: TransferOption[], pattern: string }) => VNodeChild` | `undefined` | Customize target list rendering. | 2.33.4 |
| show-selected | `boolean` | `true` | Whether to show selected options in the source list. | 2.34.0 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. | 2.32.0 |
| source-filterable | `boolean` | `false` | The source filterable state. | 2.32.2 |
| source-filter-placeholder | `string` | `undefined` | Placeholder for the source items search box. | 2.32.0 |
| source-title | `string` | `'undefined'` | Source items title. | 2.32.0 |
| target-filterable | `boolean` | `false` | The target filterable state. | 2.32.2 |
| target-filter-placeholder | `string` | `undefined` | Placeholder for the target items search box. | 2.32.0 |
| target-title | `string` | `undefined` | Target items title. | 2.32.0 |
| value | `Array<string \| number> \| null` | `undefined` | Value when being set manually. | 2.32.0 |
| on-update:value | `(value: Array<string \| number>) => void` | `undefined` | Callback when the value changes. | 2.32.0 |
| virtual-scroll | `boolean` | `false` | Enable virtual scrolling. | 2.32.0 |

#### TransferOption Type

| Property | Type               | Description                    |
| -------- | ------------------ | ------------------------------ |
| label    | `string`           | The option's label to display. |
| value    | `string \| number` | The option's unique value.     |
| disabled | `boolean`          | The option's disabled state.   |

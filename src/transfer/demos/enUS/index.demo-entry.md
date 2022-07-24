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
| default-value | `Array<string \| number> \| null` | `null` | Default value. |  |
| disabled | `boolean` | `true` | Disabled state. |  |
| filterable | `boolean` | `false` | Filterable state. |  |
| filter | `(pattern: string, option: TransferOption) => boolean` | A basic label string match function. |  |
| options | `TransferOption[]` | `[]` | For configuration options, see the TransferOption Type below. |  |
| render-source-label | `(props: { option: TransferOption }) => VNodeChild` | `undefined` | Customize source label rendering. | NEXT_VERSION |
| render-target-label | `(props: { option: TransferOption }) => VNodeChild` | `undefined` | Customize target label rendering. | NEXT_VERSION |
| render-source-list | `(props: { onCheck: (checkedValueList: Array<string \| number>) => void, checkedOptions: TransferOption[], pattern: string }) => VNodeChild` | `undefined` | Customize source list rendering. | NEXT_VERSION |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. |  |
| source-filter-placeholder | `string` | `undefined` | Placeholder for the source items search box. |  |
| source-title | `string` | `'Source'` | Source items title. |  |
| target-filter-placeholder | `string` | `undefined` | Placeholder for the target items search box. |  |
| target-title | `string` | `'Target'` | Target items title. |  |
| value | `Array<string \| number> \| null` | `undefined` | Value when being set manually. |  |
| on-update:value | `(value: Array<string \| number>) => void` | `undefined` | Callback when the value changes. |  |
| virtual-scroll | `boolean` | `false` | Enable virtual scrolling. |  |

#### TransferOption Type

| Property | Type               | Description                    |
| -------- | ------------------ | ------------------------------ |
| label    | `string`           | The option's label to display. |
| value    | `string \| number` | The option's unique value.     |
| disabled | `boolean`          | The option's disabled state.   |

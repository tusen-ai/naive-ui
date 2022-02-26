# Transfer

<!--single-column-->

~~Left, right, right, left... I'm a simple man, and I can play this all day.~~

Now, the transfer's style is simple and efficient. I can't continue to play.

## Demos

```demo
basic.vue
large-data.vue
size.vue
filterable.vue
render-label
render-source-list
```

## API

### Transfer Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| default-value | `Array<string \| number> \| null` | `null` | Default value. |
| disabled | `boolean` | `true` | Disabled state. |
| filterable | `boolean` | `false` | Filterable state. |
| filter | `function` | `(pattern: string, option: TransferOption, from: 'source' \| 'target') => boolean` | A basic label string match function. |
| options | `Array<TransferOption>` | `[]` | For configuration options, see the TransferOption Type below. |
| render-label | `({ from, option }: { from: 'source' \| 'target', option: TransferOption }) => VNodeChild` | `undefined` | Customize label rendering. |
| render-source-list | `({ onCheck, checkedOptions, pattern }: { onCheck: (checkedValueList: Array<OptionValue>) => void, checkedOptions: Array<Option>, pattern: string }) => VNodeChild` | `undefined` | Customize source list rendering. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. |
| source-filter-placeholder | `string` | `undefined` | Placeholder for the source items search box. |
| source-title | `string` | `'Source'` | Source items title. |
| target-filter-placeholder | `string` | `undefined` | Placeholder for the target items search box. |
| target-title | `string` | `'Target'` | Target items title. |
| value | `Array<string \| number> \| null` | `undefined` | Value when being set manually. |
| on-update:value | `(value: Array<string \| number>) => void` | `undefined` | Callback when the value changes. |
| virtual-scroll | `boolean` | `false` | Enable virtual scrolling. |

#### TransferOption Type

| Property | Type               | Description                    |
| -------- | ------------------ | ------------------------------ |
| label    | `string`           | The option's label to display. |
| value    | `string \| number` | The option's unique value.     |
| disabled | `boolean`          | The option's disabled state.   |

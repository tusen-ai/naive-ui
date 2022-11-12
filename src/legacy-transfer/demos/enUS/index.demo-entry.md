# Legacy Transfer

<!--single-column-->

<n-alert title="Warning" type="warning" :bordered="false">
  The transfer component is deprecated. It won't have any new feature and will be removed in the next major version. It's recommended to use new  <router-link to="transfer" custom v-slot="{ href, navigate }">
    <n-a :href="href" @click="navigate">Transfer</n-a>
  </router-link>.
</n-alert>

Left, right, right, left... I'm a simple man, and I can play this all day.

## Demos

```demo
basic.vue
large-data.vue
size.vue
filterable.vue
```

## API

### Transfer Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| default-value | `Array<string \| number> \| null` | `null` | Default value. |
| disabled | `boolean` | `true` | Disabled state. |
| filterable | `boolean` | `false` | Filterable state. |
| filter | `function` | `(pattern: string, option: TransferOption, from: 'source' \| 'target') => boolean` | A basic label string match function. |
| options | `TransferOption[]` | `[]` | For configuration options, see the TransferOption Type below. |
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

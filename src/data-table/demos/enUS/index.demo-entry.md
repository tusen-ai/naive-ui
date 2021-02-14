# Data Table

<!--single-column-->

DataTable is used to displays rows of structured data.

## Demos

<n-alert type="warning" title="Caveat" style="margin-bottom: 16px;">
  Every row data needs a unique key property, otherwise you should specify <n-text code>row-key</n-text>
</n-alert>

```demo
basic
empty
border
size
filter-and-sorter
select
controlled-page
controlled-filter
controlled-sorter
fixed-header
fixed-header-column
ellipsis
render-header
custom-style
ajax-usage
custom-filter-menu
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` |  |
| bottom-bordered | `boolean` | `true` |  |
| checked-row-keys | `Array<string \| number>` | `undefined` | The keys of checked rows. |
| columns | `Array<Column>` | required | Columns to display. |
| data | `Array<Object>` | `[]` | Data to display. |
| default-checked-row-keys | `Array<string \| number>` | `[]` |  |
| loading | `boolean` | `false` |  |
| max-height | `number \| string` | `undefined` | The max-height of the table. If content height is larger than it, the header will be fixed at top |
| min-height | `number \| string` | `undefined` | The min-height of the table. |
| pagination | `false \| Object` | `false` | See [Pagination props](n-pagination#Props) |
| paging | `boolean` | `true` | If data-table do automatic paging. You may set it to `false` in async usage. |
| row-class-name | `string \| (rowData: Object, index : number) => string \| Object` | `undefined` |  |
| row-key | `(rowData: Object) => number \| string` | `undefined` | Generate the key of the row by row data (if you don't want to set the key) |
| scroll-x | `number \| string` | `undefined` | If columns are horizontal fixed, scroll-x need to be set |
| single-column | `boolean` | `false` |  |
| single-line | `boolean` | `true` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| on-update:checked-row-keys | `(keys: Array<string \| number>) => any` | `undefined` |  |
| on-update:filters | `(filters: { [string \| number]: Array<string \| number> \| string \| number }, initiatorColumn: Column)` |  |
| on-update:page | `(page: number)` | `undefined` |  |
| on-update:page-size | `(pageSize: number) => any` | `undefined` |  |
| on-update:sorter | `(options: { columnKey: string \| number, sorter: 'default' \| function \| boolean, order: 'ascend' \| 'descend' \| false } \| null) => any` | `undefined` | If there won't be a active sorter after change, `options` will be `null` |

## Methods

These methods can help you control table in an uncontrolled manner. However, it's not recommended to use them to implement some async operations. If async operations is needed, use table in a **controlled** manner.

| Name | Type | Description |
| --- | --- | --- |
| clearFilters | `() => void` |  |
| clearSorter | `() => void` |  |
| filters | `(filters: { [string \| number]: Array<string \| number> \| string \| number }) => void` | Set the active filters of the table. |
| page | `(page: number) => void` |  |
| sort | `(columnKey: string \| number \| null, order: 'ascend' \| 'descend' \| false) => void` | If columnKey set to `null`, it is the same as clearSorter. |

## API

### Column Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| align | `'left' \| 'right' \| 'center'` | `'left'` | Text align in column |
| className | `string` | `undefined` |  |
| defaultFilterOptionValue | `string \| number \| null` | `null` | The default active filter option value in uncontrolled manner. (works when not using multiple filters) |
| defaultFilterOptionValues | `Array<string \| number>` | `[]` | The default active filter option values in uncontrolled manner. (works when there are multiple filters) |
| defaultSortOrder | `'descend' \| 'ascend' \| false` | `false` | The default sort order of the table in uncontrolled manner |
| disabled | `(rowData: Object, index: number) => boolean` | `() => false` |  |
| ellipsis | `boolean` | `false` |  |
| filter | `boolean \| (optionValue: string \| number, rowData: Object) => boolean \| 'default'` | `false` | The filter of the column. If set to `true`, it will only display filter button on the column, which can be used in async status. |
| filterMode | `'and' \| 'or'` | `'or'` |  |
| filterMultiple | `boolean` | `true` |  |
| filterOptionValue | `string \| number \| null` | `undefined` | The active filter option value in controlled manner. If not set, the filter of the column works in an uncontrolled manner. (works when not using multiple filters) |
| filterOptionValues | `Array<string \| number> \| null` | `undefined` | The active filter option values in controlled manner. If not set, the filter of the column works in an uncontrolled manner. (works when there are multiple filters) |
| filterOptions | `Array<{ label: string, value: string \| number}>` | `undefined` |  |
| fixed | `'left \| 'right' \| false` | `false` |  |
| key | `string \| number` | **required** | Unique key of this column, **required** when table's row-key is not set. |
| render | `(rowData: Object) => VNodeChild` | `undefined` | Render function of column row cell. |
| renderFilterMenu | `() => VNodeChild` | `undefined` | Render function of column filter menu. |
| sortOrder | `'descend' \| 'ascend' \| false` | `undefined` | The controlled sort order of the column. If multiple columns' sortOrder is set, the first one will affect. |
| sorter | `boolean \| function \| 'default'` | `false` | The sorter of the column. If set `'default'`, it will use a basic builtin compare function. If set to `true`, it will only display sort icon on the column, which can be used in async status. Otherwise it works like `Array.sort`'s compare function. |
| title | `string \| (() => VNodeChild)` | `undefined` | Can be a render function |
| type | `'default' \| 'selection'` | `default` |  |
| width | `number \| string` | `undefined` | Width of the column, **required** when fixed |

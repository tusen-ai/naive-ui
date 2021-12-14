# Data Table

<!--single-column-->

DataTable is used to displays rows of structured data.

## Demos

<n-alert type="warning" title="Caveat" style="margin-bottom: 16px;">
  Each item of the array passing in the <n-text code>data</n-text> prop represents a row of rendered data, and each row of data must have a unique <n-text code>key</n-text>, otherwise the <n-text code>row-key</n-text> prop must be specified on the table.
  <br>If you want to use the data returned by the server for display, paging, filtering, sorting, please refer to <n-a href="#ajax-usage">Async</n-a>.
  </n-alert>

```demo
basic
empty
border
size
row-props
merge-cell
filter-and-sorter
multiple-sorter
select
custom-select
group-header
controlled-page
controlled-filter
controlled-sorter
controlled-multiple-sorter
fixed-header
fixed-header-column
summary
ellipsis
ellipsis-tooltip
expand
render-header
custom-style
ajax-usage
virtual
custom-filter-menu
tree
flex-height
striped
```

## API

### DataTable Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | Whether to show border. |
| bottom-bordered | `boolean` | `true` | Whether to show bottom border. |
| checked-row-keys | `Array<string \| number>` | `undefined` | The keys of checked rows. |
| cascade | `boolean` | `true` | Whether to do cascade checking when using tree data. |
| children-key | `string` | `'children'` | The key of children data in tree data's data entity. |
| columns | `Array<DataTableColumn>` | `[]` | Columns to display. |
| data | `Array<object>` | `[]` | Data to display. |
| default-checked-row-keys | `Array<string \| number>` | `[]` | The key value selected by default. |
| default-expanded-row-keys | `Array<string \| number>` | `[]` | The key value of the expanded tree data by default |
| expanded-row-keys | `Array<string \| number>` | `undefined` | Expanded row keys. |
| flex-height | `boolean` | `false` | Whether to make table body's height auto fit table area height. Make it enabled will make `table-layout` always set to `'fixed'`. |
| indent | `number` | `16` | Indent of row content when using tree data. |
| loading | `boolean` | `false` | Whether to display loading status. |
| max-height | `number \| string` | `undefined` | The max-height of the table content. Can be a CSS value. |
| min-height | `number \| string` | `undefined` | The min-height of the table content. Can be a CSS value. |
| pagination | `false \| object` | `false` | See [Pagination props](pagination#Pagination-Props) |
| remote | `boolean` | `false` | If data-table do automatic paging. You may set it to `false` in async usage. |
| row-class-name | `string \| (rowData: object, rowIndex : number) => string \| object` | `undefined` | Class name of each row. |
| row-key | `(rowData: object) => (number \| string)` | `undefined` | Generate the key of the row by row data (if you don't want to set the key). |
| row-props | `(rowData: object, rowIndex : number) => object` | `undefined` | Customize row attributes. |
| scroll-x | `number \| string` | `undefined` | If columns are horizontal fixed, scroll-x need to be set. |
| single-column | `boolean` | `false` | Whether the column content is a whole, when the parameter is `true`, there is no `border-bottom`. |
| single-line | `boolean` | `true` | Whether the line content is a whole, when the parameter value is `true`, there is no `border-right`. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Table size. |
| striped | `boolean` | `false` | Whether to show zebra stripes on rows. |
| summary | `DataTableCreateSummary` | `undefined` | Data of table summary row. For types, see <n-a href="#DataTableCreateSummary-Type">DataTableCreateSummary Type</n-a>. |
| table-layout | `'auto' \| 'fixed'` | `'auto'` | Style `table-layout` of the table. When `ellipsis` or `max-height` or `flex-height` are set, it will always be `'fixed'` regardless of what you set. |
| virtual-scroll | `boolean` | `false` | Whether to use virtual scroll to deal with large data. Make sure `max-height` is set before using it. When `virtual-scroll` is `true`, `rowSpan` will not take effect. |
| on-update:checked-row-keys | `(keys: Array<string \| number>) => void` | `undefined` | The callback function triggered when the checked-row-keys value changes. |
| on-update:expanded-row-keys | `(keys: Array<string \| number>) => void` | `undefined` | The callback function triggered when the expanded-row-keys value changes. |
| on-update:filters | `(filters: { [string \| number]: Array<string \| number> \| string \| number }, initiatorColumn: DataTableColumn)` | `undefined` | The callback function triggered when the filters data changes. |
| on-update:page | `(page: number)` | `undefined` | Callback function triggered when the page changes. |
| on-update:page-size | `(pageSize: number) => void` | `undefined` | Callback function triggered when the page-size changes. |
| on-update:sorter | `(options: SortState \| SortState[] \| null) => void` | `undefined` | If the change column is sorted by multiple columns, will return `SortState[] \| null`, otherwise return `SortState \| null`. For types, see <n-a href="#SortState-Type">SorterState Type</n-a>. |

#### DataTableColumn Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| align | `'left' \| 'right' \| 'center'` | `'left'` | Text align in column. |
| children | `DataTableColumn[]` | `undefined` | Child nodes of a grouped column. |
| className | `string` | `undefined` | Class name of the column. |
| colSpan | `(rowData: object, rowIndex: number) => number` | `undefined` | The col span of the column cell. |
| defaultFilterOptionValue | `string \| number \| null` | `null` | The default active filter option value in uncontrolled manner. (works when not using multiple filters). |
| defaultFilterOptionValues | `Array<string \| number>` | `[]` | The default active filter option values in uncontrolled manner. (works when there are multiple filters). |
| defaultSortOrder | `'descend' \| 'ascend' \| false` | `false` | The default sort order of the table in uncontrolled manner. |
| disabled | `(rowData: object, rowIndex: number) => boolean` | `() => false` | Whether the row is checkable. |
| ellipsis | `boolean \| EllipsisProps` | `false` | Ellipsis options when content overflows. |
| expandable | `(rowData: object) => boolean` | `undefined` | Whethe the row is expandable. Only works when `type` is `'expand'`. |
| filter | `boolean \| (optionValue: string \| number, rowData: object) => boolean \| 'default'` | `false` | The filter of the column. If set to `true`, it will only display filter button on the column, which can be used in async status. |
| filterMode | `'and' \| 'or'` | `'or'` | The filter mode. |
| filterMultiple | `boolean` | `true` | Can the column filtered by multiple values. |
| filterOptionValue | `string \| number \| null` | `undefined` | The active filter option value in controlled manner. If not set, the filter of the column works in an uncontrolled manner. (works when not using multiple filters). |
| filterOptionValues | `Array<string \| number> \| null` | `undefined` | The active filter option values in controlled manner. If not set, the filter of the column works in an uncontrolled manner. (works when there are multiple filters). |
| filterOptions | `Array<{ label: string, value: string \| number}>` | `undefined` | Filter options. |
| fixed | `'left \| 'right' \| false` | `false` | Whether the column needs to be fixed. |
| key | `string \| number` | `undefined` | Unique key of this column, this is not repeatable. |
| options | `Array<'all' \| 'none' \| { label: string, key: string \| number, onSelect: (pageData: RowData) => void }>` | `undefined` | Options of custom selection. Only work with `type='selection'`. |
| render | `(rowData: object, rowIndex: number) => VNodeChild` | `undefined` | Render function of column row cell. |
| renderExpand | `(rowData: object, rowIndex: number) => VNodeChild` | `undefined` | Render function of the expand area. Only works when `type` is `'expand'`. |
| renderFilterMenu | `(actions: { hide: () => void }) => VNodeChild` | `undefined` | Render function of column filter menu. |
| renderFilterIcon | `(options: { active: boolean, show: boolean }) => VNodeChild` | `undefined` | Render function of column filter icon. |
| renderFilter | `(options: { active: boolean, show: boolean }) => VNodeChild` | `undefined` | Render function of column filter trigger. |
| rowSpan | `(rowData: object, rowIndex: number) => number` | `undefined` | The row span of the cell. |
| sortOrder | `'descend' \| 'ascend' \| false` | `undefined` | The controlled sort order of the column. If multiple columns' sortOrder is set, the first one will affect. |
| sorter | `boolean \| function \| 'default'` | `false` | The sorter of the column. If set `'default'`, it will use a basic builtin compare function. If set to `true`, it will only display sort icon on the column, which can be used in async status. Otherwise it works like `Array.sort`'s compare function. |
| title | `string \| (() => VNodeChild)` | `undefined` | Column title, Can be a render function. |
| titleRowSpan | `number` | `undefined` | The number of cells occupied by the title row. |
| type | `'selection' \| 'expand'` | `undefined` | Column type. |
| width | `number` | `undefined` | Width of the column, **required** when fixed. |

#### DataTableCreateSummary Type

```ts
type DataTableCreateSummary = (
  pageData: RowData[]
) =>
  | Array<{
      [columnKey: string]: {
        value: string | number
        colSpan?: number
        rowSpan?: number
      }
    }>
  | {
      [columnKey: string]: {
        value: string | number
        colSpan?: number
        rowSpan?: number
      }
    }
```

#### SortState Type

```ts
type SortState = {
  columnKey: string | number,
  sorter: 'default' | function | boolean,
  order: 'ascend' | 'descend' | false
}
```

### DataTable Methods

These methods can help you control table in an uncontrolled manner. However, it's not recommended to use them to implement some async operations. If async operations is needed, use table in a **controlled** manner.

| Name | Type | Description |
| --- | --- | --- |
| clearFilters | `() => void` | Clear all filter state. |
| clearSorter | `() => void` | Clear all sort state. |
| filters | `(filters: { [string \| number]: Array<string \| number> \| string \| number }) => void` | Set the active filters of the table. |
| page | `(page: number) => void` | Manually set the page. |
| sort | `(columnKey: string \| number \| null, order: 'ascend' \| 'descend' \| false) => void` | If columnKey set to `null`, it is the same as clearSorter. |

### DataTable Slots

| Name  | Type | Description                                     |
| ----- | ---- | ----------------------------------------------- |
| empty | `()` | Custom description when data of table is empty. |

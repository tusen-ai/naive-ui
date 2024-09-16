# Data Table

<!--single-column-->

DataTable is used to displays rows of structured data.

<n-alert type="warning" title="Caveat" :bordered="false">
  <n-ul align-text>
    <li>
      Each item of the array passing in the <n-text code>data</n-text> prop represents a row of rendered data, and each row of data must have a unique <n-text code>key</n-text>, otherwise the <n-text code>row-key</n-text> prop must be specified on the table.
    </li>
    <li>
      In non-async mode, page count is determined by data's count. Even if you pass a <n-text code>page-count</n-text> in, it won't change data table's displayed page count. If you want it behaves in this way, you should set <n-text code>remote</n-text> prop.
    </li>
    <li>
      If you want to use the data returned by the server for display, paging, filtering, sorting, please refer to <n-a href="#ajax-usage">Async</n-a>.
    </li>
  </n-ul>
</n-alert>

## Demos

```demo
basic.vue
empty.vue
border.vue
size.vue
row-props.vue
merge-cell
filter-and-sorter
pagination-behavior-on-filter.vue
multiple-sorter
column-draggable.vue
select.vue
select-single.vue
custom-select.vue
group-header.vue
controlled-page.vue
controlled-filter.vue
controlled-sorter
controlled-multiple-sorter
fixed-header.vue
fixed-header-column.vue
summary.vue
ellipsis.vue
ellipsis-tooltip.vue
expand.vue
render-header
custom-style.vue
ajax-usage
virtual.vue
custom-filter-menu.vue
tree.vue
flex-height.vue
striped.vue
simple-editable.vue
switchable-editable
context-menu.vue
async-expand.vue
render-cell.vue
export-csv.vue
```

## API

### DataTable Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| allow-checking-not-loaded | `boolean` | `false` | Whether to allow cascade checking on not loaded nodes. If you want to use this, you should know the `check-row-keys` may be incomplete. | 2.28.0 |
| bordered | `boolean` | `true` | Whether to show border. |  |
| bottom-bordered | `boolean` | `true` | Whether to show bottom border. |  |
| checked-row-keys | `Array<string \| number>` | `undefined` | The keys of checked rows. |  |
| cascade | `boolean` | `true` | Whether to do cascade checking when using tree data. |  |
| children-key | `string` | `'children'` | The key of children data in tree data's data entity. |  |
| columns | `Array<DataTableColumn>` | `[]` | Columns to display. |  |
| data | `Array<object>` | `[]` | Data to display. |  |
| default-checked-row-keys | `Array<string \| number>` | `[]` | The key value selected by default. |  |
| default-expanded-row-keys | `Array<string \| number>` | `[]` | The key value of the expanded tree data by default |  |
| default-expand-all | `boolean` | `false` | Whether to expand all expandable rows. Can't be used with async expanding data. | 2.30.4 |
| expanded-row-keys | `Array<string \| number>` | `undefined` | Expanded row keys. |  |
| filter-icon-popover-props | `PopoverProps` | `{ trigger: click, placement: bottom }` | Filter icon's Popover attribute of the button, See [Popover props](popover#Popover-Props) | 2.39.0 |
| flex-height | `boolean` | `false` | Whether to make table body's height auto fit table area height. Make it enabled will make `table-layout` always set to `'fixed'`. |  |
| indent | `number` | `16` | Indent of row content when using tree data. |  |
| loading | `boolean` | `false` | Whether to display loading status. |  |
| max-height | `number \| string` | `undefined` | The max-height of the table content. Can be a CSS value. |  |
| min-height | `number \| string` | `undefined` | The min-height of the table content. Can be a CSS value. |  |
| paginate-single-page | `boolean` | `true` | Whether show pagination data is less than one page. | 2.28.0 |
| pagination | `false \| object` | `false` | See [Pagination props](pagination#Pagination-Props) |  |
| pagination-behavior-on-filter | `'first' \| 'current'` | `'current'` | The behavior of pagination after filter state is changed. `'first'` means returning to first page on filter, `'current'` means keep at current page on filter. | 2.28.3 |
| remote | `boolean` | `false` | If data-table do automatic paging. You may set it to `true` in async usage. |  |
| render-cell | `(value: any, rowData: object, column: DataTableBaseColumn) => VNodeChild` | `undefined` | Render function of cell, it will be overwritten by columns' `render`. | 2.30.5 |
| render-expand-icon | `({ expanded }: { expanded: boolean }) => VNodeChild` | `undefined` | Render function of expand icon. | 2.32.2, `expanded`: 2.34.4 |
| row-class-name | `string \| (rowData: object, rowIndex : number) => string` | `undefined` | Class name of each row. |  |
| row-key | `(rowData: object) => (number \| string)` | `undefined` | Generate the key of the row by row data (if you don't want to set the key). |  |
| row-props | `(rowData: object, rowIndex : number) => HTMLAttributes` | `undefined` | Customize row attributes. |  |
| scroll-x | `number \| string` | `undefined` | If columns are horizontal fixed, scroll-x need to be set. |  |
| scrollbar-props | `ScrollbarProps` | `undefined` | See [Scrollbar props](scrollbar#Scrollbar-Props), the `on-scroll` attribute already exists in the `DataTable`, the `on-scroll` attribute does not take effect here. |  |
| single-column | `boolean` | `false` | Whether rows are not divided. If the prop is `true`, table cell has no `border-bottom`. |  |
| single-line | `boolean` | `true` | Whether columns are not divided. If the prop is `true`, table cell has no `border-right`. |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Table size. |  |
| spin-props | `{ strokeWidth?: number, stroke?: string }` | `undefined` | Table spin's props. | 2.34.0 |
| sticky-expanded-rows | `boolean` | `false` | Expanded row content remains sticky. | 2.32.2 |
| striped | `boolean` | `false` | Whether to show zebra stripes on rows. |  |
| summary | `DataTableCreateSummary` | `undefined` | Data of table summary row. For types, see <n-a href="#DataTableCreateSummary-Type">DataTableCreateSummary Type</n-a>. |  |
| summary-placement | `'top' \| 'bottom'` | `'bottom'` | Summary rows placement. | 2.33.3 |
| table-layout | `'auto' \| 'fixed'` | `'auto'` | Style `table-layout` of the table. When `ellipsis` or `max-height` or `flex-height` are set, it will always be `'fixed'` regardless of what you set. |  |
| virtual-scroll | `boolean` | `false` | Whether to use virtual scroll to deal with large data. Make sure `max-height` is set before using it. When `virtual-scroll` is `true`, `rowSpan` will not take effect. |  |
| on-load | `(rowData: object) => Promise<void>` | `undefined` | Callback of async tree data expanding. | 2.27.0 |
| on-scroll | `(e: Event) => void` | `undefined` | Callback of table body scrolling. | 2.29.1 |
| on-update:checked-row-keys | `(keys: Array<string \| number>, rows: object[], meta: { row: object \| undefined, action: 'check' \| 'uncheck' \| 'checkAll' \| 'uncheckAll' }) => void` | `undefined` | The callback function triggered when the checked-row-keys value changes. | `rows` 2.30.5, `meta` 2.33.4 |
| on-update:expanded-row-keys | `(keys: Array<string \| number>) => void` | `undefined` | The callback function triggered when the expanded-row-keys value changes. |  |
| on-update:filters | `(filters: DataTableFilterState, initiatorColumn: DataTableBaseColumn)` | `undefined` | The callback function triggered when the filters data changes. |  |
| on-update:page | `(page: number)` | `undefined` | Callback function triggered when the page changes. |  |
| on-update:page-size | `(pageSize: number) => void` | `undefined` | Callback function triggered when the page-size changes. |  |
| on-update:sorter | `(options: DataTableSortState \| DataTableSortState[] \| null) => void` | `undefined` | If the change column is sorted by multiple columns, will return `DataTableSortState[] \| null`, otherwise return `DataTableSortState \| null`. |  |

#### DataTableColumn Properties

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| align | `'left' \| 'right' \| 'center'` | `'left'` | Text align in column. |  |
| allowExport | `boolean` | `true` | Can the column exported | NEXT_VERSION |
| titleAlign | `'left' \| 'right' \| 'center'` | `null` | alignment of the table header. If omitted, the value of the above align attribute will be applied | 2.34.4 |
| cellProps | `(rowData: object, rowIndex: number) => object` | `undefined` | HTML attributes of the column's cell. | 2.27.0 |
| children | `DataTableColumn[]` | `undefined` | Child nodes of a grouped column. |  |
| className | `string` | `undefined` | Class name of the column. |  |
| colSpan | `(rowData: object, rowIndex: number) => number` | `undefined` | The col span of the column cell. |  |
| defaultFilterOptionValue | `string \| number \| null` | `null` | The default active filter option value in uncontrolled manner. (works when not using multiple filters). |  |
| defaultFilterOptionValues | `Array<string \| number>` | `[]` | The default active filter option values in uncontrolled manner. (works when there are multiple filters). |  |
| defaultSortOrder | `'descend' \| 'ascend' \| false` | `false` | The default sort order of the table in uncontrolled manner. |  |
| disabled | `(rowData: object, rowIndex: number) => boolean` | `() => false` | Whether the row is checkable. |  |
| ellipsis | `boolean \| EllipsisProps` | `false` | Ellipsis options when content overflows. |  |
| ellipsis-component | `'ellipsis' \| 'performant-ellipsis'` | `'ellipsis'` | Component for rendering text ellipsis. It works when `ellipsis` is `EllipsisProps`. If it's `'ellipsis'`, table will use regular `n-ellipsis` component to render text ellipsis. If it's `'performant-ellipsis'`, table will use `n-performant-ellipsis` to render text ellipsis. In the later situation, rendering speed will be much faster but component inside table cell would be unmounted & remounted. | 2.35.0 |
| expandable | `(rowData: object) => boolean` | `undefined` | Whethe the row is expandable. Only works when `type` is `'expand'`. |  |
| filter | `boolean \| (optionValue: string \| number, rowData: object) => boolean \| 'default'` | `false` | The filter of the column. If set to `true`, it will only display filter button on the column, which can be used in async status. |  |
| filterMode | `'and' \| 'or'` | `'or'` | The filter mode. |  |
| filterMultiple | `boolean` | `true` | Can the column filtered by multiple values. |  |
| filterOptionValue | `string \| number \| null` | `undefined` | The active filter option value in controlled manner. If not set, the filter of the column works in an uncontrolled manner. (works when not using multiple filters). |  |
| filterOptionValues | `Array<string \| number> \| null` | `undefined` | The active filter option values in controlled manner. If not set, the filter of the column works in an uncontrolled manner. (works when there are multiple filters). |  |
| filterOptions | `Array<{ label: string, value: string \| number}>` | `undefined` | Filter options. |  |
| resizable | `boolean` | `undefined` | Whethe the column width can be dragged. | 2.33.4 |
| fixed | `'left \| 'right' \| false` | `false` | Whether the column needs to be fixed. |  |
| key | `string \| number` | `undefined` | Unique key of this column, this is not repeatable. |  |
| minWidth | `number \| string` | `undefined` | Min width of the column. | 2.28.3 |
| maxWidth | `number \| string` | `undefined` | Max width of the column. Only works when `resizable` is `true`. | 2.33.4 |
| multiple | `boolean` | `true` | Whether to enable multiple selection mode. Only works when `type` is `'selection'`. | 2.31.0 |
| options | `Array<'all' \| 'none' \| { label: string, key: string \| number, onSelect: (pageData: RowData[]) => void }>` | `undefined` | Options of custom selection. Only work with `type='selection'`. |  |
| render | `(rowData: object, rowIndex: number) => VNodeChild` | `undefined` | Render function of column row cell. |  |
| renderExpand | `(rowData: object, rowIndex: number) => VNodeChild` | `undefined` | Render function of the expand area. Only works when `type` is `'expand'`. |  |
| renderFilter | `(options: { active: boolean, show: boolean }) => VNodeChild` | `undefined` | Render function of column filter trigger. |  |
| renderFilterIcon | `(options: { active: boolean, show: boolean }) => VNodeChild` | `undefined` | Render function of column filter icon. |  |
| renderFilterMenu | `(actions: { hide: () => void }) => VNodeChild` | `undefined` | Render function of column filter menu. |  |
| renderSorter | `(options: { order: 'descend' \| 'ascend' \| false }) => VNodeChild` | `undefined` | Render function of column sorter trigger. | 2.24.2 |
| renderSorterIcon | `(options: { order: 'descend' \| 'ascend' \| false }) => VNodeChild` | `undefined` | Render function of column sorter icon. | 2.24.2 |
| rowSpan | `(rowData: object, rowIndex: number) => number` | `undefined` | The row span of the cell. |  |
| sortOrder | `'descend' \| 'ascend' \| false` | `undefined` | The controlled sort order of the column. If multiple columns' sortOrder is set, the first one will affect. |  |
| sorter | `boolean \| function \| 'default'` | `false` | The sorter of the column. If set `'default'`, it will use a basic builtin compare function. If set to `true`, it will only display sort icon on the column, which can be used in async status. Otherwise it works like `Array.sort`'s compare function. |  |
| tree | `boolean` | `false` | Whether to show tree data expand trigger in the column. | 2.28.3 |
| title | `string \| (() => VNodeChild)` | `undefined` | Column title, Can be a render function. |  |
| titleColSpan | `number` | `undefined` | The number of cells occupied by the title col. |  |
| type | `'selection' \| 'expand'` | `undefined` | Column type. |  |
| width | `number \| string` | `undefined` | Width of the column (**required and should be number** when fixed). | 2.24.0 (`string` type) |

The following types can be imported from the package.

#### DataTableSortState Type

```ts
interface DataTableSortState {
  columnKey: string | number
  sorter: 'default' | function | boolean
  order: 'ascend' | 'descend' | false
}
```

#### DataTableFilterState Type

```ts
interface DataTableFilterState {
  [key: string]: Array<string | number> | string | number | null | undefined
}
```

#### DataTableCreateSummary Type

```ts
type DataTableCreateSummary = (pageData: RowData[]) =>
  | Array<{
    [columnKey: string]: {
      value?: VNodeChild
      colSpan?: number
      rowSpan?: number
    }
  }>
  | {
    [columnKey: string]: {
      value?: VNodeChild
      colSpan?: number
      rowSpan?: number
    }
  }
```

### DataTable Methods

These methods can help you control table in an uncontrolled manner. However, it's not recommended to use them to implement some async operations. If async operations is needed, use table in a **controlled** manner.

| Name | Type | Description | Version |
| --- | --- | --- | --- |
| clearFilters | `() => void` | Clear all filter state. |  |
| clearSorter | `() => void` | Clear all sort state. |  |
| downloadCsv | `(options?: { fileName?: string, keepOriginalData?: boolean }) => void` | Download CSV. | 2.37.0 |
| filters | `(filters: DataTableFilterState \| null) => void` | Set the active filters of the table. |  |
| page | `(page: number) => void` | Manually set the page. |  |
| scrollTo | `(options: { left?: number, top?: number, behavior?: ScrollBehavior }): void & (x: number, y: number) => void` | Scroll content. | 2.30.4 |
| sort | `(columnKey: string \| number, order: 'ascend' \| 'descend' \| false) => void` | Set the sort state of the table. |  |

### DataTable Slots

| Name    | Type | Description                                       | Version |
| ------- | ---- | ------------------------------------------------- | ------- |
| empty   | `()` | Custom description when data of table is empty.   |         |
| loading | `()` | Custom description when data of table is loading. | 2.34.0  |

# 数据表格 Data Table

<!--single-column-->

数据表格用来显示一些格式化信息。

## 演示

<n-alert type="warning" title="注意" style="margin-bottom: 16px;">
  传入 <n-text code>data</n-text> 属性的数组的每一项都代表渲染的一行数据，每一行数据都要有唯一的 <n-text code>key</n-text>，否则需要在 table 上声明 <n-text code>row-key</n-text> 属性。
  <br>如果你想使用服务端返回的数据进行展示，分页，过滤，排序等，请参考<n-a href="#ajax-usage">异步</n-a>。
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
fixed-column-debug
fixed-column2-debug
scroll-debug
height-debug
```

## API

### DataTable Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` | 是否显示 border |
| bottom-bordered | `boolean` | `true` | 是否显示 bottom border |
| checked-row-keys | `Array<string \| number>` | `undefined` | 被选中的列的 key |
| cascade | `boolean` | `true` | 在进行树型数据选择的时候是否级联 |
| children-key | `string` | `'children'` | 树形数据下后代节点在数据中的 key |
| columns | `Array<DataTableColumn>` | `[]` | 需要展示的列 |
| data | `Array<object>` | `[]` | 需要展示的数据 |
| default-checked-row-keys | `Array<string \| number>` | `[]` | 默认选中的 key 值 |
| default-expanded-row-keys | `Array<string \| number>` | `[]` | 默认展开行的 key 值 |
| expanded-row-keys | `Array<string \| number>` | `undefined` | 展开行的 key 值 |
| indent | `number` | `16` | 使用树形数据时行内容的缩进 |
| flex-height | `boolean` | `false` | 是否让表格主体的高度自动适应整个表格区域的高度，打开这个选项会让 `table-layout` 始终为 `'fixed'` |
| loading | `boolean` | `false` | 是否显示 loading 状态 |
| max-height | `number \| string` | `undefined` | 表格内容的最大高度，可以是 CSS 属性值 |
| min-height | `number \| string` | `undefined` | 表格内容的最低高度，可以是 CSS 属性值 |
| pagination | `false \| object` | `false` | 属性参考 [Pagination props](pagination#Pagination-Props) |
| remote | `boolean` | `false` | 表格是否自动分页数据，在异步的状况下你可能需要把它设为 `true` |
| row-class-name | `string \| (rowData: object, index : number) => string \| object` | `undefined` | 每一行上的类名 |
| row-key | `(rowData: object) => (number \| string)` | `undefined` | 通过行数据创建行的 key（如果你不想给每一行加上 key） |
| row-props | `(rowData: object, rowIndex : number) => object` | `undefined` | 自定义行属性 |
| scroll-x | `number \| string` | `undefined` | 表格内容的横向宽度，如果列被水平固定了，则需要设定它 |
| single-column | `boolean` | `false` | 列内容是否为一个整体，当参数为`true`时，则没有`border-bottom` |
| single-line | `boolean` | `true` | 行内容是否为一个整体，当参数值为`true`时，则没有`border-right` |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 表格的尺寸 |
| striped | `boolean` | `false` | 是否使用斑马线条纹 |
| summary | `DataTableCreateSummary` | `undefined` | 表格总结栏的数据，类型见 <n-a href="#DataTableCreateSummary-Type">DataTableCreateSummary Type</n-a> |
| table-layout | `'auto' \| 'fixed'` | `'auto'` | 表格的 `table-layout` 样式属性，在设定 `ellipsis` 或 `max-height` 的情况下固定为 `'fixed'` |
| virtual-scroll | `boolean` | `false` | 是否开启虚拟滚动，应对大规模数据，开启前请设定好 `max-height`。当 `virtual-scroll` 为 `true` 时，`rowSpan` 将不生效 |
| on-update:checked-row-keys | `(keys: Array<string \| number>) => void` | `undefined` | checked-row-keys 值改变时触发的回调函数 |
| on-update:expanded-row-keys | `(keys: Array<string \| number>) => void` | `undefined` | expanded-row-keys 值改变时触发的回调函数 |
| on-update:filters | `(filters: { [string \| number]: Array<string \| number> \| string \| number }, initiatorColumn: DataTableColumn)` | `undefined` | filters 数据改变时触发的回调函数 |
| on-update:page | `(page: number)` | `undefined` | page 改变时触发的回调函数 |
| on-update:page-size | `(pageSize: number) => void` | `undefined` | page-size 改变时触发的回调函数 |
| on-update:sorter | `(options: SortState \| SortState[] \| null) => void` | `undefined` | 如果变动列为多列排序则返回 `SortState[] \| null` 否则返回 `SortState \| null`，类型见 <n-a href="#SortState-Type">SortState Type</n-a> |

#### DataTableColumn Properties

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| align | `'left' \| 'right' \| 'center'` | `'left'` | 列内的文本排列 |
| children | `DataTableColumn[]` | `undefined` | 成组列头的子节点 |
| className | `string` | `undefined` | 列的类名 |
| colSpan | `(rowData: object, rowIndex: number) => number` | `undefined` | 该列单元格的的 col span |
| defaultFilterOptionValue | `string \| number \| null` | `null` | 非受控状态下默认的过滤器选项值（过滤器单选时生效） |
| defaultFilterOptionValues | `Array<string \| number>` | `[]` | 非受控状态下默认的过滤器选项值（过滤器多选时生效） |
| defaultSortOrder | `'descend' \| 'ascend' \| false` | `false` | 非受控状态下表格默认的排序方式 |
| disabled | `(rowData: object, rowIndex: number) => boolean` | `undefined` | 是否禁用 |
| ellipsis | `boolean \| EllipsisProps` | `false` | 文本溢出的设置 |
| expandable | `(rowData: object) => boolean` | `undefined` | 行是否可展开，仅在 `type` 为 `'expand'` 时生效 |
| filter | `boolean \| (optionValue: string \| number, rowData: object) => boolean \| 'default'` | `undefined` | 这一列的过滤方法。如果设为 `true`，表格将只会在这列展示一个排序图标，在异步的时候可能有用。 |
| filterMode | `'and' \| 'or'` | `'or'` | 同一列筛选方式为与还是或 |
| filterMultiple | `boolean` | `true` | 同一列是否可以筛选多个 |
| filterOptionValue | `string \| number \| null` | `undefined` | 受控状态下，当前激活的过滤器选项值。如果不做设定，这一列的过滤行为将是非受控的（过滤器单选时生效） |
| filterOptionValues | `Array<string \| number> \| null` | `undefined` | 受控状态下，当前激活的过滤器选项值数组。如果不做设定，这一列的过滤行为将是非受控的（过滤器多选时生效） |
| filterOptions | `Array<{ label: string, value: string \| number}>` | `undefined` | filter 的 options 数据 |
| fixed | `'left \| 'right' \| false` | `false` | 该列是否需要 fixed |
| key | `string \| number` | `undefined` | 这一列的 key，不可重复。 |
| options | `Array<'all' \| 'none' \| { label: string, key: string \| number, onSelect: (pageData: RowData) => void }>` | `undefined` | 自定义选择项的选项，只对 `type='selection'` 生效 |
| render | `(rowData: object, rowIndex: number) => VNodeChild` | `undefined` | 渲染函数，渲染这一列的每一行的单元格 |
| renderExpand | `(rowData: object, rowIndex: number) => VNodeChild` | `undefined` | 展开区域的渲染函数，仅在 `type` 为 `'expand'` 的时候生效 |
| renderFilterMenu | `(actions: { hide: () => void }) => VNodeChild` | `undefined` | 渲染函数，渲染这一列的过滤器菜单 |
| renderFilterIcon | `(options: { active: boolean, show: boolean }) => VNodeChild` | `undefined` | 渲染函数，渲染过滤器图标 |
| renderFilter | `(options: { active: boolean, show: boolean }) => VNodeChild` | `undefined` | 渲染函数，渲染过滤器触发元素 |
| rowSpan | `(rowData: object, rowIndex: number) => number` | `undefined` | 该列单元格的 row span |
| sortOrder | `'descend' \| 'ascend' \| false` | `undefined` | 受控状态下表格的排序方式。如果多列都设定了有效值，那么只有第一个会生效 |
| sorter | `boolean \| function \| 'default'` | `undefined` | 这一列的排序方法。如果设为 `'default'` 表格将会使用一个内置的排序函数；如果设为 `true`，表格将只会在这列展示一个排序图标，在异步的时候可能有用。其他情况下它工作的方式类似 `Array.sort` 的对比函数 |
| title | `string \| (() => VNodeChild)` | `undefined` | 列的 title 信息，可以是渲染函数 |
| titleRowSpan | `number` | `undefined` | title 行所占的单元格的个数 |
| type | `'selection' \| 'expand'` | `undefined` | 列的类型 |
| width | `number` | `undefined` | 列的宽度，在列固定时是**必需**的 |

#### DataTableCreateSummary Type

```ts
type DataTableCreateSummary = (pageData: RowData[]) =>
  | Array<{
      [columnKey: string]: {
        value?: string | number
        colSpan?: number
        rowSpan?: number
      }
    }>
  | {
      [columnKey: string]: {
        value?: string | number
        colSpan?: number
        rowSpan?: number
      }
    }
```

#### SortState Type

```ts
type SortState = {
  columnKey: string | number
  sorter: 'default' | function | boolean
  order: 'ascend' | 'descend' | false
}
```

### DataTable Methods

这些方法可以帮助你在非受控的状态下改变表格，但是，并不推荐在异步的状况下使用这些方法。如果需要异步操作，最好用**受控**的方式使用表格。

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| clearFilters | `() => void` | 清空所有的 filter 状态 |
| clearSorter | `() => void` | 清空所有的 sort 状态 |
| filters | `(filters: { [string \| number]: Array<string \| number> }) => void` | 设定表格当前的过滤器 |
| page | `(page: number) => void` | 手动设置 page |
| sort | `(columnKey: string \| number \| null, order: 'ascend' \| 'descend' \| false) => void` | 如果 columnKey 设为 `null`，那它和 clearSorter 效果一致 |

### DataTable Slots

| 名称  | 参数 | 说明                 |
| ----- | ---- | -------------------- |
| empty | `()` | 表格数据为空时的展示 |

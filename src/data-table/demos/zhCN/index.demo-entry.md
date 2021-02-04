# 数据表格 Data Table

<!--single-column-->

数据表格用来显示一些格式化信息。

## 演示

<n-alert type="warning" title="注意" style="margin-bottom: 16px;">
  每一列数据都要有唯一的 key，否则要在 table 上声明 <n-text code>row-key</n-text> 属性
</n-alert>

```demo
basic
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

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| bordered | `boolean` | `true` |  |
| checked-row-keys | `Array<string \| number>` | `undefined` | 被选中的列的 key |
| columns | `Array<Column>` |  | 需要展示的列，**必需** |
| data | `Array<Object>` | `[]` | 需要展示的数据 |
| default-checked-row-keys | `Array<string \| number>` | `[]` |  |
| loading | `boolean` | `false` |  |
| max-height | `number \| string` | `undefined` | 表格的最大高度，如果内容高度高于它，那么表头将固定 |
| min-height | `number \| string` | `undefined` | 表格的最低高度 |
| pagination | `false \| Object` | `false` | 属性参考 [Pagination props](n-pagination#Props) |
| paging | `boolean` | `true` | 表格是否自动分页数据，在异步的状况下你可能需要把它设为 `false` |
| row-class-name | `string \| (rowData: Object, index : number) => string \| Object` | `undefined` |  |
| row-key | `(rowData: Object) => number \| string` | `undefined` | 通过行数据创建行的 key（如果你不想给每一行加上 key） |
| scroll-x | `number \| string` | `undefined` | 表格内容的横向宽度，如果列被水平固定了，则需要设定它 |
| single-column | `boolean` | `false` |  |
| single-line | `boolean` | `true` |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` |  |
| on-update:checked-row-keys | `(keys: Array<string \| number>) => any` | `undefined` |  |
| on-update:filters | `(filters: { [string \| number]: Array<string \| number> \| string \| number }, initiatorColumn: Column)` |  |
| on-update:page | `(page: number)` | `undefined` |  |
| on-update:page-size | `(pageSize: number) => any` | `undefined` |  |
| on-update:sorter | `(options: { columnKey: string \| number, sorter: 'default' \| function \| boolean, order: 'ascend' \| 'descend' \| false } \| null) => any` | `undefined` | 如果在变动后没有激活的排序，那么 `options` 为 `null` |

## Methods

这些方法可以帮助你在非受控的状态下改变表格，但是，并不推荐在异步的状况下使用这些方法。如果需要异步操作，最好用**受控**的方式使用表格。

| 名称 | 参数 | 说明 |
| --- | --- | --- |
| clearFilters | `() => void` |  |
| clearSorter | `() => void` |  |
| filters | `(filters: { [string \| number]: Array<string \| number> }) => void` | 设定表格当前的过滤器 |
| page | `(page: number) => void` |  |
| sort | `(columnKey: string \| number \| null, order: 'ascend' \| 'descend' \| false) => void` | 如果 columnKey 设为 `null`，那它和 clearSorter 效果一致 |

## API

### Column Properties

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| align | `'left' \| 'right' \| 'center'` | `'left'` | 列内的文本排列 |
| className | `string` | `undefined` |  |
| defaultFilterOptionValue | `string \| number \| null` | `null` | 非受控状态下默认的过滤器选项值（过滤器单选时生效） |
| defaultFilterOptionValues | `Array<string \| number>` | `[]` | 非受控状态下默认的过滤器选项值（过滤器多选时生效） |
| defaultSortOrder | `'descend' \| 'ascend' \| false` | `false` | 非受控状态下表格默认的排序方式 |
| disabled | `(rowData: Object, index: number) => boolean` | `undefined` |  |
| ellipsis | `boolean` | `false` |  |
| filter | `boolean \| (optionValue: string \| number, rowData: Object) => boolean \| 'default'` | `undefined` | 这一列的过滤方法。如果设为 `true`，表格将只会在这列展示一个排序图标，在异步的时候可能有用。 |
| filterMode | `'and' \| 'or'` | `'or'` |  |
| filterMultiple | `boolean` | `true` |  |
| filterOptionValue | `string \| number \| null` | `undefined` | 受控状态下，当前激活的过滤器选项值。如果不做设定，这一列的过滤行为将是非受控的（过滤器单选时生效） |
| filterOptionValues | `Array<string \| number> \| null` | `undefined` | 受控状态下，当前激活的过滤器选项值数组。如果不做设定，这一列的过滤行为将是非受控的（过滤器多选时生效） |
| filterOptions | `Array<{ label: string, value: string \| number}>` | `undefined` |  |
| fixed | `'left \| 'right' \| false` | `false` |  |
| key | `string \| number` | **必须** | 这一列的 key，在表格未设定 row-key 的时候是**必须**的。 |
| render | `(rowData: Object) => VNodeChild` | `undefined` | 渲染函数，渲染这一列的每一行的单元格 |
| renderFilterMenu | `() => VNodeChild` | `undefined` | 渲染函数，渲染这一列的过滤器菜单 |
| sortOrder | `'descend' \| 'ascend' \| false` | `undefined` | 受控状态下表格的排序方式。如果多列都设定了有效值，那么只有第一个会生效 |
| sorter | `boolean \| function \| 'default'` | `undefined` | 这一列的排序方法。如果设为 `'default'` 表格将会使用一个内置的排序函数；如果设为 `true`，表格将只会在这列展示一个排序图标，在异步的时候可能有用。其他情况下它工作的方式类似 `Array.sort` 的对比函数 |
| title | `string \| (() => VNodeChild)` | `undefined` | 可以是渲染函数 |
| type | `'selection'` | `undefined` |  |
| width | `number \| string` | `undefined` | 列的宽度，在列固定时是**必需**的 |

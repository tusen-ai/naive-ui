# 数据表格 Data Table

<!--single-column-->

数据表格用来显示一些格式化信息。

<n-alert type="warning" title="注意" style="margin-bottom: 16px;" :bordered="false">
  <n-ul align-text>
    <li>
      传入 <n-text code>data</n-text> 属性的数组的每一项都代表渲染的一行数据，每一行数据都要有唯一的 <n-text code>key</n-text>，否则需要在 table 上声明 <n-text code>row-key</n-text> 属性。
    </li>
    <li>
      在非异步状况下，总页数 <n-text code>page-count</n-text> 是由数据的数量决定的，即使传入 <n-text code>page-count</n-text> 也不会生效，如果你希望指定总页数，需要设定 <n-text code>remote</n-text> 属性。
    </li>
    <li>
    如果你想使用服务端返回的数据进行展示，分页，过滤，排序等，请参考<n-a href="#ajax-usage">异步</n-a>。
    </li>
  </n-ul>
</n-alert>

## 演示

```demo
summary-debug.vue
debug.vue
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
fixed-column-debug
fixed-column2-debug
scroll-debug
height-debug
keep-alive-debug.vue
ellipsis-debug.vue
custom-expand-icon-debug.vue
expandable-debug.vue
rtl-debug.vue
```

## API

### DataTable Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| allow-checking-not-loaded | `boolean` | `false` | 是否允许级联勾选还没有完全加载的节点。如果你要用这个属性，请记住 `checked-row-keys` 可能是不完整的 | 2.28.0 |
| bordered | `boolean` | `true` | 是否显示 border |  |
| bottom-bordered | `boolean` | `true` | 是否显示 bottom border |  |
| checked-row-keys | `Array<string \| number>` | `undefined` | 被选中的行的 key |  |
| cascade | `boolean` | `true` | 在进行树型数据选择的时候是否级联 |  |
| children-key | `string` | `'children'` | 树形数据下后代节点在数据中的 key |  |
| columns | `Array<DataTableColumn>` | `[]` | 需要展示的列 |  |
| data | `Array<object>` | `[]` | 需要展示的数据 |  |
| default-checked-row-keys | `Array<string \| number>` | `[]` | 默认选中的 key 值 |  |
| default-expanded-row-keys | `Array<string \| number>` | `[]` | 默认展开行的 key 值 |  |
| default-expand-all | `boolean` | `false` | 是否默认展开全部可展开的行，不可在异步展开行时使用 | 2.30.4 |
| expanded-row-keys | `Array<string \| number>` | `undefined` | 展开行的 key 值 |  |
| indent | `number` | `16` | 使用树形数据时行内容的缩进 |  |
| filter-icon-popover-props | `PopoverProps` | `{ trigger: click, placement: bottom }` | 过滤按钮的 Popover 属性，属性参考 [Popover props](popover#Popover-Props) | 2.39.0 |
| flex-height | `boolean` | `false` | 是否让表格主体的高度自动适应整个表格区域的高度，打开这个选项会让 `table-layout` 始终为 `'fixed'` |  |
| loading | `boolean` | `false` | 是否显示 loading 状态 |  |
| max-height | `number \| string` | `undefined` | 表格内容的最大高度，可以是 CSS 属性值 |  |
| min-height | `number \| string` | `undefined` | 表格内容的最低高度，可以是 CSS 属性值 |  |
| paginate-single-page | `boolean` | `true` | 当表格数据只有一页时是否显示分页面 | 2.28.0 |
| pagination | `false \| object` | `false` | 属性参考 [Pagination props](pagination#Pagination-Props) |  |
| pagination-behavior-on-filter | `'first' \| 'current'` | `'current'` | 过滤操作后页面的状态，`'first'` 为回到首页，`'current'` 为停留在当前页 | 2.28.3 |
| remote | `boolean` | `false` | 表格是否自动分页数据，在异步的状况下你可能需要把它设为 `true` |  |
| render-cell | `(value: any, rowData: object, column: DataTableBaseColumn) => VNodeChild` | `undefined` | 自定义单元格渲染，优先级低于列的 `render` | 2.30.5 |
| render-expand-icon | `({ expanded }: { expanded: boolean }) => VNodeChild` | `undefined` | 自定义渲染展开图标 | 2.32.2, `expanded`: 2.34.4 |
| row-class-name | `string \| (rowData: object, index : number) => string` | `undefined` | 每一行上的类名 |  |
| row-key | `(rowData: object) => (number \| string)` | `undefined` | 通过行数据创建行的 key（如果你不想给每一行加上 key） |  |
| row-props | `(rowData: object, rowIndex : number) => HTMLAttributes` | `undefined` | 自定义行属性 |  |
| scroll-x | `number \| string` | `undefined` | 表格内容的横向宽度，如果列被水平固定了，则需要设定它 |  |
| scrollbar-props | `ScrollbarProps` | `undefined` | 属性参考 [Scrollbar props](scrollbar#Scrollbar-Props)，`DataTable` 中已存在 `on-scroll` 属性，此处 `on-scroll` 属性不生效 |  |
| single-column | `boolean` | `false` | 是否不设定行的分割线，当参数为`true`时，则单元格没有下边线 |  |
| single-line | `boolean` | `true` | 是否不设定列的分割线，当参数值为 `true` 时，则单元格没有右边线 |  |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 表格的尺寸 |  |
| spin-props | `{ strokeWidth?: number, stroke?: string }` | `undefined` | 表格 spin 的属性 | 2.34.0 |
| sticky-expanded-rows | `boolean` | `false` | 展开行是否不随表格横向滚动 | 2.32.2 |
| striped | `boolean` | `false` | 是否使用斑马线条纹 |  |
| summary | `DataTableCreateSummary` | `undefined` | 表格总结栏的数据，类型见 <n-a href="#DataTableCreateSummary-Type">DataTableCreateSummary Type</n-a> |  |
| summary-placement | `'top' \| 'bottom'` | `'bottom'` | 总结栏的位置 | 2.33.3 |
| table-layout | `'auto' \| 'fixed'` | `'auto'` | 表格的 `table-layout` 样式属性，在设定 `ellipsis` 或 `max-height` 的情况下固定为 `'fixed'` |  |
| virtual-scroll | `boolean` | `false` | 是否开启虚拟滚动，应对大规模数据，开启前请设定好 `max-height`。当 `virtual-scroll` 为 `true` 时，`rowSpan` 将不生效 |  |
| on-load | `(rowData: object) => Promise<void>` | `undefined` | 异步展开树形数据的回调 | 2.27.0 |
| on-scroll | `(e: Event) => void` | `undefined` | 表格主体滚动的回调 | 2.29.1 |
| on-update:checked-row-keys | `(keys: Array<string \| number>, rows: object[], meta: { row: object \| undefined, action: 'check' \| 'uncheck' \| 'checkAll' \| 'uncheckAll' }) => void` | `undefined` | checked-row-keys 值改变时触发的回调函数 | `rows` 2.30.5, `meta` 2.33.4 |
| on-update:expanded-row-keys | `(keys: Array<string \| number>) => void` | `undefined` | expanded-row-keys 值改变时触发的回调函数 |  |
| on-update:filters | `(filters: DataTableFilterState, initiatorColumn: DataTableBaseColumn)` | `undefined` | filters 数据改变时触发的回调函数 |
| on-update:page | `(page: number)` | `undefined` | page 改变时触发的回调函数 |  |
| on-update:page-size | `(pageSize: number) => void` | `undefined` | page-size 改变时触发的回调函数 |  |
| on-update:sorter | `(options: DataTableSortState \| DataTableSortState[] \| null) => void` | `undefined` | 如果变动列为多列排序则返回 `DataTableSortState[] \| null` 否则返回 `DataTableSortState \| null` |  |

#### DataTableColumn Properties

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| align | `'left' \| 'right' \| 'center'` | `'left'` | 列内的文本排列 |  |
| allowExport | `boolean` | `true` | 这一列是否可以导出 | NEXT_VERSION |
| titleAlign | `'left' \| 'right' \| 'center'` | `'null'` | 表头列对齐方式，若不设置该项，则使用列内的文本排列 | 2.34.4 |
| cellProps | `(rowData: object, rowIndex: number) => object` | `undefined` | 该列单元格的 HTML 属性 | 2.27.0 |
| children | `DataTableColumn[]` | `undefined` | 成组列头的子节点 |  |
| className | `string` | `undefined` | 列的类名 |  |
| colSpan | `(rowData: object, rowIndex: number) => number` | `undefined` | 该列单元格的的 col span |  |
| defaultFilterOptionValue | `string \| number \| null` | `null` | 非受控状态下默认的过滤器选项值（过滤器单选时生效） |  |
| defaultFilterOptionValues | `Array<string \| number>` | `[]` | 非受控状态下默认的过滤器选项值（过滤器多选时生效） |  |
| defaultSortOrder | `'descend' \| 'ascend' \| false` | `false` | 非受控状态下表格默认的排序方式 |  |
| disabled | `(rowData: object, rowIndex: number) => boolean` | `undefined` | 是否禁用 |  |
| ellipsis | `boolean \| EllipsisProps` | `false` | 文本溢出的设置 |  |
| ellipsis-component | `'ellipsis' \| 'performant-ellipsis'` | `'ellipsis'` | 渲染文本溢出时使用的组件，在 `ellipsis` 属性为 `EllipsisProps` 时生效。若为 `'ellipsis'` 则使用常规的 `n-ellipsis` 组件渲染，若为 `'performant-ellipsis'` 则使用 `n-performant-ellipsis` 渲染，这种情况下会有更高的渲染性能，但是每个折叠的单元格中的组件有可能被重新卸载和挂载 | 2.35.0 |
| expandable | `(rowData: object) => boolean` | `undefined` | 行是否可展开，仅在 `type` 为 `'expand'` 时生效 |  |
| filter | `boolean \| (optionValue: string \| number, rowData: object) => boolean \| 'default'` | `undefined` | 这一列的过滤方法。如果设为 `true`，表格将只会在这列展示一个排序图标，在异步的时候可能有用。 |  |
| filterMode | `'and' \| 'or'` | `'or'` | 同一列筛选方式为与还是或 |  |
| filterMultiple | `boolean` | `true` | 同一列是否可以筛选多个 |  |
| filterOptionValue | `string \| number \| null` | `undefined` | 受控状态下，当前激活的过滤器选项值。如果不做设定，这一列的过滤行为将是非受控的（过滤器单选时生效） |  |
| filterOptionValues | `Array<string \| number> \| null` | `undefined` | 受控状态下，当前激活的过滤器选项值数组。如果不做设定，这一列的过滤行为将是非受控的（过滤器多选时生效） |  |
| filterOptions | `Array<{ label: string, value: string \| number}>` | `undefined` | filter 的 options 数据 |  |
| resizable | `boolean` | `undefined` | 列宽是否可以拖动 | 2.33.4 |
| fixed | `'left \| 'right' \| false` | `false` | 该列是否需要 fixed |  |
| key | `string \| number` | `undefined` | 这一列的 key，不可重复。 |  |
| minWidth | `number \| string` | `undefined` | 列的最小宽度 | 2.28.3 |
| maxWidth | `number \| string` | `undefined` | 列的最大宽度，仅在 `resizable` 为 `true` 的时候生效 | 2.33.4 |
| multiple | `boolean` | `true` | 是否开启多选，仅在 `type` 为 `'selection'` 的时候生效 | 2.31.0 |
| options | `Array<'all' \| 'none' \| { label: string, key: string \| number, onSelect: (pageData: RowData[]) => void }>` | `undefined` | 自定义选择项的选项，只对 `type='selection'` 生效 |  |
| render | `(rowData: object, rowIndex: number) => VNodeChild` | `undefined` | 渲染函数，渲染这一列的每一行的单元格 |  |
| renderExpand | `(rowData: object, rowIndex: number) => VNodeChild` | `undefined` | 展开区域的渲染函数，仅在 `type` 为 `'expand'` 的时候生效 |  |
| renderFilter | `(options: { active: boolean, show: boolean }) => VNodeChild` | `undefined` | 渲染函数，渲染过滤器触发元素 |  |
| renderFilterIcon | `(options: { active: boolean, show: boolean }) => VNodeChild` | `undefined` | 渲染函数，渲染过滤器图标 |  |
| renderFilterMenu | `(actions: { hide: () => void }) => VNodeChild` | `undefined` | 渲染函数，渲染这一列的过滤器菜单 |  |
| renderSorter | `(options: { order: 'descend' \| 'ascend' \| false }) => VNodeChild` | `undefined` | 渲染函数，渲染排序触发 | 2.24.2 |
| renderSorterIcon | `(options: { order: 'descend' \| 'ascend' \| false }) => VNodeChild` | `undefined` | 渲染函数，渲染排序图标 | 2.24.2 |
| rowSpan | `(rowData: object, rowIndex: number) => number` | `undefined` | 该列单元格的 row span |  |
| sortOrder | `'descend' \| 'ascend' \| false` | `undefined` | 受控状态下表格的排序方式。如果多列都设定了有效值，那么只有第一个会生效 |  |
| sorter | `boolean \| function \| 'default'` | `undefined` | 这一列的排序方法。如果设为 `'default'` 表格将会使用一个内置的排序函数；如果设为 `true`，表格将只会在这列展示一个排序图标，在异步的时候可能有用。其他情况下它工作的方式类似 `Array.sort` 的对比函数 |  |
| tree | `boolean` | `false` | 是否在这一列展示树形数据的展开按钮 | 2.28.3 |
| title | `string \| (() => VNodeChild)` | `undefined` | 列的 title 信息，可以是渲染函数 |  |
| titleColSpan | `number` | `undefined` | title 列占据的列数 |  |
| type | `'selection' \| 'expand'` | `undefined` | 列的类型 |  |
| width | `number \| string` | `undefined` | 列的宽度（在列固定时是**必需**的，并且需要为 `number` 类型） | 2.24.0（`string` 类型） |

下面的类型可以直接从包中引入。

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

这些方法可以帮助你在非受控的状态下改变表格，但是，并不推荐在异步的状况下使用这些方法。如果需要异步操作，最好用**受控**的方式使用表格。

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| clearFilters | `() => void` | 清空所有的 filter 状态 |  |
| clearSorter | `() => void` | 清空所有的 sort 状态 |  |
| downloadCsv | `(options?: { fileName?: string, keepOriginalData?: boolean }) => void` | 下载 CSV | 2.37.0 |
| filters | `(filters: DataTableFilterState \| null) => void` | 设定表格当前的过滤器 |  |
| page | `(page: number) => void` | 手动设置 page |  |
| scrollTo | `(options: { left?: number, top?: number, behavior?: ScrollBehavior }): void & (x: number, y: number) => void` | 滚动内容 | 2.30.4 |
| sort | `(columnKey: string \| number \| null, order: 'ascend' \| 'descend' \| false) => void` | 设定表格的过滤状态 |  |

### DataTable Slots

| 名称    | 参数 | 说明                  | 版本   |
| ------- | ---- | --------------------- | ------ |
| empty   | `()` | 表格数据为空时的展示  |        |
| loading | `()` | 表格 loading 时的展示 | 2.34.0 |

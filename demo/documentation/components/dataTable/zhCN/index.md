# 数据表格 Data Table

<!--single-column-->

数据表格用来显示一些格式化信息。

## 演示
<n-alert type="warning" title="注意" style="margin-bottom: 16px;">
  <n-ol align-text>
    <n-li>每一列数据都要有唯一的 key，否则要在 table 上声明 row-key prop。</n-li>
    <n-li>在受控状态下，你最好提前声明每一个你可能用到的属性。因为 Vue 并不能追踪使用常规方式添加的属性。</n-li>
  </n-ol>
</n-alert>

```demo
basic
filterAndSorter
select
controlled-page
controlled-filter
controlled-sorter
fixedHeader
fixedHeaderColumn
ellipsis
renderHeader
customStyle
ajaxUsage
```

## Props
|名称|类型|默认值|介绍|
|-|-|-|-|
|data|`Array<object>`|`[]`|需要展示的数据|
|columns|`Array<Column>`||需要展示的列，**必需**|
|max-height|`number`|`null`|表格的最大高度，如果内容高度高于它，那么表头将固定|
|min-height|`number`|`null`|表格的最低高度|
|loading|`boolean`|`false`||
|scroll-x|`number`|`null`|表格内容的横向宽度，如果列被水平固定了，则需要设定它|
|pagination|`false \| object`|`false`|属性参考 [Pagination props](n-pagination#Props)|
|paging|`boolean`|表格是否自动分页数据，在异步的状况下你可呢个要把它设为 `false`|
|row-class-name|`string \| (rowData: object, index : number) : string \| object`|`null`||
|checked-row-keys|`Array<string \| number> \| null`|`null`||
|default-checked-row-keys|`Array<string \| number>`|`[]`||
|row-key|`(any) : number \| string`|`null`|通过行数据创建行的 key（如果你不想给每一行加上 key）|

## Methods
这些方法可以帮助你在非受控的状态下改变表格，但是，并不推荐在异步的状况下使用这些方法。如果需要异步操作，最好用**受控**的方式使用表格。

|名称|参数|介绍|
|-|-|-|
|filters|`( columnKey: string \| number, filterOptionValue: string \| number } \| Array<{ columnKey: string \| number, filterOptionValue: string \| number }>)`||
|sort|`(columnKey: string \| null, order: 'ascend' \| 'descend' \| false)`|如果 columnKey 设为 `null`，那它和 clearSorter 效果一致|
|page|`(page: number) : void`||
|clearFilters|`() : void`||
|clearSorter|`() : void`||


## Events
|名称|参数|介绍|
|-|-|-|
|filters-change|`(Array<{ columnKey: string \| number, filterOptionValue: string \| number }>, initiatorColumn: object)`||
|sorter-change|`({ columnKey: string \| number, sorter: 'default' \| function \| boolean, order: 'ascend' \| 'descend' \| false } \| null)`|如果在变动后没有激活的排序，那么 sorter-change 将发出 `null`|
|page-change|`(page: number)`||
|page-size-change|`(pageSize: number)`||
|checked-row-keys-change|`(keys: Array<string \| number>)`||

## API
### Column Type
|属性|类型|默认值|介绍|
|-|-|-|-|
|render|`(h, rowData: object): VNode \| Array<VNode>`|`null`|渲染函数，渲染这一列的每一行的单元格|
|type|`'default' \| 'selection'`|`default`||
|disabled|`(rowData: object, index: number) => boolean`|`() => false`||
|align|`'left' \| 'right' \| 'center'`|`'left'`|列内的文本排列|
|ellipsis|`boolean`|`false`||
|className|`string`|`null`||
|title|`string \| function`|`null`|可以是渲染函数|
|key|`string`||这一列的 key，在表格未设定 row-key 的时候是**必须**的。|
|sorter|`boolean \| function \| 'default'`|`false`|这一列的排序方法。如果设为 `'default'` 表格将会使用一个内置的排序函数；如果设为 `true`，表格将只会在这列展示一个排序图标，在异步的时候可能有用。其他情况下它工作的方式类似   `Array.sort` 的对比函数|
|defaultSortOrder|`'descend' \| 'ascend' \| false`|`false`|非受控状态下表格默认的排序方式|
|sortOrder|`'descend' \| 'ascend' \| false \| null`|`null`|受控状态下表格的排序方式。如果不是 `null`，表格整体的排序将会是受控的。如果多列都设定了有效值，那么只有第一个会生效|
|filter|`boolean \| (optionValue: string \| number, rowData: object) => boolean`|`false`|这一列的过滤方法。如果设为 `true`，表格将只会在这列展示一个排序图标，在异步的时候可能有用。|
|filterMode|`'and' \| 'or'`|`'or'`||
|filterOptions|`Array<{ label: string, value: string \| number}>`|`[]`||
|filterOptionValues|`Array<string \| number> \| null`|`null`|受控状态下，当前激活的过滤器选项值。如果设为 `null`，这一列的过滤行为将是非受控的|
|defaultFilterOptionValues|`Array<string \| number>`|`[]`|非受控状态下默认的过滤器选项值|
|filterMultiple|`boolean`|`true`||
|fixed|`'left \| 'right' \| false`|`false`||
|width|`number`|`null`|列的宽度，在列固定时是**必需**的|
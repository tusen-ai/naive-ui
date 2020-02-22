# Data Table

<!--single-column-->

DataTable is used to displays rows of structured data.

## Demos
<n-alert type="warning" title="Caveat" style="margin-bottom: 16px;">
  <n-ol align-text>
    <n-li>Every row data needs a unique key property, otherwise you should specify <n-text code>row-key</n-text> prop on table.</n-li>
    <n-li>In controlled manner, you'd better specify all the properies you may use in advance. Since Vue cannot detect normal property additions.</n-li>
  </n-ol>
</n-alert>

```demo
basic
border
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
|Name|Type|Default|Description|
|-|-|-|-|
|data|`Array<object>`|`[]`|Data to display|
|columns|`Array<Column>`||Columns to display, **required**|
|max-height|`number`|`null`|The max-height of the table. If content height is larger than it, the header will be fixed at top|
|min-height|`number`|`null`|The min-height of the table.|
|loading|`boolean`|`false`||
|scroll-x|`number`|`null`|If columns are horizontal fixed, scroll-x need to be set|
|pagination|`false \| object`|`false`|See [Pagination props](n-pagination#Props)|
|paging|`boolean`|If data-table do automatic paging. You may set it to `false` in async usage.|
|row-class-name|`string \| (rowData: object, index : number) => string \| object`|`null`||
|checked-row-keys|`Array<string \| number> \| null`|`null`||
|default-checked-row-keys|`Array<string \| number>`|`[]`||
|row-key|`(rowData: object) => number \| string`|`null`|Generate the key of the row by row data (if you don't want to set the key)|

## Methods
These methods can help you control table in an uncontrolled manner. However, it's not recommended to use them to implement some async operations. If async operations is needed, use table in a **controlled** manner.

|Name|Type|Description|
|-|-|-|
|filters|`( columnKey: string \| number, filterOptionValue: string \| number } \| Array<{ columnKey: string \| number, filterOptionValue: string \| number }>)`||
|sort|`(columnKey: string \| null, order: 'ascend' \| 'descend' \| false)`|If columnKey set to `null`, it is same as clearSorter|
|page|`(page: number) => void`||
|clearFilters|`() => void`||
|clearSorter|`() => void`||


## Events
|Name|Parameters|Description|
|-|-|-|
|filters-change|`(Array<{ columnKey: string \| number, filterOptionValue: string \| number }>, initiatorColumn: object)`||
|sorter-change|`({ columnKey: string \| number, sorter: 'default' \| function \| boolean, order: 'ascend' \| 'descend' \| false } \| null)`|If there won't be a active sorter after change, sorter-change will emit `null`|
|page-change|`(page: number)`||
|page-size-change|`(pageSize: number)`||
|checked-row-keys-change|`(keys: Array<string \| number>)`||

## API
### Column
|Property|Type|Default|Description|
|-|-|-|-|
|render|`(h, rowData: object) => VNode \| Array<VNode>`|`null`|Render function of column row cell|
|type|`'default' \| 'selection'`|`default`||
|disabled|`(rowData: object, index: number) => boolean`|`() => false`||
|align|`'left' \| 'right' \| 'center'`|`'left'`|Text align in column|
|ellipsis|`boolean`|`false`||
|className|`string`|`null`||
|title|`string \| function`|`null`|Can be a render function|
|key|`string`||Unique key of this column, **required** when table's row-key is not set.|
|sorter|`boolean \| function \| 'default'`|`false`|The sorter of the column. If set `'default'`, it will use a basic builtin compare function. If set to `true`, it will only display sort icon on the column, which can be used in async status. Otherwise it works like `Array.sort`'s compare function.|
|defaultSortOrder|`'descend' \| 'ascend' \| false`|`false`|The default sort order of the table in uncontrolled manner|
|sortOrder|`'descend' \| 'ascend' \| false \| null`|`null`|The controlled sort order of the column. If it is not `null`, the table's sort status will be in controlled mode. If multiple columns' sortOrder is set, the first one will affect.|
|filter|`boolean \| (optionValue: string \| number, rowData: object) => boolean`|`false`|The filter of the column. If set to `true`, it will only display filter button on the column, which can be used in async status.|
|filterMode|`'and' \| 'or'`|`'or'`||
|filterOptions|`Array<{ label: string, value: string \| number}>`|`[]`||
|filterOptionValues|`Array<string \| number> \| null`|`null`|The active filter option values in controlled manner. If set to `null`, the filter of the column works in an uncontrolled manner|
|defaultFilterOptionValues|`Array<string \| number>`|`[]`|The default active filter option values in uncontrolled manner|
|filterMultiple|`boolean`|`true`||
|fixed|`'left \| 'right' \| false`|`false`||
|width|`number \| string`|`null`|Width of the column, **required** when fixed|
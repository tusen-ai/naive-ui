# DataTable

<!--single-column-->

DataTable is used to displays rows of data.

## When To Use

- To display a collection of structured data.
- To sort, search, paginate, filter data.

## Demos
<n-alert type="warning" title="Caveat" style="margin-bottom: 16px;">
  Every row data needs a unique key property.
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
|Name|Type|Default|Description|
|-|-|-|-|
|data|`Array<object>`|`[]`|Data to display|
|columns|`Array<Column>`||Columns to display, **required**|
|max-height|`number`|`null`|The max-height of the table. If content height is larger than it, the header will be fixed at top|
|min-height|`number`|`null`|The min-height of the table.|
|loading|`boolean`|`false`||
|bordered|`boolean`|`true`||
|scroll-x|`number`|`null`|If columns are horizontal fixed, scroll-x need to be set|
|pagination|`false \| object`|`false`|See [Pagination props](n-pagination#Props)|
|row-class-name|`string \| (rowData: object, index : number) : string \| object`|`null`||
|checked-row-keys|`Array<string \| number> \| null`|`null`||
|default-checked-row-keys|`Array<string \| number>`|`[]`||
|row-key|`(any) : number \| string`|`null`||

## Methods
These methods can help you control table in an uncontrolled manner. However, it's not recommended to use them to implement some async operations. If async operations is needed, use table in a **controlled** manner.

|Name|Type|Description|
|-|-|-|
|filters|`( columnKey: string \| number, filterOptionValue: string \| number } \| Array<{ columnKey: string \| number, filterOptionValue: string \| number }>)`||
|sort|`(columnKey: string \| null, order: 'ascend' \| 'descend' \| false)`|If set to `null`, it is same as clearSorter|
|page|`(page: number) : void`||
|clearFilters|`() : void`||
|clearSorter|`() : void`||


## Events
|Name|Parameters|Description|
|-|-|-|
|filters-change|`(Array<{ columnKey: string \| number, filterOptionValue: string \| number }>, sourceColumn: object) : void`||
|sorter-change|`({ columnKey: string \| number, sorter: 'default' \| function \| boolean, order: 'ascend' \| 'descend' \| false }) : void`||
|page-change|`(page: number)`||
|page-size-change|`(pageSize: number)`||
|checked-row-keys-change|`(keys: Array<string \| number>)`||

## API
### Column
|Property|Type|Default|Description|
|-|-|-|-|
|render|`(h, rowData: object): VNode \| Array<VNode>`|`null`|Render function of column row cell|
|type|`'default' \| 'selection'`|`default`||
|disabled|`(rowData: object, index: number) => boolean`|`() => false`||
|align|`'left' \| 'right' \| 'center'`|`'left'`|Text align in column|
|ellipsis|`boolean`|`false`||
|className|`string`|`null`||
|title|`string \| function`|`null`|Can be a render function|
|key|`string`||Unique key of this column, **required**|
|sorter|`boolean \| function \| 'default'`|`false`|The sorter of the column. If set `'default'`, it will use a basic builtin compare function. If set to `true`, it will only display sort icon on the column, which can be used in async status. Otherwise it works like `Array.sort`'s compare function.|
|defaultSortOrder|`'descend' \| 'ascend' \| false`|`false`|The default sort order of the table in uncontrolled manner|
|sortOrder|`'descend' \| 'ascend' \| false \| null`|`null`|The controlled sort order of the column. If it is not `null`, the table's sort status will be in controlled mode. If multiple columns' sortOrder is set, the first one will affect.|
|filter|`boolean \| (optionValue: string \| number, rowData: object) => boolean`|`false`||
|filterMode|`'and' \| 'or'`|`'or'`||
|filterOptions|`Array<{ label: string, value: string \| number}>`|`[]`||
|filterOptionValues|`Array<string \| number> \| null`|`null`|The active filter option values in controlled manner. If set to `null`, the filter of the column works in an uncontrolled manner|
|defaultFilterOptionValues|`Array<string \| number>`|`[]`|The default active filter option values in uncontrolled manner|
|filterMultiple|`boolean`|`true`||
|fixed|`'left \| 'right' \| false`|`false`||
|width|`number`|`null`|Width of the column, **required** when fixed|
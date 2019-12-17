# Table

<!--single-column-->

Table is used to displays rows of data.

# When To Use

- To display a collection of structured data.
- To sort, search, paginate, filter data.

## Demos

```demo
basic
customStyle
select
filterAndSorter
asyncFilterItems
filterMultiple
ajaxUsage
fixedHeader
fixedHeaderColumn
ellipsis
renderHeader
bestPractices
```

## Column

| Property         | Description                                                                                               | Type                          | Default |
| :--------------- | :-------------------------------------------------------------------------------------------------------- | :---------------------------- | :------ |
| align            | specify which way that column is aligned                                                                  | 'left' \| 'right' \| 'center' | 'left'  |
| ellipsis         | ellipsize cell content,recommended when no property:render is used                                        | boolean                       | false   |
| className        | className of this column                                                                                  | boolean                       | false   |
| title            | Title of this column                                                                                      | String                        | -       |
| key              | Unique key of this column,**required**                                                                    | string                        | -       |
| render           | Renderer of the table cell. The return value should be a VueNode                                          | Function(h, record, index) {} | -       |
| sortable         | use column sort, need property:sorter                                                                     | boolean                       | false   |
| sorter           | Sort function for local sort, see Array.sort's compareFunction.If you need network sorter,set to `custom` | Function \| 'custom'          | -       |
| defaultSortOrder | default sort order                                                                                        | 'ascend' \| 'descend'         | -       |
| filterable       | use filter                                                                                                | boolean                       | false   |
| filter           | Filter function for local filter.If you need network sorter,set to `custom`                               | Function \| 'custom'          | -       |
| filterMultiple   | Whether multiple filters can be selected                                                                  | boolean                       | false   |
| defaultFilter    | default filter selected                                                                                   | String                        | -       |
| filterItems      | Filter menu config,format as [{label,value}]                                                              | object[]                      | -       |
| asyncFilterItems | async filter menu config ,Function returns [{label,value}]                                                | Function                      | -       |

# DataTable

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
asyncFilterOptions
filterMultiple
ajaxUsage
fixedHeader
fixedHeaderColumn
ellipsis
renderHeader
bestPractices
```

## Props

| Property       | Description                                                                                                                                             | Type             | Default |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------- | :------ |
| data           | Structured data displayed.                                                                                                                              | Array            | -       |
| columns        | Column configuration. Details are mentioned below.                                                                                                      | Array            | -       |
| max-height     | The max-height of the table. Unit: px / When this prop is set, if the content height is larger then the set value, the header will be fixed at the top. | Number \| String | -       |
| row-class-name | Callback function for row's class name. Accept two arguments: -params: current row's data. -index: current row's index                                  | Function         | -       |
| loading        | Whether the table is loading.                                                                                                                           | Boolean          | false   |
| scroll-x       | Set horizontal scrolling, can also be used to specify the width and height of the scroll area                                                           | number           | -       |
| pagination     | Config of pagination.                                                                                                                                   | object           | -       |


## Columns

| Property         | Description                                                                                               | Type                          | Default |
| :--------------- | :-------------------------------------------------------------------------------------------------------- | :---------------------------- | :------ |
| align            | specify which way that column is aligned                                                                  | 'left' \| 'right' \| 'center' | 'left'  |
| ellipsis         | ellipsize cell content,recommended when no property:render is used                                        | boolean                       | false   |
| className        | className of this column                                                                                  | boolean                       | false   |
| title            | Title of this column                                                                                      | String                        | -       |
| key              | Unique key of this column,**required**                                                                    | string                        | -       |
| render           | Renderer of the table cell. The return value should be a VueNode                                          | Function(h, record, index) {} | -       |
| renderHeader     | Renderer of the table header cell. The return value should be a VueNode                                   | Function(h, column) {}        | -       |
| sortable         | use column sort, need property:sorter                                                                     | boolean                       | false   |
| sorter           | Sort function for local sort, see Array.sort's compareFunction.If you need network sorter,set to `custom` | Function \| 'custom'          | -       |
| defaultSortOrder | default sort order                                                                                        | 'ascend' \| 'descend'         | -       |
| filterable       | use filter                                                                                                | boolean                       | false   |
| filter           | Filter function for local filter.If you need network sorter,set to `custom`                               | Function \| 'custom'          | -       |
| filterMultiple   | Whether multiple filters can be selected                                                                  | boolean                       | false   |
| defaultFilter    | default filter selected                                                                                   | String                        | -       |
| filterOptions      | Filter menu config,format as [{label,value}]                                                              | object[]                      | -       |
| asyncFilterOptions | async filter menu config ,Function returns [{label,value}]                                                | Function                      | -       |
| fixed            | Set column to be fixed: 'left' 'right'                                                                    | 'left'\| 'right'              | -       |
| width            | Width of this column                                                                                      | string                        | number  | - |


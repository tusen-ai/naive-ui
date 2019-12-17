# Property

| Property       | Description                                                                                                                                             | Type             | Default |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------- | :------ |
| data           | Structured data displayed.                                                                                                                              | Array            | -       |
| columns        | Column configuration. Details are mentioned below.                                                                                                      | Array            | -       |
| max-height     | The max-height of the table. Unit: px / When this prop is set, if the content height is larger then the set value, the header will be fixed at the top. | Number \| String | -       |
| row-class-name | Callback function for row's class name. Accept two arguments: -params: current row's data. -index: current row's index                                  | Function         | -       |
| loading        | Whether the table is loading.                                                                                                                           | Boolean          | false   |
| scroll-x       | Set horizontal scrolling, can also be used to specify the width and height of the scroll area                                                           | number           | -       |
| pagination     | Config of pagination.                                                                                                                                   | object           | -       |

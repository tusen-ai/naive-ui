# Tree Data

Set `children` in row data to show tree data. If you want to use other key to get children, you can set another `children-key`.

```html
<n-data-table :columns="columns" :data="data" :row-key="rowKey" />
```

```js
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      rowKey: (row) => row.index,
      columns: [
        {
          type: 'selection'
        },
        {
          title: 'name',
          key: 'name'
        },
        {
          title: 'index',
          key: 'index'
        }
      ],
      data: [
        {
          name: '07akioni',
          index: '07',
          children: [
            {
              name: '08akioni',
              index: '08',
              children: [
                {
                  name: '09akioni',
                  index: '09'
                },
                {
                  name: '10akioni',
                  index: '10'
                }
              ]
            }
          ]
        },
        {
          name: '11akioni',
          index: '11'
        }
      ]
    }
  }
})
```

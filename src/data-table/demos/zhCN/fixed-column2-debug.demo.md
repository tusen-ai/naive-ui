# Fixed Column Debug2

```html
<n-data-table
  :columns="columns"
  :data="data"
  :pagination="pagination"
  :scroll-x="2000"
/>
```

```js
import { defineComponent } from 'vue'

const createColumns = () => {
  return [
    {
      title: '1',
      key: '1',
      fixed: 'left',
      align: 'center',
      children: [
        {
          title: '2',
          key: '2',
          fixed: 'left',
          align: 'center',
          children: [
            {
              title: '4',
              key: '4',
              fixed: 'left',
              width: 100,
              align: 'center'
            },
            {
              title: '5',
              key: '5',
              fixed: 'left',
              width: 100,
              align: 'center'
            }
          ]
        },
        {
          title: '3',
          key: '3',
          fixed: 'left',
          width: 100,
          align: 'center',
          children: [
            {
              title: '6',
              key: '6',
              fixed: 'left',
              width: 100,
              align: 'center'
            },
            {
              title: '7',
              key: '7',
              fixed: 'left',
              width: 100,
              align: 'center'
            }
          ]
        }
      ]
    },
    { title: 'Test1', key: 'test1' },
    { title: 'Test2', key: 'test2' },
    { title: 'Test3', key: 'test3' },
    {
      title: 'Group A',
      key: 'ga',
      fixed: 'right',
      align: 'center',
      children: [
        {
          title: 'A1',
          key: 'a1',
          width: 100,
          fixed: 'right',
          align: 'center'
        },
        {
          title: 'A2',
          key: 'a2',
          width: 100,
          fixed: 'right',
          align: 'center'
        }
      ]
    },
    {
      title: 'Group B',
      key: 'gb',
      fixed: 'right',
      align: 'center',
      children: [
        {
          title: 'B1',
          key: 'b1',
          width: 100,
          fixed: 'right',
          align: 'center'
        },
        {
          title: 'B2',
          key: 'b2',
          width: 100,
          fixed: 'right',

          align: 'center'
        }
      ]
    }
  ]
}

const createData = () => [
  {
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    test1: 'test1',
    test2: 'test2',
    test3: 'test3',
    a1: 'a1',
    a2: 'a2',
    b1: 'b1',
    b2: 'b2'
  }
]

export default defineComponent({
  setup () {
    return {
      data: createData(),
      columns: createColumns(),
      pagination: { pageSize: 10 }
    }
  }
})
```

# Scroll Debug

```html
Flex Height, Auto Layout Overflow, No Max Height
<n-data-table
  :columns="columns"
  :data="data"
  style="height: 180px;"
  flex-height
/>

Auto Layout Overflow, No Max Height
<n-data-table :columns="columns" :data="data" />

Auto Layout Overflow, Max Height
<n-data-table :columns="columns" :data="data" :max-height="60" />

Fixed Layout Overflow, No Max Height
<n-data-table :columns="columns" :data="data" table-layout="fixed" />

Fixed Layout Overflow, Max Height
<n-data-table
  :columns="columns"
  :data="data"
  table-layout="fixed"
  :max-height="60"
/>

Auto Layout No Overflow, No Max Height
<n-data-table :columns="columns" :data="data1" />

Auto Layout No Overflow, Max Height
<n-data-table :columns="columns" :data="data1" :max-height="60" />

Fixed Layout No Overflow, No Max Height
<n-data-table :columns="columns" :data="data1" table-layout="fixed" />

Fixed Layout No Overflow, Max Height
<n-data-table
  :columns="columns"
  :data="data1"
  table-layout="fixed"
  :max-height="60"
/>

Auto Layout No Overflow, No Max Height, Small Scroll X
<n-data-table :columns="columns" :data="data1" :scroll-x="300" />

Auto Layout No Overflow, Max Height
<n-data-table
  :columns="columns"
  :data="data1"
  :max-height="60"
  :scroll-x="300"
/>

Fixed Layout No Overflow, No Max Height
<n-data-table
  :columns="columns"
  :data="data1"
  table-layout="fixed"
  :scroll-x="300"
/>

Fixed Layout No Overflow, Max Height
<n-data-table
  :columns="columns"
  :data="data1"
  table-layout="fixed"
  :max-height="60"
  :scroll-x="300"
/>
```

```js
import { defineComponent, h } from 'vue'

const label0 =
  'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy'

const label =
  'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

export default defineComponent({
  setup () {
    return {
      columns: [
        {
          key: '1',
          title: '1',
          render (rowData) {
            return h('div', { style: 'white-space: nowrap;' }, rowData['1'])
          }
        },
        {
          key: '2',
          title: '2',
          render (rowData) {
            return h('div', { style: 'white-space: nowrap;' }, rowData['2'])
          }
        }
      ],
      data: [
        {
          1: label0,
          2: label
        },
        {
          1: label0,
          2: label
        },
        {
          1: label0,
          2: label
        },
        {
          1: label0,
          2: label
        }
      ],
      data1: [
        {
          1: 'x',
          2: 'x'
        },
        {
          1: 'x',
          2: 'x'
        },
        {
          1: 'x',
          2: 'x'
        },
        {
          1: 'x',
          2: 'x'
        }
      ]
    }
  }
})
```

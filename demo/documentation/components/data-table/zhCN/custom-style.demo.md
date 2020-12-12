# 自定义样式

行：设定 `row-class-name` 为某些行设定 class。

列：在列对象上设定 `className` 属性为确定的列设定 class。

```html
<n-data-table
  ref="table"
  :columns="columns"
  :data="data"
  :row-class-name="rowClassName"
/>
```

```js
const data = [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park'
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
]

export default {
  data() {
    return {
      data: data,
      columns: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age',
          className: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ]
    }
  },
  methods: {
    rowClassName(row, index) {
      if (row.age > 32) {
        return 'too-old'
      }
      return null
    }
  }
}
```

```css
::v-deep(.too-old td) {
  color: rgba(255, 0, 0, 0.75) !important;
}
::v-deep(.age) {
  color: rgba(0, 128, 0, 0.75) !important;
}
::v-deep(.too-old .age) {
  color: rgba(0, 0, 128, 0.75) !important;
}
```

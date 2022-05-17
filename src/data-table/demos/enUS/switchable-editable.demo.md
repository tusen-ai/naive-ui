# Switchable Editable Table

Not too simple, but good-looking.

```html
<n-data-table
  :key="(row) => row.key"
  :columns="columns"
  :data="data"
  :pagination="pagination"
/>
<pre>{{ JSON.stringify(data, null, 2) }}</pre>
```

```js
import { h, defineComponent, ref, nextTick } from 'vue'
import { NInput } from 'naive-ui'

const createData = () => [
  {
    key: 0,
    name: 'John Brown',
    age: '32',
    address: 'New York No. 1 Lake Park'
  },
  {
    key: 1,
    name: 'Jim Green',
    age: '42',
    address: 'London No. 1 Lake Park'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: '32',
    address: 'Sidney No. 1 Lake Park'
  }
]

const ShowOrEdit = defineComponent({
  props: {
    value: [String, Number],
    onUpdateValue: [Function, Array]
  },
  setup (props) {
    const isEdit = ref(false)
    const inputRef = ref(null)
    const inputValue = ref(props.value)
    function handleOnClick () {
      isEdit.value = true
      nextTick(() => {
        inputRef.value.focus()
      })
    }
    function handleChange () {
      props.onUpdateValue(inputValue.value)
      isEdit.value = false
    }
    return () =>
      h(
        'div',
        {
          onClick: handleOnClick
        },
        isEdit.value
          ? h(NInput, {
            ref: inputRef,
            value: inputValue.value,
            onUpdateValue: (v) => {
              inputValue.value = v
            },
            onChange: handleChange,
            onBlur: handleChange
          })
          : props.value
      )
  }
})

export default defineComponent({
  setup () {
    const data = ref(createData())
    return {
      data,
      columns: [
        {
          title: 'Name',
          key: 'name',
          width: 150,
          render (row, index) {
            return h(ShowOrEdit, {
              value: row.name,
              onUpdateValue (v) {
                data.value[index].name = v
              }
            })
          }
        },
        {
          title: 'Age',
          key: 'age',
          width: 100,
          render (row, index) {
            return h(ShowOrEdit, {
              value: row.age,
              onUpdateValue (v) {
                data.value[index].age = v
              }
            })
          }
        },
        {
          title: 'Address',
          key: 'address',
          render (row, index) {
            return h(ShowOrEdit, {
              value: row.address,
              onUpdateValue (v) {
                data.value[index].address = v
              }
            })
          }
        }
      ],
      pagination: {
        pageSize: 10
      }
    }
  }
})
```

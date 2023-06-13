# Switchable Editable Table

Not too simple, but good-looking.

```html
<n-data-table
  :key="(row) => row.key"
  :columns="columns"
  :data="data"
  :pagination="paginationRef"
  :on-update:page="handlePageChange"
/>
```

```js
import { h, defineComponent, ref, nextTick, computed } from 'vue'
import { NInput } from 'naive-ui'

const createData = () =>
  Array.from({ length: 100 }).map((_, index) => ({
    key: index,
    name: `John Brown ${index}`,
    age: (Math.random() * 40) | 0,
    address: `New York No. ${index} Lake Park`
  }))

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
          style: 'min-height: 22px',
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

    const getDataIndex = (key) => {
      return data.value.findIndex((item) => item.key === key)
    }
    const page = ref(1)

    const handlePageChange = (curPage) => {
      page.value = curPage
    }

    const paginationRef = computed(() => ({
      pageSize: 10,
      page: page.value
    }))

    return {
      data,
      paginationRef,
      handlePageChange,
      columns: [
        {
          title: 'Name',
          key: 'name',
          width: 150,
          render (row) {
            const index = getDataIndex(row.key)
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
          render (row) {
            const index = getDataIndex(row.key)
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
          render (row) {
            const index = getDataIndex(row.key)
            return h(ShowOrEdit, {
              value: row.address,
              onUpdateValue (v) {
                data.value[index].address = v
              }
            })
          }
        }
      ]
    }
  }
})
```

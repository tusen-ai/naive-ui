<markdown>
  # Switchable Editable Table
  </markdown>

<script lang="ts" setup>
import type { InputInst } from 'naive-ui'
import type { PropType } from 'vue'
import { NInput } from 'naive-ui'
import { computed, defineComponent, h, nextTick, ref } from 'vue'

interface RowData {
  key: number
  name: string
  age: number
  address: string
}

interface OnUpdateValue {
  (value: string): void
}

function createData(): RowData[] {
  return Array.from({ length: 100 }).map((_, index) => ({
    key: index,
    name: `John Brown ${index}`,
    age: (Math.random() * 40) | 0,
    address: `New York No. ${index} Lake Park`
  }))
}

const ShowOrEdit = defineComponent({
  props: {
    value: [String, Number],
    onUpdateValue: [Function, Array] as PropType<OnUpdateValue>
  },
  setup(props) {
    const isEdit = ref(false)
    const inputRef = ref<InputInst | null>(null)
    const inputValue = ref(props.value)
    function handleOnClick() {
      isEdit.value = true
      nextTick(() => {
        inputRef.value?.focus()
      })
    }
    function handleChange() {
      props.onUpdateValue?.(String(inputValue.value))
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
              value: String(inputValue.value),
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

const data = ref(createData())
const page = ref(1)

function getDataIndex(key: number) {
  return data.value.findIndex(item => item.key === key)
}
function handlePageChange(curPage: number) {
  page.value = curPage
}

const paginationRef = computed(() => ({
  pageSize: 10,
  page: page.value
}))

const columns = [
  {
    title: 'Name',
    key: 'name',
    width: 150,
    render(row: RowData) {
      const index = getDataIndex(row.key)
      return h(ShowOrEdit, {
        value: row.name,
        onUpdateValue(v: string) {
          data.value[index].name = v
        }
      })
    }
  },
  {
    title: 'Age',
    key: 'age',
    width: 100,
    render(row: RowData) {
      const index = getDataIndex(row.key)
      return h(ShowOrEdit, {
        value: row.age,
        onUpdateValue(v: string) {
          data.value[index].age = Number(v)
        }
      })
    }
  },
  {
    title: 'Address',
    key: 'address',
    render(row: RowData) {
      const index = getDataIndex(row.key)
      return h(ShowOrEdit, {
        value: row.address,
        onUpdateValue(v: string) {
          data.value[index].address = v
        }
      })
    }
  }
]
</script>

<template>
  <n-data-table
    :key="(row: RowData) => row.key"
    :columns="columns"
    :data="data"
    :pagination="paginationRef"
    :on-update:page="handlePageChange"
  />
</template>

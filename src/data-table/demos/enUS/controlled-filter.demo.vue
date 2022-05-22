<markdown>
# Controlled filter
</markdown>

<template>
  <n-space vertical :size="12">
    <n-space>
      <n-button @click="filterAddress">
        Filter Address(Use Value 'London')
      </n-button>
      <n-button @click="unfilterAddress">
        Clear Address Filters
      </n-button>
    </n-space>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      @update:filters="handleUpdateFilter"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import {
  DataTableColumns,
  DataTableBaseColumn,
  DataTableFilterState
} from 'naive-ui'

type Row = {
  key: number
  name: string
  age: number
  address: string
}

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
  },
  {
    key: 3,
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park'
  }
]

export default defineComponent({
  setup () {
    const addressColumn = reactive<DataTableBaseColumn<Row>>({
      title: 'Address',
      key: 'address',
      filterMultiple: false,
      filterOptionValue: null,
      sorter: 'default',
      filterOptions: [
        {
          label: 'London',
          value: 'London'
        },
        {
          label: 'New York',
          value: 'New York'
        }
      ],
      filter (value, row) {
        return !!~row.address.indexOf(value.toString())
      }
    })

    const columns = reactive<DataTableColumns<Row>>([
      {
        title: 'Name',
        key: 'name',
        sorter (rowA, rowB) {
          return rowA.name.length - rowB.name.length
        }
      },
      {
        title: 'Age',
        key: 'age',
        sorter (rowA, rowB) {
          return rowA.age - rowB.age
        }
      },
      addressColumn
    ])
    return {
      data,
      columns,
      pagination: { pageSize: 5 },
      filterAddress () {
        addressColumn.filterOptionValue = 'London'
      },
      unfilterAddress () {
        addressColumn.filterOptionValue = null
      },
      handleUpdateFilter (
        filters: DataTableFilterState,
        sourceColumn: DataTableBaseColumn
      ) {
        addressColumn.filterOptionValue = filters[sourceColumn.key] as string
      }
    }
  }
})
</script>

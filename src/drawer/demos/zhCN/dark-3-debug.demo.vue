<markdown>
# Dark Debug 3
</markdown>

<template>
  <n-button @click="modalActive = !modalActive">
    Toggle
  </n-button>
  <n-drawer v-model:show="modalActive" width="800">
    <n-data-table
      ref="table"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :max-height="250"
      :scroll-x="1800"
    />
  </n-drawer>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import type { DataTableColumns } from 'naive-ui'

const columns: DataTableColumns = [
  {
    title: 'Name',
    key: 'name',
    width: 200,
    fixed: 'left',
    filter: 'default',
    filterOptions: [
      {
        label: 'Edward King 0',
        value: 'Edward King 0'
      },
      {
        label: 'Edward King 1',
        value: 'Edward King 1'
      },
      {
        label: 'Edward King 2',
        value: 'Edward King 2'
      },
      {
        label: 'Edward King 3',
        value: 'Edward King 3'
      }
    ]
  },
  {
    title: 'Age',
    key: 'age',
    width: 100
  },
  {
    title: 'Row',
    key: 'row',
    render (row, index) {
      return h('span', ['row ', index])
    }
  },
  {
    title: 'Row1',
    key: 'row1',
    render (row, index) {
      return h('span', ['row ', index])
    }
  },
  {
    title: 'Row2',
    key: 'row2',
    render (row, index) {
      return h('span', ['row ', index])
    }
  },
  {
    title: 'Address',
    key: 'address',
    width: 200,
    fixed: 'right'
  }
]

const data = Array.from({ length: 46 }).map((_, index) => ({
  key: index,
  name: `Edward King ${index % 4}`,
  age: 32 + (index % 3),
  address: `London, Park Lane no. ${index}`
}))

export default defineComponent({
  data () {
    return {
      modalActive: false,
      data,
      columns
    }
  },
  computed: {
    pagination () {
      return { pageSize: 10 }
    }
  }
})
</script>

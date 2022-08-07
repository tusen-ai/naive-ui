<markdown>
# Custom selection menu

Set `options` on a selection type column to create selection dropdown near header checkbox.
</markdown>

<template>
  <n-p>
    You have selected {{ checkedRowKeys.length }} row{{
      checkedRowKeys.length < 2 ? '' : 's'
    }}.
  </n-p>
  <n-data-table
    v-model:checked-row-keys="checkedRowKeys"
    :columns="columns"
    :data="data"
    :pagination="pagination"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { repeat } from 'seemly'
import { DataTableColumns } from 'naive-ui'

type RowData = {
  name: string
  age: number
  address: string
  key: number
}

const data = repeat(46, undefined).map<RowData>((_, index) => ({
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`,
  key: index
}))

export default defineComponent({
  setup () {
    const checkedRowKeysRef = ref<Array<string | number>>([])
    const columns: DataTableColumns<RowData> = [
      {
        type: 'selection',
        options: [
          'all',
          'none',
          {
            label: 'Select first 2 rows',
            key: 'f2',
            onSelect: (pageData) => {
              checkedRowKeysRef.value = pageData
                .map((row) => row.key)
                .slice(0, 2)
            }
          }
        ],
        disabled (row) {
          return row.name === 'Edward King 3'
        }
      },
      {
        title: 'Name',
        key: 'name'
      },
      {
        title: 'Age',
        key: 'age'
      },
      {
        title: 'Address',
        key: 'address'
      }
    ]
    return {
      checkedRowKeys: checkedRowKeysRef,
      data,
      pagination: {
        pageSize: 6
      },
      columns
    }
  }
})
</script>

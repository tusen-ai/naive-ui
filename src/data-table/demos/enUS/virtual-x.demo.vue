<markdown>
# Large data (rows & cols)

If you have a large amount of row and column data, such as thousands of rows and hundreds of columns, `naive-ui` provides horizontal + vertical virtual scrolling functionality.

Due to the inherent complexity of horizontal virtual scrolling, the corresponding configuration can be quite complex, with most of the following content being necessary:

1. Configure `virtual-scroll` to enable vertical virtual scrolling.
2. Configure `virtual-scroll-x` to enable horizontal virtual scrolling:
    - Each column needs to have a `width` property configured.
    - Configure the `scroll-x` property, setting it to the total width of all columns.
    - Configure the `min-row-height` property, setting it to the minimum height of each row, where all rows must be larger than this value.
    - Configure the `height-for-row` property, which is used to set the height of each row (since only a portion of the cells in each row are always visible, this cannot be automatically calculated). If not configured, the height of each row will be set to `min-row-height`.
3. If needed, configure `virtual-scroll-header`. By default, the header will still be fully rendered to maintain compatibility. You can enable virtual rendering for the header with this configuration:
    - Configure the `header-height` property, setting it to the height of the header.

The example below corresponds to a table with 1000 rows * 1000 columns.

`naive-ui`'s table can easily support table data in the millions. You won't find this kind of functionality in many free component libraries.
</markdown>

<script lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { defineComponent } from 'vue'

interface RowData {
  key: number
  name: string
  age: number
  address: string
}

const columns: DataTableColumns<RowData> = []

let scrollX = 0

for (let i = 0; i < 1000; ++i) {
  scrollX += 100
  columns.push({
    title: `Col ${i}`,
    width: 100,
    key: i,
    fixed: i <= 1 ? 'left' : i > 997 ? 'right' : undefined,
    render(_, rowIndex) {
      return `${i}-${rowIndex}`
    }
  })
}

export default defineComponent({
  setup() {
    const data: RowData[] = Array.from({ length: 1000 }).map((_, index) => ({
      key: index,
      name: `Edward King ${index}`,
      age: 32,
      address: `London, Park Lane no. ${index}`
    }))
    return {
      data,
      columns,
      scrollX,
      minRowHeight: 48,
      heightForRow: () => 48
    }
  }
})
</script>

<template>
  <n-data-table
    :columns="columns"
    :data="data"
    :max-height="250"
    virtual-scroll
    virtual-scroll-x
    :scroll-x="scrollX"
    :min-row-height="48"
    :height-for-row="heightForRow"
    virtual-scroll-header
    :header-height="48"
  />
</template>

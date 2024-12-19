<markdown>
# 大量数据（行和列）

如果你有大量行数据和列数据，例如几千行 + 几百列，`naive-ui` 提供了横向 + 纵向虚拟滚动的功能。

因为横向虚拟滚动的天然的复杂性，对应的配置也会较为复杂，以下多数内容都是必须的：

1. 配置 `virtual-scroll` 打开纵向虚拟滚动
2. 配置 `virtual-scroll-x` 打开横向虚拟滚动
    - 每一个列都需要配置 `width` 属性
    - 配置 `scroll-x` 属性，设为所有列的总宽度
    - 配置 `min-row-height` 属性，设为每一行的最小高度，所有的行高度必须比这个值更大
    - 配置 `height-for-row` 属性，用于配置每一行的高度（因为每一行永远只有一部分格子是可见的，因此无法自动求出），如果不配置，每一行的高度会被设为 `min-row-height`
3. 如有需要，配置 `virtual-scroll-header`，默认情况下，表头依然会全量渲染以保持兼容性，你可以通过此配置来打开表头的虚拟渲染
    - 配置 `header-height` 属性，设为表头的高度

下面的例子对应了一个 1000 行 * 1000 列的表格。

`naive-ui` 的表格可以轻松的支持千万级的表格数据，你在不收钱的组件库不容易找得到这样的功能。
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

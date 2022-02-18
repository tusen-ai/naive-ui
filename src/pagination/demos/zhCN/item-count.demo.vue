<markdown>
# 使用元素个数控制分页

有的时候你不想传递 `page-count`，这个时候你可以设定 `item-count` 和 `page-size`。
</markdown>

<template>
  <n-pagination
    :item-count="201"
    :page-sizes="[10, 20, 30, 40]"
    show-size-picker
  />
</template>

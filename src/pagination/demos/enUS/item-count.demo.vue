<markdown>
# Use item count

Sometime you don't want set `page-count`. At that time you may use `item-count` and `page-size`.
</markdown>

<template>
  <n-pagination
    :item-count="201"
    :page-sizes="[10, 20, 30, 40]"
    show-size-picker
  />
</template>

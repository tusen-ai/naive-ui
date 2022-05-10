<markdown>
# Prefix & suffix

You may want to add something before and after.
</markdown>

<template>
  <n-pagination :item-count="101">
    <template #prefix="{ itemCount, startIndex }">
      From Item No.{{ startIndex }}, Total is {{ itemCount }}
    </template>
    <template #suffix="{ endIndex }">
      To Item No.{{ endIndex }}
    </template>
  </n-pagination>
</template>

<markdown>
# Span

You can set span for each item.
</markdown>

<template>
  <n-descriptions label-placement="top" bordered :column="6">
    <n-descriptions-item>
      <template #label>
        Breakfast
      </template>
      Apple
    </n-descriptions-item>
    <n-descriptions-item label="Brunch">
      Apple
    </n-descriptions-item>
    <n-descriptions-item label="Lunch">
      Apple
    </n-descriptions-item>
    <n-descriptions-item label="Supper">
      Apple
    </n-descriptions-item>
    <n-descriptions-item label="Dinner">
      Apple
    </n-descriptions-item>
    <n-descriptions-item label="Midnight Snack">
      Apple
    </n-descriptions-item>
    <n-descriptions-item label="Apple">
      Apple
    </n-descriptions-item>
    <n-descriptions-item label="Apple" :span="2">
      Apple
    </n-descriptions-item>
    <n-descriptions-item label="Apple" :span="3">
      Apple
    </n-descriptions-item>
  </n-descriptions>
</template>

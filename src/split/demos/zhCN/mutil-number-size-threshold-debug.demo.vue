<markdown>
# 多个 number 类型 size threshold 调试
</markdown>

<template>
  <n-split
    direction="horizontal"
    style="height: 200px"
    :size="[0.3, 0.2, 0.5]"
    :min="[0.1, 0.2, 0.3]"
    :max="[0.4, 0.5, 0.9]"
  >
    <template #1>
      Pane 1
    </template>
    <template #2>
      Pane 2
    </template>
    <template #3>
      Pane 3
    </template>
  </n-split>
</template>

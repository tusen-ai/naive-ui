<markdown>
# 多个 px 类型 size threshold 调试
</markdown>

<template>
  <n-split
    direction="horizontal"
    style="height: 200px"
    :size="['200px', '200px', '200px']"
    :min="['100px', '100px', '100px']"
    :max="['400px', '400px', '400px']"
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

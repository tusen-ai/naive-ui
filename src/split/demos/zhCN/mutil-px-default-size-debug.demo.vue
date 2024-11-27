<markdown>
# 多个 px 类型 default-size 调试
</markdown>

<template>
  <n-split
    direction="horizontal"
    style="height: 200px"
    :default-size="['200px', '200px', '200px']"
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

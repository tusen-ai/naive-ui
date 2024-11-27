<markdown>
# 单 number 类型 default-size threshold 调试
</markdown>

<template>
  <n-split
    direction="horizontal"
    style="height: 200px"
    :default-size="0.7"
    :min="0.1"
    :max="0.9"
  >
    <template #1>
      Pane 1
    </template>
    <template #2>
      Pane 2
    </template>
  </n-split>
</template>

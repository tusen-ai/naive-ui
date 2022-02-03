<markdown>
# 前缀 & 后缀

使用 `prefix`、`suffix` slot 来添加前后缀。
</markdown>

<template>
  <n-tabs default-value="oasis">
    <template #prefix>
      Prefix
    </template>
    <n-tab-pane name="oasis" tab="Oasis">
      Wonderwall
    </n-tab-pane>
    <n-tab-pane name="the beatles" tab="the Beatles">
      Hey Jude
    </n-tab-pane>
    <n-tab-pane name="jay chou" tab="周杰伦">
      七里香
    </n-tab-pane>
    <template #suffix>
      Suffix
    </template>
  </n-tabs>
</template>

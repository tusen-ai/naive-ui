<markdown>
# 避免 SSR Layout Shift

默认情况下，`n-grid` 会基于窗口宽度和容器宽度计算栅格内容，这会有两个副作用：在进行 SSR 的时候可能会出现内容闪烁；渲染时会出现 Layout Shift，这会略微影响渲染性能。

但是如果你不需要响应式功能，你可以通过 `layout-shift-disabled` 规避删格的副作用。

需要注意的是，打开这个选项会禁用 `n-grid` 的一切响应式功能和 `n-grid-item` 的 `suffix`、`offset`。
</markdown>

<template>
  <n-grid :x-gap="12" :y-gap="12" :cols="4" layout-shift-disabled>
    <n-gi>
      <div class="light-green" />
    </n-gi>
    <n-gi :span="2">
      <div class="green" />
    </n-gi>
    <n-gi>
      <div class="light-green" />
    </n-gi>
    <n-gi>
      <div class="green" />
    </n-gi>
  </n-grid>
</template>

<style>
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
}
</style>

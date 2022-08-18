<markdown>
# Avoid SSR layout shift

By default, `n-grid` will compute grid content based on window size and container size. This would cause 2 side effects: Content may shift in SSR mode; Render items has layout shift and it would influence performance slightly.

If you don't need any responsive functionality, you can use `layout-shift-disabled` to get rid of side effects of it.

Please note that set `layout-shift-disabled` will disabled all responsive functionality of `n-grid` and `suffix`, `offset` of `n-grid-item`.
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

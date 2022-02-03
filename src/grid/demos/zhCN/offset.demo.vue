<markdown>
# 偏移
</markdown>

<template>
  <n-grid :x-gap="12" :cols="4">
    <n-grid-item :offset="1">
      <div class="light-green" />
    </n-grid-item>
    <n-grid-item :offset="1">
      <div class="green" />
    </n-grid-item>
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

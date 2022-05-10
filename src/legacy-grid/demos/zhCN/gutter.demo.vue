<markdown>
# 间隔

设定水平、垂直间隔。
</markdown>

<template>
  <n-row :gutter="[12, 8]">
    <n-col :span="6">
      <div class="light-green" />
    </n-col>
    <n-col :span="6">
      <div class="green" />
    </n-col>
    <n-col :span="6">
      <div class="light-green" />
    </n-col>
    <n-col :span="6">
      <div class="green" />
    </n-col>
    <n-col :span="6">
      <div class="light-green" />
    </n-col>
    <n-col :span="6">
      <div class="green" />
    </n-col>
    <n-col :span="6">
      <div class="light-green" />
    </n-col>
    <n-col :span="6">
      <div class="green" />
    </n-col>
  </n-row>
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

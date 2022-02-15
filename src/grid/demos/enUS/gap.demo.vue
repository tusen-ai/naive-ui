<markdown>
# Gap

Set x gap & y gap.
</markdown>

<template>
  <n-grid :x-gap="12" :y-gap="8" :cols="4">
    <n-grid-item>
      <div class="light-green" />
    </n-grid-item>
    <n-grid-item>
      <div class="green" />
    </n-grid-item>
    <n-grid-item>
      <div class="light-green" />
    </n-grid-item>
    <n-grid-item>
      <div class="green" />
    </n-grid-item>
    <n-grid-item>
      <div class="light-green" />
    </n-grid-item>
    <n-grid-item>
      <div class="green" />
    </n-grid-item>
    <n-grid-item>
      <div class="light-green" />
    </n-grid-item>
    <n-grid-item>
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

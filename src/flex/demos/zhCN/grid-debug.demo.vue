<markdown>
# Grid Debug
</markdown>

<template>
  <n-flex vertical>
    <div class="grid-list">
      <div class="item" />
      <div class="item" />
      <div class="item" />
    </div>
    <div class="grid-list">
      <div class="item" />
      <div class="item" />
      <div class="item" />
    </div>
  </n-flex>
</template>

<style>
.grid-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  gap: 20px;
}
.item {
  background-color: tomato;
  height: 100px;
}
</style>

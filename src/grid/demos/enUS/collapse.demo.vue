<markdown>
# Collapse

Collapsing works in responsive layout.
</markdown>

<template>
  <n-grid :cols="2">
    <n-form-item-gi label="Item Count">
      <n-input-number v-model:value="gridItemCount" :min="1" />
    </n-form-item-gi>
    <n-form-item-gi label="Max Rows After Collapsed">
      <n-input-number v-model:value="gridCollapsedRows" :min="1" />
    </n-form-item-gi>
    <n-form-item-gi label="Show Suffix Node">
      <n-switch v-model:value="showSuffix" />
    </n-form-item-gi>
    <n-form-item-gi label="Grid Collapsed">
      <n-switch v-model:value="gridCollapsed" />
    </n-form-item-gi>
  </n-grid>
  <n-grid
    :cols="5"
    :collapsed="gridCollapsed"
    :collapsed-rows="gridCollapsedRows"
  >
    <n-gi
      v-for="i in gridItemCount"
      :key="i"
      :class="i % 2 ? 'green' : 'light-green'"
    >
      {{ i }}
    </n-gi>
    <n-gi v-if="showSuffix" suffix class="suffix" #="{ overflow }">
      {{ overflow ? 'Node Overflows Exists' : 'No Node Overflows' }}
    </n-gi>
  </n-grid>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      gridCollapsed: ref(false),
      gridCollapsedRows: ref(1),
      gridItemCount: ref(4),
      showSuffix: ref(true)
    }
  }
})
</script>

<style>
.suffix {
  height: 108px;
  border: 1px solid rgba(0, 128, 0, 0.36);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

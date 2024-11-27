<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SplitMultiPanel'
})
</script>

<template>
  <n-split style="height: 200px" :default-size="[0.2, 0.4, 0.4]">
    <template #1>
      <div class="split-panel">
        Panel 1
      </div>
    </template>
    <template #2>
      <div class="split-panel">
        Panel 2
      </div>
    </template>
    <template #3>
      <div class="split-panel">
        Panel 3
      </div>
    </template>
  </n-split>
</template>

<style scoped>
.split-panel {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(128, 128, 128, 0.3);
}
</style>

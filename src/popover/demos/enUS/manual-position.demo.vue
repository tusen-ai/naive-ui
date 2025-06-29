<markdown>
# Manually positioned

Warn: when manually positioned, the `trigger` prop must be `'manual'`.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const x = ref(0)
const y = ref(0)
const showPopover = ref(false)

function handleClick(e: MouseEvent) {
  if (showPopover.value) {
    showPopover.value = false
  }
  else {
    showPopover.value = true
    x.value = e.clientX
    y.value = e.clientY
  }
}
</script>

<template>
  <div
    style="width: 200px; height: 200px; background-color: rgba(0, 128, 0, 0.5)"
    @click="handleClick"
  />
  <n-popover :show="showPopover" :x="x" :y="y" trigger="manual">
    Cool!
  </n-popover>
</template>

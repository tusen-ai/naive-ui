<markdown>
# Zindex debug
</markdown>

<template>
  <n-space>
    <n-popover trigger="click" :z-index="3000">
      <template #trigger>
        <n-button>Hover</n-button>
      </template>
      <span>I wish they all could be California girls</span>
      <n-popover trigger="click" :z-index="3000">
        <template #trigger>
          <n-button>Click</n-button>
        </template>
        <span>I wish they all could be California girls</span>
      </n-popover>
    </n-popover>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      showPopover: ref(false)
    }
  }
})
</script>

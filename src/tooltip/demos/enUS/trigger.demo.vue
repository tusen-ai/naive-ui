<markdown>
# Trigger
</markdown>

<template>
  <n-space>
    <n-tooltip placement="bottom" trigger="hover">
      <template #trigger>
        <n-button> Hover </n-button>
      </template>
      <span> I wish they all could be California girls </span>
    </n-tooltip>
    <n-tooltip placement="bottom" trigger="click">
      <template #trigger>
        <n-button> Click </n-button>
      </template>
      <span> I wish they all could be California girls </span>
    </n-tooltip>
    <n-tooltip :show="showPopover" placement="bottom">
      <template #trigger>
        <n-button @click="showPopover = !showPopover">
          Manual
        </n-button>
      </template>
      <span> I wish they all could be California girls </span>
    </n-tooltip>
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

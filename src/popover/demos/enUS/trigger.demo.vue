<markdown>
# Trigger
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const showPopover = ref(false)
</script>

<template>
  <n-space>
    <n-popover trigger="hover">
      <template #trigger>
        <n-button>Hover</n-button>
      </template>
      <span>I wish they all could be California girls</span>
    </n-popover>
    <n-popover trigger="hover" :keep-alive-on-hover="false">
      <template #trigger>
        <n-button>Hover (ignore popup)</n-button>
      </template>
      <span>I wish they all could be California girls</span>
    </n-popover>
    <n-popover trigger="click">
      <template #trigger>
        <n-button>Click</n-button>
      </template>
      <span>I wish they all could be California girls</span>
    </n-popover>
    <n-popover trigger="focus">
      <template #trigger>
        <n-button>Focus</n-button>
      </template>
      <span>I wish they all could be California girls</span>
    </n-popover>
    <n-popover trigger="manual" :show="showPopover">
      <template #trigger>
        <n-button @click="showPopover = !showPopover">
          Manual
        </n-button>
      </template>
      <span>I wish they all could be California girls</span>
    </n-popover>
  </n-space>
</template>

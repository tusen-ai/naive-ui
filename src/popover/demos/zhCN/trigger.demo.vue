<markdown>
# 触发方式
</markdown>

<template>
  <n-space>
    <n-popover trigger="hover">
      <template #trigger>
        <n-button>悬浮</n-button>
      </template>
      <span>I wish they all could be California girls</span>
    </n-popover>
    <n-popover trigger="hover" :keep-alive-on-hover="false">
      <template #trigger>
        <n-button>悬浮（忽略主体）</n-button>
      </template>
      <span>I wish they all could be California girls</span>
    </n-popover>
    <n-popover trigger="click">
      <template #trigger>
        <n-button>点击</n-button>
      </template>
      <span>I wish they all could be California girls</span>
    </n-popover>
    <n-popover trigger="focus">
      <template #trigger>
        <n-button>聚焦</n-button>
      </template>
      <span>I wish they all could be California girls</span>
    </n-popover>
    <n-popover trigger="manual" :show="showPopover">
      <template #trigger>
        <n-button @click="showPopover = !showPopover">
          手动
        </n-button>
      </template>
      <span>I wish they all could be California girls</span>
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

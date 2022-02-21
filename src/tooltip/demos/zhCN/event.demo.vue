<markdown>
# 事件
</markdown>

<template>
  <n-space>
    <n-tooltip
      placement="bottom"
      trigger="hover"
      @update:show="handleUpdateShow"
    >
      <template #trigger>
        <n-button> 悬浮 </n-button>
      </template>
      <span> I wish they all could be California girls </span>
    </n-tooltip>
    <n-tooltip
      placement="bottom"
      trigger="click"
      @update:show="handleUpdateShow"
    >
      <template #trigger>
        <n-button> 点击 </n-button>
      </template>
      <span> I wish they all could be California girls </span>
    </n-tooltip>
    <n-tooltip :show="showPopover" trigger="manual" placement="bottom">
      <template #trigger>
        <n-button @click="showPopover = !showPopover">
          手动（不会有事件发出来）
        </n-button>
      </template>
      <span> I wish they all could be California girls </span>
    </n-tooltip>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      showPopover: ref(false),
      handleUpdateShow (show: boolean) {
        message.success(show + '')
      }
    }
  }
})
</script>

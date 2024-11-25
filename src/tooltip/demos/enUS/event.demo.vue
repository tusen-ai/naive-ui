<markdown>
# Event
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      showPopover: ref(false),
      handleUpdateShow(show: boolean) {
        message.success(`${show}`)
      }
    }
  }
})
</script>

<template>
  <n-space>
    <n-tooltip
      placement="bottom"
      trigger="hover"
      @update:show="handleUpdateShow"
    >
      <template #trigger>
        <n-button> Hover </n-button>
      </template>
      <span> I wish they all could be California girls </span>
    </n-tooltip>
    <n-tooltip
      placement="bottom"
      trigger="click"
      @update:show="handleUpdateShow"
    >
      <template #trigger>
        <n-button> Click </n-button>
      </template>
      <span> I wish they all could be California girls </span>
    </n-tooltip>
    <n-tooltip :show="showPopover" trigger="manual" placement="bottom">
      <template #trigger>
        <n-button @click="showPopover = !showPopover">
          Manual (No event will be emitted)
        </n-button>
      </template>
      <span> I wish they all could be California girls </span>
    </n-tooltip>
  </n-space>
</template>

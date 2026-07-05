<markdown>
# Event
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const showPopover = ref(false)

function handleUpdateShow(show: boolean) {
  message.success(show ? 'show' : 'hide')
}
</script>

<template>
  <n-space>
    <n-popover
      placement="bottom"
      trigger="hover"
      @update:show="handleUpdateShow"
    >
      <template #trigger>
        <n-button>Hover</n-button>
      </template>
      <span>I wish they all could be California girls</span>
    </n-popover>
    <n-popover
      placement="bottom"
      trigger="click"
      @update:show="handleUpdateShow"
    >
      <template #trigger>
        <n-button>Click</n-button>
      </template>
      <span>I wish they all could be California girls</span>
    </n-popover>
    <n-popover
      :show="showPopover"
      placement="bottom"
      trigger="manual"
      @update:show="handleUpdateShow"
    >
      <template #trigger>
        <n-button @click="showPopover = !showPopover">
          Manual
        </n-button>
      </template>
      <span>I wish they all could be California girls</span>
    </n-popover>
  </n-space>
</template>

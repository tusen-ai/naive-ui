<markdown>
# 事件
</markdown>

<template>
  <n-space>
    <n-popover
      placement="bottom"
      trigger="hover"
      @update:show="handleUpdateShow"
    >
      <template #trigger>
        <n-button>悬浮</n-button>
      </template>
      <span>我希望她们都是加州女孩</span>
    </n-popover>
    <n-popover
      placement="bottom"
      trigger="click"
      @update:show="handleUpdateShow"
    >
      <template #trigger>
        <n-button>点击</n-button>
      </template>
      <span>我希望她们都是加州女孩</span>
    </n-popover>
    <n-popover
      :show="showPopover"
      placement="bottom"
      trigger="manual"
      @update:show="handleUpdateShow"
    >
      <template #trigger>
        <n-button @click="showPopover = !showPopover">
          点击
        </n-button>
      </template>
      <span>我希望她们都是加州女孩</span>
    </n-popover>
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
        message.success(show ? 'show' : 'hide')
      }
    }
  }
})
</script>

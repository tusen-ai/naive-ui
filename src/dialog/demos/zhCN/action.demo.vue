<markdown>
# 自定义 Action

有的时候你想自定义 `action` 和 `content`。
</markdown>

<template>
  <n-space>
    <n-button @click="handleButtonClick">
      使用渲染函数
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDialog } from 'naive-ui'

export default defineComponent({
  setup () {
    const dialog = useDialog()
    return {
      handleButtonClick () {
        dialog.warning({
          title: '使用渲染函数',
          content: () => 'Content',
          action: () => 'Action'
        })
      }
    }
  }
})
</script>

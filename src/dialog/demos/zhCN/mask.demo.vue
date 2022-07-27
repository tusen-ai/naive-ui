<markdown>
# 点击遮罩

我觉得用户应该聪明到点遮罩没用的时候就去点确认了。
</markdown>

<template>
  <n-button @click="handleButtonClick">
    点击遮罩的事件
  </n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage, useDialog } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const dialog = useDialog()

    return {
      handleButtonClick () {
        dialog.success({
          title: '关闭',
          content: '你确定？',
          positiveText: '确定',
          negativeText: '不确定',
          maskClosable: false,
          onMaskClick: () => {
            message.success('不能关闭')
          },
          onEsc: () => {
            message.success('通过 esc 关闭')
          }
        })
      }
    }
  }
})
</script>

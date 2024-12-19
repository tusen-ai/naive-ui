<markdown>
# 点击遮罩

我觉得用户应该聪明到点遮罩没用的时候就去点确认了。
</markdown>

<script lang="ts">
import { useDialog, useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    const dialog = useDialog()

    return {
      handleButtonClick() {
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

<template>
  <n-button @click="handleButtonClick">
    点击遮罩的事件
  </n-button>
</template>

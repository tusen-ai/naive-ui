<markdown>
# 按下ESC

有时候我只是下意识的按了一下ESC。
</markdown>

<template>
  <n-button @click="handleButtonClick">
    点击ESC的事件
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
          closeOnEsc: false,
          onEscPress: () => {
            message.success('不能用ESC关闭')
          }
        })
      }
    }
  }
})
</script>

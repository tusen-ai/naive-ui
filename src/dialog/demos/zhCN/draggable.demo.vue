<markdown>
# 可拖拽的弹框

有时候你想拖拽弹框 。
</markdown>

<template>
  <n-space>
    <n-button @click="handleConfirm">
      拖拽弹框
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage, useDialog } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    const dialog = useDialog()
    return {
      handleConfirm () {
        dialog.warning({
          title: '警告',
          content: '你确定？',
          positiveText: '确定',
          negativeText: '不确定',
          draggable: true,
          onPositiveClick: () => {
            message.success('确定')
          },
          onNegativeClick: () => {
            message.error('不确定')
          }
        })
      }
    }
  }
})
</script>

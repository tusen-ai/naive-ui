<markdown>
# 可拖拽

可拖拽移动弹框。

</markdown>
<template>
  <n-space>
    <n-button @click="handleConfirm">
      可拖拽
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
          title: '关闭',
          content: '你确定？',
          positiveText: '确定',
          negativeText: '不确定',
          maskClosable: false,
          onMaskClick: () => {
            message.success('不能关闭')
          },
          draggable: true
        })
      }
    }
  }
})
</script>

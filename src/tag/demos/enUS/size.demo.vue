<markdown>
# Size
</markdown>

<template>
  <n-space>
    <n-tag size="small" closable @close="handleClose">
      Real Love
    </n-tag>
    <n-tag closable @close="handleClose">
      Real Love
    </n-tag>
    <n-tag type="success" size="large" closable @close="handleClose">
      Yes It Is
    </n-tag>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      handleClose () {
        message.info('tag close')
      }
    }
  }
})
</script>

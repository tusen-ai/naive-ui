<markdown>
# Shape

Round tag looks like a capsule.
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      handleClose() {
        message.info('tag close')
      }
    }
  }
})
</script>

<template>
  <n-space>
    <n-tag closable size="small" round @close="handleClose">
      Real Love
    </n-tag>
    <n-tag type="success" size="large" round closable @close="handleClose">
      Yes It Is
    </n-tag>
    <n-tag type="warning" closable round @close="handleClose">
      I'm Down
    </n-tag>
  </n-space>
</template>

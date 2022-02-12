<markdown>
# Shape

Round tag looks like a capsule.
</markdown>

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

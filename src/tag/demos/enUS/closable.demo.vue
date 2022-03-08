<markdown>
# Closable
</markdown>

<template>
  <n-space>
    <n-tag closable @close="handleClose">
      Real Love
    </n-tag>
    <n-tag type="success" closable @close="handleClose">
      Yes It Is
    </n-tag>
    <n-tag type="warning" closable @close="handleClose">
      I'm Down
    </n-tag>
    <n-tag type="error" closable @close="handleClose">
      Yesterday
    </n-tag>
    <n-tag type="info" closable @close="handleClose">
      I'm Looking Through You
      <template #icon>
        <n-icon>
          <TrashBinOutline />
        </n-icon>
      </template>
    </n-tag>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'
import { TrashBinOutline } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    TrashBinOutline
  },
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

<markdown>
# 可关闭
</markdown>

<template>
  <n-space>
    <n-tag closable @close="handleClose">
      爱在西元前
    </n-tag>
    <n-tag type="success" closable @close="handleClose">
      不该
    </n-tag>
    <n-tag type="warning" closable @close="handleClose">
      超人不会飞
    </n-tag>
    <n-tag type="error" closable @close="handleClose">
      手写的从前
    </n-tag>
    <n-tag type="info" closable @close="handleClose">
      哪里都是你
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

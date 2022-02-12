<markdown>
# Disabled
</markdown>

<template>
  <n-space align="center" item-style="display: flex;">
    <n-tag closable :disabled="disabled" @close="handleClose">
      Real Love
    </n-tag>
    <n-tag type="success" closable :disabled="disabled" @close="handleClose">
      Yes It Is
    </n-tag>
    <n-tag type="warning" closable :disabled="disabled" @close="handleClose">
      I'm Down
    </n-tag>
    <n-tag type="error" closable :disabled="disabled" @close="handleClose">
      Yesterday
    </n-tag>
    <n-tag type="info" closable :disabled="disabled" @close="handleClose">
      I'm Looking Through You
    </n-tag>
    <n-switch v-model:value="disabled" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      disabled: ref(true),
      handleClose () {
        message.info('tag close')
      }
    }
  }
})
</script>

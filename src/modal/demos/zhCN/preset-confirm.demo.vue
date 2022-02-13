<markdown>
# 使用 Dialog 预设

`dialog` 预设的例子。
</markdown>

<template>
  <n-button @click="showModal = true">
    来吧
  </n-button>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="确认"
    content="你确认?"
    positive-text="确认"
    negative-text="算了"
    @positive-click="submitCallback"
    @negative-click="cancelCallback"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()

    return {
      showModal: ref(false),
      cancelCallback () {
        message.success('Cancel')
      },
      submitCallback () {
        message.success('Submit')
      }
    }
  }
})
</script>

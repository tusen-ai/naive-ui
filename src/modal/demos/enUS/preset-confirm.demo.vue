<markdown>
# Use preset dialog

An example of preset `dialog`.
</markdown>

<template>
  <n-button @click="showModal = true">
    Start Me up
  </n-button>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="Dialog"
    content="Are you sure?"
    positive-text="Submit"
    negative-text="Cancel"
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

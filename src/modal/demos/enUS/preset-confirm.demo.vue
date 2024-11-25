<markdown>
# Use preset dialog

An example of preset `dialog`.
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()

    return {
      showModal: ref(false),
      cancelCallback() {
        message.success('Cancel')
      },
      submitCallback() {
        message.success('Submit')
      }
    }
  }
})
</script>

<template>
  <n-button @click="showModal = true">
    Start me up
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

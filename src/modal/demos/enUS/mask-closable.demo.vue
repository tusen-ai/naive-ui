<markdown>
# Mask closable

Use `mask-closable=false` to make modal not emit the event which may close the modal.
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    const showModalRef = ref(false)

    return {
      showModal: showModalRef,
      onPositiveClick() {
        message.success('Submit')
        showModalRef.value = false
      },
      onNegativeClick() {
        message.success('Cancel')
        showModalRef.value = false
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
    :mask-closable="false"
    preset="dialog"
    title="Dialog"
    content="Are you sure?"
    positive-text="Confirm"
    negative-text="Cancel"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  />
</template>

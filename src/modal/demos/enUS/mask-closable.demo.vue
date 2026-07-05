<markdown>
# Mask closable

Use `mask-closable=false` to make modal not emit the event which may close the modal.
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const showModal = ref(false)

function onPositiveClick() {
  message.success('Submit')
  showModal.value = false
}

function onNegativeClick() {
  message.success('Cancel')
  showModal.value = false
}
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

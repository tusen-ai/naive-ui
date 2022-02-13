<markdown>
# Customizing position

Use fixed position to set the position of the modal.
</markdown>

<template>
  <n-button @click="showModal = true">
    Start Me up
  </n-button>
  <n-modal v-model:show="showModal">
    <n-card
      title="Modal"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
      style="width: 600px; position: fixed; right: 100px; bottom: 100px"
    >
      <template #header-extra>
        Oops!
      </template>
      Content
      <template #footer>
        Footer
      </template>
    </n-card>
  </n-modal>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      showModal: ref(false)
    }
  }
})
</script>

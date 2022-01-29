<markdown>
# Whether to show the mask

Sometimes you don't want to show the mask.
</markdown>
<template>
  <n-button @click="showModal = true">
    No Mask
  </n-button>
  <n-modal v-model:show="showModal" :show-mask="false">
    <n-card
      style="width: 600px"
      title="Modal"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      Here is no mask!
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

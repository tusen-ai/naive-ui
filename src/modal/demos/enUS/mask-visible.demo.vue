<markdown>
# Mask visible

You can also hide the modal dialog's mask layer, which allows creating a floating panel.

Note that in this case, all mask-related APIs will be disabled, focus won't be limit inside modal (so keyboard event like Esc won't always work).
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
  <n-button @click="showModal = true">
    Floating Panel
  </n-button>
  <n-modal
    v-model:show="showModal"
    style="width: 800px"
    preset="card"
    draggable
    title="Floating Panel"
    :show-mask="false"
  >
    Floating Panel
  </n-modal>
</template>

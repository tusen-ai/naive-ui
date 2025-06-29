<markdown>
# Use preset dialog (slot)

Slots are also related to preset.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const showModal = ref(false)
</script>

<template>
  <n-button @click="showModal = true">
    Start me up
  </n-button>
  <n-modal v-model:show="showModal" preset="dialog" title="Dialog">
    <template #header>
      <div>title</div>
    </template>
    <div>content</div>
    <template #action>
      <div>action</div>
    </template>
  </n-modal>
</template>

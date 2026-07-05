<markdown>
# A11y debug
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)
</script>

<template>
  <n-button @click="show = !show">
    Toggle
  </n-button>
  <n-modal v-model:show="show" preset="card" title="A11Y" style="width: 600px">
    <n-input placeholder="Gigigi" />
    <template #action>
      <n-button>Something</n-button>
    </template>
  </n-modal>
</template>

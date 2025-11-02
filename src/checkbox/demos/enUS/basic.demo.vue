<markdown>
# Basic
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(false)
const disabled = ref(true)
</script>

<template>
  <n-space item-style="display: flex;" align="center">
    <n-checkbox v-model:checked="value">
      Checkbox
    </n-checkbox>
    <n-checkbox v-model:checked="value" />
    <n-checkbox v-model:checked="value" :disabled="disabled">
      Checkbox
    </n-checkbox>
    <n-button size="small" @click="disabled = !disabled">
      Disabled
    </n-button>
  </n-space>
</template>

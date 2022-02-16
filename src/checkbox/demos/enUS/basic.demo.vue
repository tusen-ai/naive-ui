<markdown>
# Basic
</markdown>

<template>
  <n-space item-style="display: flex;" align="center">
    <n-checkbox v-model:checked="value">
      Checkbox
    </n-checkbox>
    <n-checkbox v-model:checked="value" />
    <n-checkbox
      v-model:checked="value"
      :disabled="disabled"
    >
      Checkbox
    </n-checkbox>
    <n-button size="small" @click="disabled = !disabled">
      Disabled
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(false),
      disabled: ref(true)
    }
  }
})
</script>

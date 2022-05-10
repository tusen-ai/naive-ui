<markdown>
# Controlled checkbox
</markdown>

<template>
  <n-space align="center" item-style="display: flex;">
    <n-checkbox :checked="value">
      Checkbox
    </n-checkbox>
    <n-switch v-model:value="value" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(false)
    }
  }
})
</script>

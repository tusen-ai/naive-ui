<markdown>
# Alpha

Use `show-alpha` to control whether the alpha channel can be adjusted.
</markdown>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      handleConfirm(value: string) {
        console.log(value)
      }
    }
  }
})
</script>

<template>
  <n-color-picker
    :show-alpha="false"
    :actions="['confirm']"
    @confirm="handleConfirm"
  />
</template>

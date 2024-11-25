<markdown>
# Icon with background

Sometime it looks better with a background.
</markdown>

<script lang="ts">
import Checkmark16Filled from '@vicons/fluent/Checkmark16Filled'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      Checkmark16Filled
    }
  }
})
</script>

<template>
  <n-icon-wrapper :size="24" :border-radius="10">
    <n-icon :size="18" :component="Checkmark16Filled" />
  </n-icon-wrapper>
</template>

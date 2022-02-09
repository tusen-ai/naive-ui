<markdown>
# Icon with background

Sometime it looks better with a background.
</markdown>

<template>
  <n-icon-wrapper :size="24" :border-radius="10">
    <n-icon :size="18" :component="Checkmark16Filled" />
  </n-icon-wrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Checkmark16Filled from '@vicons/fluent/Checkmark16Filled'

export default defineComponent({
  setup () {
    return {
      Checkmark16Filled
    }
  }
})
</script>

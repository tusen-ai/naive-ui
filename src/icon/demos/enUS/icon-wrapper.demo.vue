<markdown>
# Icon with background

Sometime it looks better with a background.
</markdown>

<template>
  <n-icon-wrapper :size="24" :border-radius="10" color="#ef4444">
    <n-icon :size="18" :component="AlertOutline" />
  </n-icon-wrapper>
</template>

<script lang="ts">
import { AlertOutline } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      AlertOutline
    }
  }
})
</script>

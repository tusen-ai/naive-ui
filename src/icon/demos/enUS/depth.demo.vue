<markdown>
# Depth

To match different text color levels, icon provides a `depth` property.
</markdown>

<template>
  <n-icon :component="CashOutline" size="40" :depth="1" />
  <n-icon :component="CashOutline" size="40" :depth="2" />
  <n-icon :component="CashOutline" size="40" :depth="3" />
  <n-icon :component="CashOutline" size="40" :depth="4" />
  <n-icon :component="CashOutline" size="40" :depth="5" />
</template>

<script lang="ts">
import { CashOutline } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      CashOutline
    }
  }
})
</script>

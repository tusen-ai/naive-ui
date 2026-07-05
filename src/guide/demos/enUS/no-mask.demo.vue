<markdown>
# No Mask

Use guide without covering the page with a mask.
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      show: ref(false),
      steps: [
        {
          title: 'No mask',
          content: 'Use show-mask=false when the page should stay uncovered.',
          target: '#guide-no-mask-target'
        }
      ]
    }
  }
})
</script>

<template>
  <n-space>
    <n-button id="guide-no-mask-target">
      Target
    </n-button>
    <n-button @click="show = true">
      Start guide
    </n-button>
  </n-space>
  <n-guide v-model:show="show" :steps="steps" :show-mask="false" />
</template>

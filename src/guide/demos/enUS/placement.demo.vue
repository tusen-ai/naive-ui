<markdown>
# Placement

Set placement globally or per step.
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      show: ref(false),
      steps: [
        {
          title: 'Top placement',
          content: 'The panel can be placed above the target.',
          target: '#guide-placement-top',
          placement: 'top'
        },
        {
          title: 'Right placement',
          content: 'It can also appear on the right.',
          target: '#guide-placement-right',
          placement: 'right'
        },
        {
          title: 'Bottom placement',
          content: 'Bottom is the default placement.',
          target: '#guide-placement-bottom',
          placement: 'bottom'
        },
        {
          title: 'Left placement',
          content: 'Use placement on each step when needed.',
          target: '#guide-placement-left',
          placement: 'left'
        }
      ]
    }
  }
})
</script>

<template>
  <n-space>
    <n-button id="guide-placement-top">
      Top
    </n-button>
    <n-button id="guide-placement-right">
      Right
    </n-button>
    <n-button id="guide-placement-bottom">
      Bottom
    </n-button>
    <n-button id="guide-placement-left">
      Left
    </n-button>
    <n-button @click="show = true">
      Start guide
    </n-button>
  </n-space>
  <n-guide v-model:show="show" :steps="steps" />
</template>

<markdown>
# Controlled

Control the shown state and current step with v-model.
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      show: ref(false),
      current: ref(1),
      steps: [
        {
          title: 'Controlled current',
          content: 'The current step is controlled with v-model:current.',
          target: '#guide-controlled-first'
        },
        {
          title: 'Keep in sync',
          content: 'External controls can jump between steps.',
          target: '#guide-controlled-second'
        }
      ]
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-button id="guide-controlled-first">
        First target
      </n-button>
      <n-button id="guide-controlled-second">
        Second target
      </n-button>
    </n-space>
    <n-space>
      <n-button @click="show = true">
        Start
      </n-button>
      <n-button @click="current = 1">
        Go to first
      </n-button>
      <n-button @click="current = 2">
        Go to second
      </n-button>
    </n-space>
  </n-space>
  <n-guide v-model:show="show" v-model:current="current" :steps="steps" />
</template>

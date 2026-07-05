<markdown>
# No Target

A step without target is shown near the viewport center.
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      show: ref(false),
      steps: [
        {
          title: 'No target',
          content:
            'A step without target is displayed near the viewport center.'
        }
      ]
    }
  }
})
</script>

<template>
  <n-button @click="show = true">
    Start guide
  </n-button>
  <n-guide v-model:show="show" :steps="steps" />
</template>

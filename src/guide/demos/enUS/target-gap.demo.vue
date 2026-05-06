<markdown>
# Target Gap

Control the gap between the highlighted box and the target box.
</markdown>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const showRef = ref(false)
    const gapRef = ref(0)
    const stepsRef = computed(() => [
      {
        title: 'Target gap',
        content: `Current target gap: ${gapRef.value}px`,
        target: '#guide-target-gap'
      }
    ])

    return {
      show: showRef,
      gap: gapRef,
      steps: stepsRef,
      startGuide(gap: number) {
        gapRef.value = gap
        showRef.value = true
      }
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-button id="guide-target-gap">
      Target
    </n-button>
    <n-space>
      <n-button @click="startGuide(0)">
        Gap 0
      </n-button>
      <n-button @click="startGuide(12)">
        Gap 12
      </n-button>
    </n-space>
  </n-space>
  <n-guide v-model:show="show" :steps="steps" :target-gap="gap" />
</template>

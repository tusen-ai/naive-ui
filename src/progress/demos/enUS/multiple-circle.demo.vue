<markdown>
# Multiple circle

Maybe your product manager will need it.
</markdown>

<template>
  <n-space vertical>
    <n-el>
      <n-progress
        type="multiple-circle"
        :stroke-width="6"
        :circle-gap="0.5"
        :percentage="[
          percentage,
          (percentage + 10) % 100,
          (percentage + 20) % 100,
          (percentage + 30) % 100
        ]"
        :color="[
          'var(--info-color)',
          'var(--success-color)',
          'var(--warning-color)',
          'var(--error-color)'
        ]"
        :rail-style="[
          { stroke: 'var(--info-color)', opacity: 0.3 },
          { stroke: 'var(--success-color)', opacity: 0.3 },
          { stroke: 'var(--warning-color)', opacity: 0.3 },
          { stroke: 'var(--error-color)', opacity: 0.3 }
        ]"
      >
        <div style="text-align: center">
          Circle racing!
        </div>
      </n-progress>
    </n-el>
    <n-space>
      <n-button @click="minus">
        Minus 10%
      </n-button>
      <n-button @click="add">
        Add 10%
      </n-button>
    </n-space>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const percentageRef = ref(0)

    const add = () => {
      percentageRef.value += 10
      if (percentageRef.value > 100) {
        percentageRef.value = 0
      }
    }

    const minus = () => {
      percentageRef.value -= 10
      if (percentageRef.value < 0) {
        percentageRef.value = 100
      }
    }

    return {
      percentage: percentageRef,
      add,
      minus
    }
  }
})
</script>

<markdown>
# Line

In fact, progress of line type don't need four different styles. However, since UI has designed it, I finally implemented them all. It also support `default`, `info`, `success`, `warning` or `error` status.
</markdown>

<template>
  <n-space vertical>
    <n-progress type="line" :percentage="percentage" :show-indicator="false" />
    <n-progress type="line" :percentage="percentage" />
    <n-progress
      type="line"
      :percentage="percentage"
      :indicator-placement="'inside'"
    />
    <n-progress
      type="line"
      status="info"
      :percentage="percentage"
      :show-indicator="false"
    />
    <n-progress type="line" status="info" :percentage="percentage" />
    <n-progress
      type="line"
      status="info"
      :percentage="percentage"
      :indicator-placement="'inside'"
    />
    <n-progress
      type="line"
      status="success"
      :percentage="percentage"
      :show-indicator="false"
    />
    <n-progress type="line" status="success" :percentage="percentage" />
    <n-progress
      type="line"
      status="success"
      :percentage="percentage"
      :indicator-placement="'inside'"
    />
    <n-progress
      type="line"
      status="warning"
      :percentage="percentage"
      :show-indicator="false"
    />
    <n-progress type="line" status="warning" :percentage="percentage" />
    <n-progress
      type="line"
      status="warning"
      :percentage="percentage"
      :indicator-placement="'inside'"
    />
    <n-progress
      type="line"
      status="error"
      :percentage="percentage"
      :show-indicator="false"
    />
    <n-progress type="line" status="error" :percentage="percentage" />
    <n-progress
      type="line"
      status="error"
      :percentage="percentage"
      :indicator-placement="'inside'"
    />
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

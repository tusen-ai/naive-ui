<markdown>
# Debug
</markdown>

<template>
  <n-input-number
    v-model:value="value1"
    placeholder="最小值"
    :min="-3"
    :max="5"
    loading
    @update:value="handleUpdateValue1"
  />
  {{ JSON.stringify(value1) }}
  <n-input-number v-model:value="value2" @update:value="handleUpdateValue2" />
  {{ JSON.stringify(value2) }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      handleUpdateValue1 (v: number | null) {
        console.log(v)
      },
      handleUpdateValue2 (v: number | null) {
        console.log(v)
      },
      value1: ref(null),
      value2: ref(null)
    }
  }
})
</script>

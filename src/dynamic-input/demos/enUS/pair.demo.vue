<markdown>
# Using pair preset
</markdown>

<template>
  <n-dynamic-input
    v-model:value="value"
    preset="pair"
    key-placeholder="Please input the key"
    value-placeholder="Please input the value"
  />
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref([
        {
          key: '',
          value: ''
        }
      ])
    }
  }
})
</script>

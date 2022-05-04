<markdown>
# Use formatted value

Use `formatted-value` to control formatted value.
</markdown>

<template>
  <pre>{{ formattedValue }}</pre>
  <n-time-picker
    v-model:formatted-value="formattedValue"
    value-format="H~m~s"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      formattedValue: ref('4~1~8')
    }
  }
})
</script>

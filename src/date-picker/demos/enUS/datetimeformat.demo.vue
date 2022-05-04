<markdown>
# Formatted value

Honestly I don't like the feature. Since at most of time it's not a best practice to passing time string around. However, real world is complex, I hope it can help you resolve some tricky problems.
</markdown>

<template>
  <pre>{{ formattedValue }}</pre>
  <n-date-picker
    v-model:formatted-value="formattedValue"
    value-format="yyyy-MM-dd HH:mm:ss"
    type="datetime"
    clearable
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      formattedValue: ref('2007-06-30 12:08:55')
    }
  }
})
</script>

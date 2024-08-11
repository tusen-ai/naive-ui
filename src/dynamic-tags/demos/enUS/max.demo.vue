<markdown>
# Max tag count
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      tags: ref(['teacher', 'programmer'])
    }
  }
})
</script>

<template>
  <n-dynamic-tags v-model:value="tags" :max="3" />
</template>

<markdown>
# precision debug
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const v = ref(1)
    function check() {
      if (v.value === null) {
        v.value = 1
      }
    }
    return {
      v,
      check
    }
  }
})
</script>

<template>
  <n-input-number v-model:value="v" :precision="0" @blur="check" />
</template>

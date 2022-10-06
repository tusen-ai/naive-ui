<markdown>
# precision debug
</markdown>

<template>
  <n-input-number v-model:value="v" :precision="0" @blur="check" />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const v = ref(1)
    function check () {
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

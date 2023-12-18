<markdown>
# Basic

Start typing to see how this works.
</markdown>

<template>
  <n-auto-complete
    v-model:value="value"
    :input-props="{
      autocomplete: 'disabled'
    }"
    :options="options"
    placeholder="Email"
    clearable
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup () {
    const valueRef = ref('')
    return {
      value: valueRef,
      options: computed(() => {
        return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
          const prefix = valueRef.value.split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix
          }
        })
      })
    }
  }
})
</script>

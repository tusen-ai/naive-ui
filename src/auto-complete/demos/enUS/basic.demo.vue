<markdown>
# Basic

Start typing to see how this works.
</markdown>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const valueRef = ref('')
const value = valueRef
const options = computed(() => {
  return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
    const prefix = valueRef.value.split('@')[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix
    }
  })
})
</script>

<template>
  <n-auto-complete
    v-model:value="value"
    :input-props="{
      autocomplete: 'disabled',
    }"
    :options="options"
    placeholder="Email"
    clearable
  />
</template>

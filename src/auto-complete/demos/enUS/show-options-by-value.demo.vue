<markdown>
# Whether to show menu

Your can determine is whether to show menu based on value when it is focused.
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
function getShow(value: string) {
  if (value === 'a') {
    return true
  }
  return false
}
</script>

<template>
  <n-auto-complete
    v-model:value="value"
    :options="options"
    placeholder="Input 'a' to show menu"
    :get-show="getShow"
  />
</template>

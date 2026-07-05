<markdown>
# Actions after select

Choose whether the element blurs after a selection is made with `blur-after-select`.
</markdown>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const valueRef = ref('')
const value = valueRef
const options = computed(() => {
  return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
    const value = valueRef.value === null ? '' : valueRef.value
    const prefix = value.split('@')[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix
    }
  })
})
</script>

<template>
  <n-space vertical>
    <n-auto-complete
      v-model:value="value"
      :options="options"
      clear-after-select
      placeholder="Clear After Select"
    />
    <n-auto-complete
      v-model:value="value"
      :options="options"
      blur-after-select
      placeholder="Blur After Select"
    />
  </n-space>
</template>

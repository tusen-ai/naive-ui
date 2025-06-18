<markdown>
# Customized rendering

Use `render-label` to customize label rendering.
</markdown>

<script lang="ts" setup>
import type { SelectOption } from 'naive-ui'
import type { VNodeChild } from 'vue'
import { NTag } from 'naive-ui'
import { computed, h, ref } from 'vue'

const valueRef = ref('')
const value = valueRef
function renderLabel(option: SelectOption): VNodeChild {
  return [
    option.label as string,
    ' ',
    h(NTag, { size: 'small', type: 'info' }, { default: () => 'Email' })
  ]
}
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
    :options="options"
    placeholder="Email"
    :render-label="renderLabel"
  />
</template>

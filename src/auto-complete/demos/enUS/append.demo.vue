<markdown>
# Append

Append the selected option to the input box instead of directly overwriting it, and use it in conjunction with get-show.
</markdown>

<template>
  <n-space vertical>
    <n-auto-complete
      v-model:value="value"
      :options="options"
      :append="false"
      placeholder="Select and overwrite"
    />
    <n-auto-complete
      v-model:value="appendValue"
      :options="appendOptions"
      :append="true"
      :get-show="getShow"
      placeholder="Select and append"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup () {
    const valueRef = ref('')
    const appendValueRef = ref('')
    return {
      value: valueRef,
      options: computed(() => {
        return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
          const value = valueRef.value === null ? '' : valueRef.value
          const prefix = value.split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix
          }
        })
      }),
      appendValue: appendValueRef,
      appendOptions: computed(() => {
        return ['gmail.com', '163.com', 'qq.com'].map((suffix) => {
          return {
            label: suffix,
            value: suffix
          }
        })
      }),
      getShow: (value: string) => {
        if (value.endsWith('@')) {
          return true
        }
        return false
      }
    }
  }
})
</script>

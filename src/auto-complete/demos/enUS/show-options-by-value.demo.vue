<markdown>
# Whether to show menu

Your can determine is whether to show menu based on value when it is focused.
</markdown>

<template>
  <n-auto-complete
    v-model:value="value"
    :options="options"
    placeholder="Input 'a' to show menu"
    :get-show="getShow"
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
      }),
      getShow: (value: string) => {
        if (value === 'a') {
          return true
        }
        return false
      }
    }
  }
})
</script>

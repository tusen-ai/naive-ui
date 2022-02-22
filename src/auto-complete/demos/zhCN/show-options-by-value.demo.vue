<markdown>
# 是否显示菜单

你可以根据输入的值来决定是否显示菜单
</markdown>

<template>
  <n-auto-complete
    v-model:value="value"
    :options="options"
    placeholder="输入 a 显示菜单"
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

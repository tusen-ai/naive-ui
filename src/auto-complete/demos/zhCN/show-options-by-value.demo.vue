<markdown>
# 是否显示菜单

你可以根据输入的值来决定是否显示菜单
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
    placeholder="输入 a 显示菜单"
    :get-show="getShow"
  />
</template>

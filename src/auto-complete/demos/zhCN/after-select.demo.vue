<markdown>
# 选择后的动作

在选中选项后清除内容或者选择后 Blur。
</markdown>

<template>
  <n-space vertical>
    <n-auto-complete
      v-model:value="value"
      :options="options"
      clear-after-select
      placeholder="选择后清空"
    />
    <n-auto-complete
      v-model:value="value"
      :options="options"
      blur-after-select
      placeholder="选择后 Blur"
    />
  </n-space>
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
          const value = valueRef.value === null ? '' : valueRef.value
          const prefix = value.split('@')[0]
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

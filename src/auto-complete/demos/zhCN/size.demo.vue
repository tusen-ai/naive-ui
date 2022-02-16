<markdown>
# 尺寸
</markdown>

<template>
  <n-space vertical>
    <n-auto-complete
      v-model:value="value"
      :options="options"
      placeholder="邮箱"
      size="small"
    />
    <n-auto-complete
      v-model:value="value"
      :options="options"
      placeholder="邮箱"
      size="medium"
    />
    <n-auto-complete
      v-model:value="value"
      :options="options"
      placeholder="邮箱"
      size="large"
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

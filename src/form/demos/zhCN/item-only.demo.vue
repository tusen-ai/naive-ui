<markdown>
# 只使用 FormItem

你可以单独使用 `n-form-item`，不在 `n-form` 中验证表项。
</markdown>

<template>
  <n-form-item label="这是个 FormItem" :rule="rule">
    <n-input v-model:value="value" />
  </n-form-item>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

const message = '它不在 Form 里面'

export default defineComponent({
  setup () {
    const valueRef = ref(message)
    return {
      value: valueRef,
      rule: {
        trigger: ['input', 'blur'],
        validator () {
          if (valueRef.value !== message) {
            return new Error(message)
          }
        }
      }
    }
  }
})
</script>

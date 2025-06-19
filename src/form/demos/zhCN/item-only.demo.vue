<markdown>
# 只使用 FormItem

你可以单独使用 `n-form-item`，不在 `n-form` 中验证表项。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const message = '它不在 Form 里面'
const valueRef = ref(message)

const rule = {
  trigger: ['input', 'blur'],
  validator() {
    if (valueRef.value !== message) {
      return new Error(message)
    }
  }
}
</script>

<template>
  <n-form-item label="这是个 FormItem" :rule="rule">
    <n-input v-model:value="valueRef" />
  </n-form-item>
</template>

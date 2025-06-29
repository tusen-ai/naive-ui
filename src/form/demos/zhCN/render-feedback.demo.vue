<markdown>
# 自定义 n-form-item 的渲染方式

可是为什么不在 rule 里面定义呢？
</markdown>

<script lang="ts" setup>
import { h, ref } from 'vue'

const message = '它不在 Form 里面'
const valueRef = ref(message)

function formatFeedback(raw: string | undefined) {
  return h('div', { style: 'color: green' }, [`${raw}而且是绿的`])
}

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
  <n-form-item
    :render-feedback="formatFeedback"
    label="这是个 FormItem"
    :rule="rule"
  >
    <n-input v-model:value="valueRef" />
  </n-form-item>
</template>

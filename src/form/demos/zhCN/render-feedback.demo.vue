<markdown>
# 自定义 n-form-item 的渲染方式

可是为什么不在 rule 里面定义呢？
</markdown>

<template>
  <n-form-item
    :render-feedback="formatFeedback"
    label="这是个 FormItem"
    :rule="rule"
  >
    <n-input v-model:value="value" />
  </n-form-item>
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'

const message = '它不在 Form 里面'

export default defineComponent({
  setup () {
    const valueRef = ref(message)
    return {
      value: valueRef,
      formatFeedback: (raw: string | undefined) =>
        h('div', { style: 'color: green' }, [raw + '而且是绿的']),
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

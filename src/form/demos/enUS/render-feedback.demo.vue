<markdown>
# Custom render of n-form-item

But why not define it in rule?
</markdown>

<template>
  <n-form-item
    :render-feedback="formatFeedback"
    label="This is a FormItem"
    :rule="rule"
  >
    <n-input v-model:value="value" />
  </n-form-item>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue'

const message = 'It is not in a Form'

export default defineComponent({
  setup () {
    const valueRef = ref(message)
    return {
      value: valueRef,
      formatFeedback: (raw: string | undefined) =>
        h('div', { style: 'color: green' }, [raw + ' and it is green']),
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

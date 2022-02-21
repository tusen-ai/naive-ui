<markdown>
# Use form item alone

You can also use `n-form-item` outside of an `n-form` element.
</markdown>

<template>
  <n-form-item label="This is a FormItem" :rule="rule">
    <n-input v-model:value="value" />
  </n-form-item>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

const message = 'It is not in a Form'

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

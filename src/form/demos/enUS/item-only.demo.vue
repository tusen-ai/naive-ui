<markdown>
# Use form item alone

You can also use `n-form-item` outside of an `n-form` element.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const message = 'It is not in a Form'
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
  <n-form-item label="This is a FormItem" :rule="rule">
    <n-input v-model:value="valueRef" />
  </n-form-item>
</template>

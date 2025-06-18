<markdown>
# Customize input element

You can also replace the input element of the auto-complete component (e.g. using a textarea).
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
</script>

<template>
  <n-auto-complete v-model:value="value" :options="options">
    <template
      #default="{ handleInput, handleBlur, handleFocus, value: slotValue }"
    >
      <n-input
        type="textarea"
        :value="slotValue"
        placeholder="Email"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </n-auto-complete>
</template>

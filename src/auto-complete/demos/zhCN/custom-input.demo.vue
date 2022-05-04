<markdown>
# 自定义输入元素

你可以替换 AutoComplete 的输入元素。
</markdown>

<template>
  <n-auto-complete v-model:value="value" :options="options">
    <template
      #default="{ handleInput, handleBlur, handleFocus, value: slotValue }"
    >
      <n-input
        type="textarea"
        :value="slotValue"
        placeholder="邮箱"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </n-auto-complete>
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

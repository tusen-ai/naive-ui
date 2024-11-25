<markdown>
# 输入成对值
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      placeholder: ['从', '到'] as const,
      handleInputBlur() {
        message.info('输入成对值：Blur')
      },
      handleInputFocus() {
        message.info('输入成对值：Focus')
      },
      handleInputInput() {
        message.info('输入成对值：Input')
      },
      handleInputChange() {
        message.info('输入成对值：Change')
      }
    }
  }
})
</script>

<template>
  <n-input
    pair
    separator="-"
    :placeholder="placeholder"
    clearable
    @blur="handleInputBlur"
    @focus="handleInputFocus"
    @change="handleInputChange"
    @update:value="handleInputInput"
  />
</template>

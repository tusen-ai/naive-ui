<markdown>
# 事件
</markdown>

<script lang="ts">
import { useMessage } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      value: ref(0),
      handleChange(v: number | null) {
        message.info(`update:value(${v})`)
      },
      handleBlur() {
        message.info('blur')
      },
      handleFocus() {
        message.info('focus')
      }
    }
  }
})
</script>

<template>
  <n-input-number
    v-model:value="value"
    @update:value="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

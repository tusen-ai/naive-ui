<markdown>
# 事件
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const value = ref(0)

function handleChange(v: number | null) {
  message.info(`update:value(${v})`)
}

function handleBlur() {
  message.info('blur')
}

function handleFocus() {
  message.info('focus')
}
</script>

<template>
  <n-input-number
    v-model:value="value"
    @update:value="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

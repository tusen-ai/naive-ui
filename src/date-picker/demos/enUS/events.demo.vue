<markdown>
# Events
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const datetime = ref(1183135260000)
const date = ref(null)
const datetimerange = ref(null)
const daterange = ref(null)
const disabled = ref(false)

function onBlur1() {
  message.info('Blur-1')
}

function onChange1(value: number) {
  message.info(`Change-1 ${value}`)
}

function onBlur2() {
  message.error('Blur-2')
}

function onChange2(value: number) {
  message.error(`Change-2 ${value}`)
}

function onBlur3() {
  message.warning('Blur-3')
}

function onChange3(value: number) {
  message.warning(`Change-3 ${value}`)
}

function onBlur4() {
  message.success('Blur-4')
}

function onChange4(value: number) {
  message.success(`Change-4 ${value}`)
}

function onClear() {
  message.info('Clear-5')
}

function onConfirm(value: number | number[] | null) {
  message.info(`Confirm-5 ${value}`)
}
</script>

<template>
  <n-space vertical>
    <n-date-picker
      v-model:value="datetime"
      type="datetime"
      :disabled="disabled"
      @blur="onBlur1"
      @update:value="onChange1"
    />
    <n-date-picker
      v-model:value="date"
      type="date"
      :disabled="disabled"
      @blur="onBlur2"
      @update:value="onChange2"
    />
    <n-date-picker
      v-model:value="datetimerange"
      :disabled="disabled"
      type="datetimerange"
      @blur="onBlur3"
      @update:value="onChange3"
    />
    <n-date-picker
      v-model:value="daterange"
      :disabled="disabled"
      type="daterange"
      @blur="onBlur4"
      @update:value="onChange4"
    />
    <n-date-picker
      v-model:value="daterange"
      :disabled="disabled"
      type="daterange"
      @clear="onClear"
      @confirm="onConfirm"
    />
    <n-switch v-model:value="disabled" />
  </n-space>
</template>

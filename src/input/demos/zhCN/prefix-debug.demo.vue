<markdown>
# Prefix debug
</markdown>

<script lang="ts" setup>
import { FlashOutline } from '@vicons/ionicons5'
import { ref } from 'vue'

const value1 = ref(null)
const value2 = ref(null)
const value3 = ref(null)
const value4 = ref(null)
const value5 = ref('Test value')
const value6 = ref('Test value')
</script>

<template>
  <n-space vertical>
    <n-input v-model:value="value1" type="text" placeholder="Basic Input">
      <template #prefix>
        <n-icon :component="FlashOutline" />
      </template>
    </n-input>
    <n-input
      v-model:value="value2"
      type="textarea"
      placeholder="Default Textarea"
    >
      <template #prefix>
        <n-icon :component="FlashOutline" />
      </template>
    </n-input>

    <n-divider dashed>
      Below is a bug with prefix indentation
    </n-divider>

    <n-input
      v-model:value="value3"
      type="textarea"
      autosize
      placeholder="AutoSize Textarea 1"
    >
      <template #prefix>
        <n-icon :component="FlashOutline" />
      </template>
    </n-input>
    <n-input
      v-model:value="value4"
      type="textarea"
      :autosize="{ minRows: 2 }"
      placeholder="AutoSize Textarea 2"
    >
      <template #prefix>
        <n-icon :component="FlashOutline" />
      </template>
    </n-input>

    <n-divider />

    <n-input
      v-model:value="value5"
      type="textarea"
      autosize
      placeholder="AutoSize Textarea 1"
    >
      <template #prefix>
        <n-icon :component="FlashOutline" />
      </template>
    </n-input>
    <n-input
      v-model:value="value6"
      type="textarea"
      :autosize="{ minRows: 2 }"
      placeholder="AutoSize Textarea 2"
    >
      <template #prefix>
        <n-icon :component="FlashOutline" />
      </template>
    </n-input>
  </n-space>
</template>

<markdown>
# Prefix debug
</markdown>

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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FlashOutline } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      value1: ref(null),
      value2: ref(null),
      value3: ref(null),
      value4: ref(null),
      value5: ref('Test value'),
      value6: ref('Test value'),
      FlashOutline
    }
  }
})
</script>

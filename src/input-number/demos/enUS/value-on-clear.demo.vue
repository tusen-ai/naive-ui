<markdown>
# Value on Clear

You can set the value displayed when the input is cleared via `value-on-clear`.
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(100)
const value2 = ref(100)
const value3 = ref(100)
const value4 = ref(100)
</script>

<template>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px">
    <n-space vertical :size="0">
      <n-text depth="3">
        Default behavior (set to null when cleared):
      </n-text>
      <n-input-number
        v-model:value="value1"
        clearable
        :min="0"
        :max="200"
        placeholder="Click clear button"
      />
    </n-space>
    <n-space vertical :size="0">
      <n-text depth="3">
        Set to 0 when cleared:
      </n-text>
      <n-input-number
        v-model:value="value2"
        clearable
        :value-on-clear="0"
        :min="0"
        :max="200"
        placeholder="Click clear button"
      />
    </n-space>
    <n-space vertical :size="0">
      <n-text depth="3">
        Set to min when cleared:
      </n-text>
      <n-input-number
        v-model:value="value3"
        clearable
        value-on-clear="min"
        :min="10"
        :max="200"
        placeholder="Click clear button"
      />
    </n-space>
    <n-space vertical :size="0">
      <n-text depth="3">
        Set to max when cleared:
      </n-text>
      <n-input-number
        v-model:value="value4"
        clearable
        value-on-clear="max"
        :min="0"
        :max="200"
        placeholder="Click clear button"
      />
    </n-space>
  </div>
</template>

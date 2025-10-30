<markdown>
# I18n

Form's rule supports `renderMessage`. You can use it to render your message.
</markdown>

<script lang="ts" setup>
import type { FormRules } from 'naive-ui'
import { ref } from 'vue'

const localeRef = ref('English')
const rules: FormRules = {
  input: {
    required: true,
    trigger: ['focus', 'input'],
    renderMessage: () => {
      return localeRef.value === 'Chinese' ? '中文错误' : 'English error'
    }
  }
}
const modelRef = ref({
  input: ''
})
</script>

<template>
  <n-space vertical>
    <n-radio-group v-model:value="localeRef">
      <n-space>
        <n-radio label="English" value="English" />
        <n-radio label="Chinese" value="Chinese" />
      </n-space>
    </n-radio-group>
    <n-form :model="modelRef" :rules="rules">
      <n-form-item label="Input something to remove error" path="input">
        <n-input v-model:value="modelRef.input" />
      </n-form-item>
    </n-form>
  </n-space>
</template>

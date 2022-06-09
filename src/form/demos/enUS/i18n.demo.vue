<markdown>
# I18n

Form's rule supports `renderMessage`. You can use it to render your message.
</markdown>

<template>
  <n-space vertical>
    <n-radio-group v-model:value="locale">
      <n-space>
        <n-radio label="English" value="English" />
        <n-radio label="Chinese" value="Chinese" />
      </n-space>
    </n-radio-group>
    <n-form :model="model" :rules="rules">
      <n-form-item label="Input something to remove error" path="input">
        <n-input v-model:value="model.input" />
      </n-form-item>
    </n-form>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FormRules } from 'naive-ui'

export default defineComponent({
  setup () {
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
    return {
      rules,
      model: modelRef,
      locale: localeRef
    }
  }
})
</script>

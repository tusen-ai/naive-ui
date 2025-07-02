<markdown>
# Use with form

An example for using together with `n-form`.
</markdown>

<script lang="ts" setup>
import type { FormInst, FormRules } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const formRef = ref<FormInst | null>(null)
const message = useMessage()

const formValue = ref({
  passcode: null
})

const rules: FormRules = {
  passcode: [
    {
      message: 'Missing passcode',
      validator: (_, value: string[] | null) => {
        if (value === null)
          return false
        return value.filter(Boolean).length >= 6
      },
      trigger: ['blur']
    },
    {
      message: 'Missing passcode',
      validator: (_, value: string[] | null) => {
        if (value === null)
          return false
        return value.filter(Boolean).length >= 1
      },
      trigger: ['input']
    }
  ]
}

function handleValidateClick(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(
    (errors) => {
      if (!errors) {
        message.success('Valid')
      }
      else {
        console.log(errors)
        message.error('Invalid')
      }
    },
    rule => !!rule.trigger?.includes('blur')
  )
}
</script>

<template>
  <n-form ref="formRef" inline :model="formValue" :rules="rules">
    <n-form-item path="passcode" label="Pass Code">
      <n-input-otp v-model:value="formValue.passcode" />
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" @click="handleValidateClick">
        Validate
      </n-button>
    </n-form-item>
  </n-form>
</template>

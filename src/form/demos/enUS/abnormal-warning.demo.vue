<markdown>
# Abnormal warning

You may want to display warnings to the user for values that may be abnormal, but do not want the validate method to throw an exception. In this case, `FormItemRule`'s `level` attribute can help you (`level: 'warning'`).
</markdown>

<template>
  <n-form ref="formRef" inline :model="formValue" :rules="rules">
    <n-form-item label="How many humps can a camel have at most?" path="count">
      <n-input-number v-model:value="formValue.count" />
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" @click="handleValidateClick">
        Submit Answer
      </n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { FormInst, FormItemRule, FormRules, useMessage } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const formRef = ref<FormInst | null>(null)
    const message = useMessage()
    return {
      formRef,
      formValue: ref({
        count: undefined
      }),
      rules: {
        count: [
          {
            required: true,
            message: 'Try to answer?',
            type: 'number',
            trigger: ['input', 'blur']
          },
          {
            trigger: ['input', 'blur'],
            level: 'warning',
            validator (_rule: FormItemRule, value: number) {
              if (value !== 3) {
                return new Error(
                  'How about three-humped camel? when it’s pregnant.'
                )
              }
              return true
            }
          }
        ]
      } satisfies FormRules,
      handleValidateClick (e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors, { warnings }) => {
          if (errors) {
            console.error(errors)
            message.error('Valid.')
          } else if (warnings) {
            message.warning('Valid but be aware of warnings.')
            console.warn(warnings)
          } else {
            message.success('Perfect.')
          }
        })
      }
    }
  }
})
</script>

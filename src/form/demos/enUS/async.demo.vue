<markdown>
# Async validation

Supports async when the provided validator returns a `Promise`.
</markdown>

<template>
  <n-form
    ref="formRef"
    inline
    :label-width="80"
    :model="formValue"
    :rules="rules"
  >
    <n-form-item label="Name" path="user.name">
      <n-input v-model:value="formValue.user.name" placeholder="Input Name" />
    </n-form-item>
    <n-form-item label="Age" path="user.age">
      <n-input v-model:value="formValue.user.age" placeholder="Input Age" />
    </n-form-item>
    <n-form-item label="Adress" path="user.address">
      <n-input
        v-model:value="formValue.user.address"
        placeholder="Input Address"
      />
    </n-form-item>
    <n-form-item label="Phone" path="phone">
      <n-input v-model:value="formValue.phone" placeholder="Phone Number" />
    </n-form-item>
    <n-form-item v-model:value="formValue.phone">
      <n-button @click="handleValidateClick">
        Validate
      </n-button>
    </n-form-item>
  </n-form>

  <pre>{{ JSON.stringify(formValue, null, 2) }}
</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  FormInst,
  FormItemRule,
  FormValidationError,
  useMessage
} from 'naive-ui'

export default defineComponent({
  setup () {
    const formRef = ref<FormInst | null>(null)
    const message = useMessage()
    return {
      formRef,
      formValue: ref({
        user: {
          name: 'name',
          age: '15',
          address: '0'
        },
        phone: '1251550092'
      }),
      rules: {
        user: {
          name: {
            required: true,
            trigger: 'blur',
            validator: (rule: FormItemRule, value: string) => {
              return new Promise<void>((resolve, reject) => {
                if (value !== 'testName') {
                  reject(Error('error name')) // reject with error message
                } else {
                  resolve()
                }
              })
            }
          },
          age: {
            required: true,
            trigger: 'input',
            validator: (rule: FormItemRule, value: number) => {
              return new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                  if (value <= 16) {
                    reject(Error('error age'))
                  } else {
                    resolve()
                  }
                }, 3000)
              })
            }
          }
        },
        phone: {
          required: true,
          trigger: ['input'],
          validator: (rule: FormItemRule, value: string) => {
            return /^[1]+[3,8]+\d{9}$/.test(value)
          }
        }
      },
      handleValidateClick (e: MouseEvent) {
        e.preventDefault()
        const messageReactive = message.loading('Verifying', {
          duration: 0
        })
        formRef.value?.validate(
          (errors: Array<FormValidationError> | undefined) => {
            if (!errors) {
              message.success('Valid')
            } else {
              message.error('Invalid')
              console.log('errors', errors)
            }
            messageReactive.destroy()
          }
        )
      }
    }
  }
})
</script>

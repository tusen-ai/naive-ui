<markdown>
# 自定义默认验证信息

你可以自定义 `async-validator` 的默认验证信息，不过考虑这个信息和代码耦合很严重，估计对于中文的页面没什么价值。
</markdown>

<template>
  <n-form
    ref="formRef"
    :model="formValue"
    :rules="rules"
    :validate-messages="messages"
  >
    <n-form-item label="Name" path="user.name">
      <n-input v-model:value="formValue.user.name" placeholder="Input Name" />
    </n-form-item>
    <n-form-item>
      <n-button @click="handleValidateClick">
        验证
      </n-button>
    </n-form-item>
  </n-form>
  <pre>{{ JSON.stringify(formValue, null, 2) }}
</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FormInst, useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const formRef = ref<FormInst | null>(null)
    const message = useMessage()
    return {
      formRef,
      formValue: ref({
        user: {
          name: ''
        }
      }),
      messages: {
        required: '我们非常需要 %s'
      },
      rules: {
        user: {
          name: {
            required: true,
            trigger: 'blur'
          }
        }
      },
      handleValidateClick (e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success('好')
          } else {
            console.log(errors)
            message.error('不好')
          }
        })
      }
    }
  }
})
</script>

<markdown>
  # 警告不阻塞

  你可能需要对可能异常的值向用户显示警告，但是不希望`validate`方法抛出异常， 这种情况下`warningOnly`属性可以帮到你。
  </markdown>

<template>
  <n-form
    ref="formRef"
    inline
    :label-width="80"
    :model="formValue"
    :rules="rules"
  >
    <n-form-item label="联系电话，输入个座机试试" path="phone">
      <n-input v-model:value="formValue.phone" placeholder="电话" />
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" @click="handleValidateClick">
        验证
      </n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { FormInst, useMessage } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const formRef = ref<FormInst | null>(null)
    const message = useMessage()
    return {
      formRef,
      formValue: ref({
        phone: ''
      }),
      rules: {
        phone: [
          {
            required: true,
            message: '输入电话号码',
            trigger: ['input', 'blur']
          },
          {
            trigger: ['input', 'blur'],
            warningOnly: true,
            len: 11,
            message: '要不要换成手机号？'
          }
        ]
      },
      handleValidateClick (e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors, warnings) => {
          if (errors) {
            console.error(errors)
            message.error('Invalid')
          } else if (warnings) {
            message.warning('Warning')
            console.warn(warnings)
          } else {
            message.success('搞定，完全没得问题了')
          }
        })
      }
    }
  }
})
</script>

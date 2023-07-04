<markdown>
  # 异常值警告

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
    <n-form-item label="茴香豆的回有几种写法？" path="count">
      <n-input-number v-model:value="formValue.count" />
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" @click="handleValidateClick">
        作答
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
            message: '请作答',
            type: 'number',
            trigger: ['input', 'blur']
          },
          {
            trigger: ['input', 'blur'],
            warningOnly: true,
            validator (_rule: FormItemRule, value: number) {
              if (value !== 4) {
                return new Error('你确定吗？')
              }
              return true
            }
          }
        ]
      } satisfies FormRules,
      handleValidateClick (e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors, warnings) => {
          if (errors) {
            console.error(errors)
            message.error('校验通过了')
          } else if (warnings) {
            message.warning('校验通过但是留意还有警告')
            console.warn(warnings)
          } else {
            message.success('完美')
          }
        })
      }
    }
  }
})
</script>

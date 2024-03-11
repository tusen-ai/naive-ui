<markdown>
# 自定义校验反馈显示位置

有时候产品经理可能不想让表单的校验信息展示在组件下方, 或者让校验文字居中显示，您不妨可以看看这里。
</markdown>

<template>
  <n-form ref="formRef" inline :model="formValue">
    <n-form-item
      :rule="{
        required: true,
        message: '请作答',
        type: 'number',
        trigger: ['input', 'blur']
      }"
      label="本年度最受欢迎的Vue3组件库是?"
      path="likeLib"
      feedback-vertical="top"
      feedback-crosswise="left"
    >
      <n-input v-model:value="formValue.likeLib" />
    </n-form-item>
    <n-form-item
      :rule="{
        required: true,
        message: '请作答',
        type: 'number',
        trigger: ['input', 'blur']
      }"
      label="vue3.4新增的mode-vapor运行原理是?"
      path="likeLib"
      feedback-vertical="bottom"
      feedback-crosswise="center"
    >
      <n-input v-model:value="formValue.vapor" type="textarea" />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
type FormValue = {
  likeLib: string | null
  vapor: string | null
}
const formValue: FormValue = reactive({
  likeLib: null,
  vapor: null
})
</script>

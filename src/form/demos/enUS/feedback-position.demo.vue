<markdown>
# customCheckFeedbackDisplayPosition

Sometimes the product manager may not want the form's validation information to be displayed below the component, or the validation text to be displayed in the center.
</markdown>

<template>
  <n-form ref="formRef" inline :model="formValue">
    <n-form-item
      :rule="{
        required: true,
        message: 'pleaseReply',
        type: 'number',
        trigger: ['input', 'blur']
      }"
      label="The most popular Vue 3 component library of the year is?"
      path="likeLib"
      feedback-vertical="top"
      feedback-crosswise="left"
    >
      <n-input v-model:value="formValue.likeLib" />
    </n-form-item>
    <n-form-item
      :rule="{
        required: true,
        message: 'pleaseReply',
        type: 'number',
        trigger: ['input', 'blur']
      }"
      label="The working principle of the mode-vapor added to vue 3.4 is as follows?"
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

<markdown>
# Custom feedback style

Using `feedback-style` and `feedback-class` to custom feedback.
</markdown>

<template>
  <n-form :model="formValue">
    <n-form-item
      :rule="{
        required: true,
        message: 'Centered feedback',
        type: 'string',
        trigger: ['input', 'blur']
      }"
      label="Centered feedback"
      path="input"
      feedback-style="text-align: center;"
    >
      <n-input v-model:value="formValue.input" />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

type FormValue = {
  input: string | null
}

const formValue: FormValue = reactive({
  input: null
})
</script>

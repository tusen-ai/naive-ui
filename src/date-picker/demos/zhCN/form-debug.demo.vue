<markdown>
# Form debug
</markdown>

<template>
  <n-form :model="model" :rules="rules">
    <n-form-item :span="12" label="产检时间" path="date">
      <n-date-picker
        v-model:value="model.date"
        style="width: 100%"
        type="date"
        clearable
      />
    </n-form-item>
  </n-form>
  <pre>{{ model.date }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FormRules } from 'naive-ui'

export default defineComponent({
  setup () {
    const rules: FormRules = {
      date: {
        type: 'number',
        required: true,
        trigger: ['blur', 'change'],
        message: '请选择日期'
      }
    }
    return {
      model: ref({
        date: null
      }),
      rules
    }
  }
})
</script>

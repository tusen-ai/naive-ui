<markdown>
# Form debug
</markdown>

<template>
  <div id="app">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      model: ref({
        date: null
      }),
      rules: {
        date: {
          required: true,
          trigger: ['blur', 'change'],
          message: '请选择日期'
        }
      }
    }
  }
})
</script>

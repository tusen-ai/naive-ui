<markdown>
# Use in form
</markdown>

<template>
  <n-form :model="model" :rules="rules">
    <n-form-item path="tags" :show-label="false">
      <n-dynamic-tags v-model:value="model.tags" />
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      model: ref({
        tags: ['teacher', 'programmer']
      }),
      rules: {
        tags: {
          trigger: ['change'],
          validator (rule: unknown, value: string[]) {
            if (value.length >= 5) return new Error('Up to 4 tags')
            return true
          }
        }
      }
    }
  }
})
</script>

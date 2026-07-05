<markdown>
# Use in form
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const model = ref({
  tags: ['teacher', 'programmer']
})

const rules = {
  tags: {
    trigger: ['change'],
    validator(rule: unknown, value: string[]) {
      if (value.length >= 5)
        return new Error('Up to 4 tags')
      return true
    }
  }
}
</script>

<template>
  <n-form :model="model" :rules="rules">
    <n-form-item path="tags" :show-label="false">
      <n-dynamic-tags v-model:value="model.tags" />
    </n-form-item>
  </n-form>
</template>

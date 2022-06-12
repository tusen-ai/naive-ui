<markdown>
# Input intercept

Control the entry format of the input.
</markdown>

<template>
  <n-space vertical>
    <n-input
      type="text"
      :pattern="validateOnlyNumber"
      placeholder="Only enter the number."
    />
    <n-input
      type="textarea"
      :pattern="validateEmpty"
      placeholder="Can't enter space."
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      validateOnlyNumber: (value: string) => !value || /^\d+$/.test(value),
      validateEmpty: (value: string) => !/ /g.test(value)
    }
  }
})
</script>

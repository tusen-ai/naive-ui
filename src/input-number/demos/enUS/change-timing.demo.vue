<markdown>
# Timing to change

Set `update-value-on-input` to `false`, the value won't be changed on input.
</markdown>

<template>
  <n-space vertical>
    <n-input-number
      v-model:value="value"
      :update-value-on-input="false"
      placeholder=""
      :min="20"
      :max="50"
    />
    <n-input-number v-model:value="value" placeholder="" :min="20" :max="50" />
    {{ value }}
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(35)
    }
  }
})
</script>

<markdown>
# 改变值的时机

将 `update-value-on-input` 设为 `false`，则在输入的过程中不会改变值。
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

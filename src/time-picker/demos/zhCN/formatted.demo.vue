<markdown>
# 使用格式化后的值

你可以使用 `formatted-value` 控制格式化后的值。
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      formattedValue: ref('4~1~8')
    }
  }
})
</script>

<template>
  <pre>{{ formattedValue }}</pre>
  <n-time-picker
    v-model:formatted-value="formattedValue"
    value-format="H~m~s"
  />
</template>

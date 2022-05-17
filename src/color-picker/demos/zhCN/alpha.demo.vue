<markdown>
# 不透明度

用 `show-alpha` 设定是否可调节 alpha 通道。
</markdown>

<template>
  <n-color-picker
    :show-alpha="false"
    :actions="['confirm']"
    @confirm="handleConfirm"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      handleConfirm (value: string) {
        console.log(value)
      }
    }
  }
})
</script>

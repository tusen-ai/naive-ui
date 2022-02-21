<markdown>
# 前缀 & 后缀

在前缀后缀添加内容
</markdown>

<template>
  <n-space vertical>
    <n-input-number v-model:value="value">
      <template #prefix>
        ￥
      </template>
    </n-input-number>
    <n-input-number v-model:value="value">
      <template #suffix>
        %
      </template>
    </n-input-number>
    <n-input-number v-model:value="value" :show-button="false">
      <template #suffix>
        %
      </template>
    </n-input-number>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(0)
    }
  }
})
</script>

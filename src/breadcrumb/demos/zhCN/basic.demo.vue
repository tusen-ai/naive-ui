<markdown>
# 基础用法
</markdown>

<script lang="ts">
import { MdCash } from '@vicons/ionicons4'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      MdCash
    }
  }
})
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item>
      <n-icon :component="MdCash" /> 北京总行
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon :component="MdCash" /> 天津分行
    </n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon :component="MdCash" /> 平山道支行
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

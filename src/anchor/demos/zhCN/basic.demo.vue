<markdown>
# 基础用法
</markdown>

<template>
  <n-space style="margin-bottom: 12px">
    <n-switch v-model:value="showRail" /> 展示轨道
    <n-switch v-model:value="showBackground" /> 展示背景
  </n-space>
  <n-anchor :show-rail="showRail" :show-background="showBackground">
    <n-anchor-link title="演示" href="#演示">
      <n-anchor-link title="基础用法" href="#basic.vue" />
      <n-anchor-link title="忽略间隔" href="#ignore-gap.vue" />
      <n-anchor-link title="固定" href="#affix.vue" />
      <n-anchor-link title="滚动到" href="#scrollto.vue" />
    </n-anchor-link>
    <n-anchor-link title="API" href="#API" />
  </n-anchor>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      showRail: ref(true),
      showBackground: ref(true)
    }
  }
})
</script>

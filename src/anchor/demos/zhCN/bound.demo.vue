<markdown>
# 偏移量

我想要在滚到屏幕中间就触发导航。
</markdown>

<template>
  <n-anchor :bound="bound">
    <n-anchor-link title="演示" href="#演示">
      <n-anchor-link title="基础用法" href="#basic.vue" />
      <n-anchor-link title="忽略间隔" href="#ignore-gap.vue" />
      <n-anchor-link title="偏移量" href="#bound.vue" />
      <n-anchor-link title="固定" href="#affix.vue" />
      <n-anchor-link title="滚动到" href="#scrollto.vue" />
    </n-anchor-link>
    <n-anchor-link title="API" href="#API" />
  </n-anchor>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      bound: document.documentElement.scrollHeight / 2
    }
  }
})
</script>

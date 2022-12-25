<markdown>
# Basic
</markdown>

<template>
  <n-space style="margin-bottom: 12px">
    <n-switch v-model:value="showRail" /> Show Rail
    <n-switch v-model:value="showBackground" /> Show Background
  </n-space>
  <n-anchor :show-rail="showRail" :show-background="showBackground">
    <n-anchor-link title="Demos" href="#Demos">
      <n-anchor-link title="Basic" href="#basic.vue" />
      <n-anchor-link title="Ignore-Gap" href="#ignore-gap.vue" />
      <n-anchor-link title="Affix" href="#affix.vue" />
      <n-anchor-link title="Scroll To" href="#scrollto.vue" />
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

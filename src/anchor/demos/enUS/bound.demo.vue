<markdown>
# Bound

I want to trigger anchor when scrolling to the middle of the screen.
</markdown>

<template>
  <n-anchor :bound="bound">
    <n-anchor-link title="API" href="#API" />
    <n-anchor-link title="Demos" href="#Demos">
      <n-anchor-link title="Basic" href="#basic.vue" />
      <n-anchor-link title="Ignore-Gap" href="#ignore-gap.vue" />
      <n-anchor-link title="Bound" href="#bound.vue" />
      <n-anchor-link title="Affix" href="#affix.vue" />
      <n-anchor-link title="Scroll To" href="#scrollto.vue" />
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

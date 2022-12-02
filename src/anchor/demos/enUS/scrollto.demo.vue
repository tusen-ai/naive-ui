<markdown>
# Scroll to
</markdown>

<template>
  <div style="height: 200px; padding-left: 200px">
    <n-anchor
      ref="anchorRef"
      affix
      :trigger-top="24"
      :top="88"
      :bound="24"
      style="z-index: 1"
    >
      <n-anchor-link title="Demos" href="#Demos">
        <n-anchor-link title="Basic" href="#basic.vue" />
        <n-anchor-link title="Ignore-Gap" href="#ignore-gap.vue" />
        <n-anchor-link title="Affix" href="#affix.vue" />
        <n-anchor-link title="Scroll To" href="#scrollto.vue" />
      </n-anchor-link>
      <n-anchor-link title="API" href="#API" />
    </n-anchor>
  </div>
  <n-space style="padding-left: 400px">
    <n-button @click="scrollTo('#basic')">
      Basic
    </n-button>
    <n-button @click="scrollTo('#affix')">
      Affix
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { AnchorInst } from 'naive-ui'

export default defineComponent({
  setup () {
    const anchorRef = ref<AnchorInst | null>(null)
    const scrollTo = (href: string) => {
      anchorRef.value?.scrollTo(href)
    }
    return {
      anchorRef,
      scrollTo
    }
  }
})
</script>

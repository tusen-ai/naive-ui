<markdown>
# Customize the anchor highlight

Even when scrolled to the bottom, clicking on the anchor link can still trigger highlighting.
</markdown>

<template>
  <div style="height: 200px">
    <n-anchor
      affix
      listen-to=".document-scroll-container"
      :trigger-top="288"
      :top="288"
      offset-target="#doc-layout"
      ignore-gap
      :get-current-anchor="getCurrentAnchor"
      style="z-index: 1"
    >
      <n-anchor-link title="Demos" href="#Demos">
        <n-anchor-link title="Basic" href="#basic.vue" />
        <n-anchor-link title="Ignore-Gap" href="#ignore-gap.vue" />
        <n-anchor-link title="Affix" href="#affix.vue" />
        <n-anchor-link
          title="Custom-Active-Anchor"
          href="#custom-active-anchor.vue"
        />
        <n-anchor-link title="Scroll To" href="#scrollto.vue" />
      </n-anchor-link>
      <n-anchor-link title="API" href="#API" />
      <n-anchor-link title="Anchor Props" href="#Anchor-Props" />
      <n-anchor-link title="Anchor Methods" href="#Anchor-Methods" />
    </n-anchor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      getCurrentAnchor (activeHref: string | null) {
        return activeHref
      }
    }
  }
})
</script>
